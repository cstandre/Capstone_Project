from .db import db, environment, SCHEMA, add_prefix_for_prod

class Product(db.Model):
    __tablename__ = 'products'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    productName = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Numeric(percision=5, scale=2), nullable=False)
    brand = db.Column(db.String, nullable=False)
    stockQuantity = db.Column(db.integer, nullable=False)
    description = db.Column(db.String(500), nullable=False)

    owner = db.relationship('User', back_populates='products')

    reviews = db.relationship('Review', back_populates='product')

    productImages = db.relationship('ProductImage', back_populates='product')

    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'productName': self.productName,
            'price': self.price,
            'brand': self.brand,
            'stockQuantity': self.stockQuantity,
            'description': self.description,
            'reviews': [reviews.to_dict() for reviews in self.reviews] if self.reviews else []
        }
