from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Review, ReviewImage
from app.forms.review_form import ReviewForm
from app.aws_helpers import upload_file_to_s3, get_unique_filename


review_routes = Blueprint('reviews', __name__)

def validation_errors_to_error_message(validation_errors):
    """
    Simple fuction that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

## Get all reviews
@review_routes.route('/<int:productId>')
def all_reviews(productId):
    """
    Query for all reviews and return them in a list of dictionaries.
    """
    reviews = Review.query.filter_by(product_id = productId)

    if not reviews:
        return {'error': 'No reviews could be found'}

    return {review.id: review.to_dict() for review in reviews}

## Get all reviews for the current user
@review_routes.route('/current')
@login_required
def user_reviews():
    """
    Queries for all reviews and returns only the reviews that where written by the current user.
    """

    user_id = current_user.id
    reviews = Review.query.filter_by(user_id = user_id)

    if not reviews:
        return {'error': 'Reviews not found'}

    return {review.id: review.to_dict() for review in reviews}

## Create a review
@review_routes.route('/<int:product_id>', methods=['POST'])
@login_required
def create_review(product_id):
    """
    Queries to see if user already created a review for a product. If not, we will create a review.
    """
    user_id = current_user.id
    product_review = Review.query.filter_by(user_id=user_id, product_id=product_id)

    print(product_review)

    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit:
        new_review = Review(
            user_id = user_id,
            product_id = product_id,
            header = form.data['header'],
            review = form.data['review'],
            stars = form.data['stars']
        )
        db.session.add(new_review)
        db.session.commit()
        return new_review.to_dict()

    return {'error': validation_errors_to_error_message(form.errors)}, 401


## Edit your review
@review_routes.route('/<int:reviewId>', methods=['PUT'])
@login_required
def edit_review(reviewId):
    user_id = current_user.id
    review = Review.query.get_or_404(reviewId)

    # print(review, "------------------review-----------------")

    if not review:
        return {'error': 'No review could be found'}

    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if user_id != review.user_id:
        return {'error': 'Must be the owner of the review to edit'}

    if user_id == review.user_id and form.validate_on_submit():
        review.header = form.data['header']
        review.review = form.data['review']
        review.stars = form.data['stars']

        db.session.commit()
        return review.to_dict()

    return {'errors': validation_errors_to_error_message(form.errors)}, 401


## Delete you review
@review_routes.route('/<int:reviewId>', methods=['DELETE'])
@login_required
def delete_review(reviewId):
    user_id = current_user.id
    review = Review.query.get_or_404(reviewId)

    if not review:
        return {'error': 'Review could not be found'}

    if user_id == user_id:
        db.session.delete(review)
        db.session.commit()
        return {'message': 'Successfully Deleted'}

    return {'error': 'Must be the owner of the review to delete'}

## Get all review images
@review_routes.route('/<int:reviewId>/images')
def review_imgs(reviewId):
    images = ReviewImage.query.filter_by(review_id=reviewId)

    if not images:
        return {'error': 'No images were found'}

    return {image.id: image.to_dict() for image in images}


## Add Images to a review
@review_routes.route('/<int:reviewId>/images', methods=['POST'])
@login_required
def add_review_img(reviewId):
    review = Review.query.get_or_404(reviewId)

    if not review:
        return {'errors': 'Review not found'}, 401

    images = request.files.getlist('image[]')
    review_images = []

    for _, image in enumerate(images):
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)

        if 'url' not in upload:
            return {'errors': 'Invalid response from upload_file_to_s3'}, 500
        url = upload['url']

        newImage = ReviewImage(
            url=url,
            review_id=reviewId
        )

        review_images.append(newImage)


    try:
        for image in review_images:
            db.session.add(image)
        db.session.commit()
    except Exception as e:
        print(str(e))
        db.session.rollback()
        return jsonify({'error': 'An error occurred while saving the images'}), 500

    return jsonify ({'message': 'Images added successfully'})
