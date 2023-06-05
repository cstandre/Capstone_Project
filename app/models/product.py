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

    reviews = db.relationship('Review', back_populates='product', cascade='all, delete-orphan')

    product_images = db.relationship('ProductImage', back_populates='product', cascade='all, delete-orphan')

    cart_items = db.relationship('CartItem', back_populates='products', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'product_name': self.product_name,
            'price': self.price,
            'brand': self.brand,
            'stock_quantity': self.stock_quantity,
            'description': self.description,
            'preview_image': [product_image.url for product_image in self.product_images if product_image.preview] if self.product_images else [],
            'reviews': [review.to_dict() for review in self.reviews] if self.reviews else []
        }

    def to_dict_detail(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'product_name': self.product_name,
            'price': self.price,
            'brand': self.brand,
            'stock_quantity': self.stock_quantity,
            'description': self.description,
            'preview_image': [product_image.url for product_image in self.product_images if product_image.preview] if self.product_images else [],
            'product_images': [product_image.to_dict() for product_image in self.product_images] if self.product_images else [],
            'reviews': [review.to_dict() for review in self.reviews] if self.reviews else [],
        }

