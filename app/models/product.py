from .db import db, environment, SCHEMA, add_prefix_for_prod

class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    product_name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Numeric(precision=5, scale=2), nullable=False)
    brand = db.Column(db.String, nullable=False)
    stock_quantity = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String(500), nullable=False)

    owner = db.relationship('User', back_populates='products')

    reviews = db.relationship('Review', back_populates='product')

    product_images = db.relationship('ProductImage', back_populates='product')

    cart_items = db.relationship('CartItem', back_populates='products')

    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'productName': self.productName,
            'price': self.price,
            'brand': self.brand,
            'stock_quantity': self.stockQuantity,
            'description': self.description,
            'reviews': [review.to_dict() for review in self.reviews] if self.reviews else []
        }
