from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import db, Cart, CartItem, Product


cart_routes = Blueprint('cart', __name__)

## Get cart items
@cart_routes.route('')
@login_required
def users_cart():
    user_id = current_user.id
    carts = Cart.query.filter_by(user_id = user_id)

    return {cart.id: cart.to_dict() for cart in carts}

## Add items to cart
@cart_routes.route('/<int:productId>/<int:quantity>', methods=['POST'])
@login_required
def add_item(productId, quantity):
    product = Product.query.get(productId)

    if not product:
        return {'error': 'Product not found'}

    added_product = CartItem(
        cart_id = 1,
        product_id = productId,
        quantity = quantity
    )

    db.session.add(added_product)
    db.session.commit()
    return added_product.to_dict()

## Update items in cart
@cart_routes.route('/<int:itemId>/<int:quantity>', methods=['PUT'])
@login_required
def cart_quantity(itemId, quantity):
    item = CartItem.query.get(itemId)

    if not item:
        return {'error': 'Cart Item not found'}

    item.quantity = quantity

    db.session.commit()
    return item.to_dict()

## Delte items from cart
@cart_routes.route('/<int:itemId>', methods=['DELETE'])
@login_required
def delete_item(itemId):
    item = CartItem.query.get_or_404(itemId)
    db.session.delete(item)
    db.session.commit()

    return {'message': "Successful delete"}
