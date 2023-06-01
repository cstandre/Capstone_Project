from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from app.models import db, Product, ProductImage
from app.forms.create_product import ProductForm
from app.forms.product_pictures import ImageForm
from .aws_helpers import upload_file_to_s3, get_unique_filename

product_routes = Blueprint('products', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

## Get all products
@product_routes.route('')
def all_products():
    """
    Query for all products and returns them in a list of user dictionaries.
    """
    products = Product.query.all()
    return {product.id: product.to_dict() for product in products}

## Get products that the current user owns.
@product_routes.route('/current')
def user_products():
    """
    Query for all products and return only the products that are owned by the current user.
    """
    user_id = current_user.id
    products = Product.query.filter_by(owner_id = user_id)
    return {product.id: product.to_dict() for product in products}


## Get one product by the ID
@product_routes.route('/<int:id>')
def product_id(id):
    """
    Query for one product by the id and return product detials.
    """
    product = Product.query.get(id)
    return product.to_dict_detail()

## Create a product
@product_routes.route('/create', methods=['POST'])
@login_required
def create_product():
    """
    Creates a product and returns the new products details.
    """
    form = ProductForm()
    owner_id = current_user.id

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_product = Product(
            owner_id = owner_id,
            product_name = form.data['product_name'],
            price = form.data['price'],
            brand = form.data['brand'],
            stock_quantity = form.data['stock_quantity'],
            description = form.data['description']
        )

        db.session.add(new_product)
        db.session.commit()
        return new_product.to_dict_detail()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

## Update a product
@product_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_product(id):
    """
    Query for a product based of it's id and make updates.
    """

    form = ProductForm()
    product = Product.query.get_or_404(id)

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        product.product_name = form.data['product_name']
        product.price = form.data['price']
        product.brand = form.data['brand']
        product.stock_quantity = form.data['stock_quantity']
        product.description = form.data['description']

        db.session.commit()
        return product.to_dict_detail()

## Delete a product
@product_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_product(id):
    """
    Query for a product by the id and remove from database.
    """
    product = Product.query.get_or_404(id)
    db.session.delete(product)
    db.session.commit()

    return {'message': 'successful delete'}

## Get all product images
@product_routes.route('/images')
def get_images():
    """
    Query all the preview images for products to display on the main page.
    """
    images = ProductImage.query.filter_by(preview = True).all()
    return {image.id: image.to_dict() for image in images}

## Add image to product by product Id
@product_routes.route('/<int:id>/images', methods=["POST"])
@login_required
def add_img(id):
    form = ImageForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        image = form.data["image"]
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)

        if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
            return jsonify(errors=[upload])

        url = upload["url"]

        is_preview = request.form.get("is_preview") or False

        new_image = ProductImage (
            url = url,
            preview = is_preview,
            product_id = id
        )

        db.session.add(new_image)
        db.session.commit()
        return new_image.to_dict()

    if form.errors:
        return { 'errors': form.errors }

    return { 'message': "Invalid request" }

## Update the images of a product

## Delete images of a product
