from flask import Blueprint, request
import uuid
from flask_login import current_user, login_required
from app.models import db, Cart, CartItem, Product


cart_routes = Blueprint('cart', __name__)

## Get cart items
@cart_routes.route('')
@login_required
def users_cart():
    user_id = current_user.id
    cart = Cart.query.filter_by(user_id = user_id).first()

    if not cart:
        return {'error': 'Cart not found'}

    cart_items = CartItem.query.filter_by(cart_id = cart.id).all()

    return {cart_item.id : cart_item.to_dict() for cart_item in cart_items}

## Add items to cart
@cart_routes.route('/<int:productId>/<int:quantity>', methods=['POST'])
@login_required
def add_item(productId, quantity):
    user_id = current_user.id
    cart = Cart.query.filter_by(user_id=user_id).first()
    product = Product.query.get(productId)

    if not product:
        return {'error': 'Product not found'}

    cart_item = CartItem.query.filter_by(cart_id=cart.id, product_id=productId).first()

    if cart_item:
        cart_item.quantity += quantity
    else:
        cart_item = CartItem(
            cart_id=cart.id,
            product_id=productId,
            quantity=quantity
        )

        db.session.add(cart_item)

    db.session.commit()

    return cart_item.to_dict()

## Update items in cart
@cart_routes.route('/<int:itemId>/<int:quantity>', methods=['PUT'])
@login_required
def cart_quantity(itemId, quantity):
    item = CartItem.query.get(itemId)

    if not item:
        return {'error': 'Cart Item not found'}

    item.quantity = quantity

    db.session.commit()
    return users_cart()

## Delte items from cart
@cart_routes.route('/<int:itemId>', methods=['DELETE'])
@login_required
def delete_item(itemId):
    item = CartItem.query.get(itemId)

    if not item:
        return {'error': 'Item not found'}

    product_details = item.products.to_dict_detail() if item.products else None

    deleted_item = {
        'id': item.id,
        'cart_id': item.cart_id,
        'product': product_details,
        'quantity': item.quantity
    }

    db.session.delete(item)
    db.session.commit()

    return deleted_item
