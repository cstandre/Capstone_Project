from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Product, ProductImage
from app.aws_helpers import upload_file_to_s3, get_unique_filename

images_routes = Blueprint('images', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


## Add image to product by product Id
@images_routes.route("<int:productId>", methods=["POST"])
@login_required
def add_img(productId):
    product = Product.query.get_or_404(productId)

    if not product:
        return {'errors': "Product not found"}, 401

    images = request.files.getlist('image[]')
    # print(images,"images -----------------")
    product_images = []
    for idx, image in enumerate(images):
        # print(image, 'image-------------------------')
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        # print(upload, 'upload------------------------------------')

        if 'url' not in upload:
            return {'errors': "Invalid response from upload_file_to_s3"}, 500
        url = upload["url"]
        # print(url, "url-----------------------------------")
        is_preview = request.form.get(f'is_preview_{idx}') == 'true'
        new_image = ProductImage(
            image=url,
            is_preview=is_preview,
            product_id=productId
        )
        # print(new_image, "new image instance --------------------")
        product_images.append(new_image)

    # Save the product images to the database
    try:
        for image in product_images:
            db.session.add(image)
        db.session.commit()
    except Exception as e:
        print(str(e))
        db.session.rollback()
        return jsonify({'error': 'An error occurred while saving the images'}), 500

    return jsonify({'message': 'Images added successfully'})


## Update the images of a product

## Delete images of a product

## Add images to a review by the review id // Not complete
# images_routes.route('/<int:reviewId>', methods=['POST'])
# @login_required
# def add_review_img(reviewId):
#     user_id = current_user.id
#     review = Review.query.get_or_404(reviewId)

#     if not review:
#         return {'error': 'Review not found'}
