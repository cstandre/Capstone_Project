from sqlalchemy import or_
from flask import Blueprint
from app.models import db, Product
from app.forms.search_form import SearchForm


search_routes = Blueprint('search', __name__)

@search_routes.route('/', methods=['POST'])
def search_product():
    form = SearchForm()
    searched = form.data['search']

    products = Product.query.filter(
        or_(Product.brand.like(f'%{searched}%'), Product.product_name.like(f'%{searched}%'))
    ).all()

    return {
        'products': [product.to_dict_search() for product in products] if products else []
        }
