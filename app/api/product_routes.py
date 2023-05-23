from flask import Blueprint
from app.models import db, Product

product_routes = Blueprint('products', __name__)

@product_routes.route('/')
def all_products():
    """
    Query for all products and returns them in a list of user dictionaries
    """
    products = Product.query.all()
    return {product.id: product.to_dict() for product in products}
