from .db import db, environment, SCHEMA

class Cart(db.Model):
    __tablename__ = 'carts'

    if environment == 'production':
        __table_args__ = {'schema': {SCHEMA}}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)

    owner = db.relationship('User', back_populates='carts')

    cart_items = db.relationship('CartItem', back_populates='cart')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id
        }
