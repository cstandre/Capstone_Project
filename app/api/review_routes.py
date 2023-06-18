from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Review
from app.forms.review_form import ReviewForm


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
@review_routes.route('')
def all_reviews():
    """
    Query for all reviews and return them in a list of dictionaries.
    """
    reviews = Review.query.all()

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

## Delete you review

## Add img to review
