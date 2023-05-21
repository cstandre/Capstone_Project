from .db import db, environment, SCHEMA

class CartItem(db.Model):
    __tablename__ = 'cartItems'

    if environment == 'production':
        __table_args__ = {'schema': {SCHEMA}}

    id = db.Column(db.Integer, primary_key=True)
    cart_id = db.Column(db.Integer, nullable=False)
    product_id = db.Column(db.Integer, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)

    cart = db.relationship('Cart', back_populates='cartItems')

    products = db.relationship('Product', back_populates='cartItems')

    def to_dict(self):
        return {
            'id': self.id,
            'cart_id': self.cart_id,
            'product_id': self.product_id,
            'quantity': self.quantity
        }
