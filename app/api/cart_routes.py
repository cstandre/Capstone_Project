from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import db, Cart, CartItem
from app.forms.cart_quantity import CartQuantity


cart_routes = Blueprint('cart', __name__)

## Get cart items
@cart_routes.route('')
@login_required
def users_cart():
    user_id = current_user.id
    carts = Cart.query.filter_by(user_id = user_id)

    return {cart.id: cart.to_dict() for cart in carts}

## Add items to cart
@cart_routes.route('/<int:productId>', methods=['POST'])
@login_required
def add_item(productId):
    form = CartQuantity()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        added_product = CartItem(
            cart_id = 1,
            product_id = productId,
            quantity = form.data['quantity']
        )

        db.session.add(added_product)
        db.session.commit()
        return added_product.to_dict()

## Update items in cart
@cart_routes.route('/<int:itemId>', methods=['PUT'])
@login_required
def cart_quantity(itemId):
    form = CartQuantity()
    item = CartItem.query.get_or_404(itemId)

    form['csrf_token'].data = request.cookies['csrf_token']

    if  form.validate_on_submit():
        item.quantity = form.data['quantity']

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
