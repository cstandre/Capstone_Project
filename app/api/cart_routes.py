from flask import Blueprint
from flask_login import current_user, login_required
from app.models import db, Cart, CartItem


cart_routes = Blueprint('cart', __name__)

## Get cart items
@cart_routes.route('')
@login_required
def users_cart():
    curr_user_id = current_user.id
    cart = Cart.query.filter_by(user_id = curr_user_id )

    return cart.to_dict()

## Add items to cart
@cart_routes.route('/add')
@login_required
def add_item():
    

## Update items in cart

## Delte items from cart
