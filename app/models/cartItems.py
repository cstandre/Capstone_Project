from .db import db, environment, SCHEMA, add_prefix_for_prod

class CartItem(db.Model):
    __tablename__ = 'cartItems'

    if environment == 'production':
        __table_args__ = {'schema': {SCHEMA}}

    id = db.Column(db.Integer, primary_key=True)
    cart_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('carts.id')), nullable=False,)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)

    cart = db.relationship('Cart', back_populates='cart_items')

    products = db.relationship('Product', back_populates='cart_items')

    def to_dict(self):
        return {
            'id': self.id,
            'cart_id': self.cart_id,
            'product': self.products.to_dict_detail() if self.products else [],
            'quantity': self.quantity
        }
