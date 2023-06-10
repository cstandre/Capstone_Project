from flask import Blueprint, request, jsonify
from flask_login import login_required
from app.models import db, Product, ProductImage
# from app.forms.create_product import ProductForm
from app.forms.product_pictures import ImageForm
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

    form = ImageForm()

    images = request.files.getlist('image[]')
    product_images = []
    for idx, image in enumerate(images):
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        url = upload["url"]
        is_preview = request.form.get(f'is_preview_{idx}') == 'true'
        new_image = ProductImage(
            image=url,
            is_preview=is_preview,
            product_id=productId
        )
        product_images.append(new_image)
    # Save the product images to the database
    for image in product_images:
        db.session.add(image)
    db.session.commit()
    return jsonify([image.to_dict() for image in product_images])


## Update the images of a product

## Delete images of a product
