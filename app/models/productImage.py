from .db import db, environment, SCHEMA, add_prefix_for_prod

class ProductImage(db.Model):
    __tablename__ = 'product_images'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    image = db.Column(db.String, nullable=False)
    is_preview = db.Column(db.Boolean, default=False)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)

    product = db.relationship('Product', back_populates='product_images')

    def to_dict(self):
        return {
            'id': self.id,
            'image': self.image,
            'is_preview': self.is_preview
        }
