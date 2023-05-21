from .db import db, environment, SCHEMA

class ProductImage(db.Model):
    __tablename__ = 'productImages'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(255), nullable=False)
    preview = db.Column(db.Boolean)
    product_id = db.Column(db.Integer, nullable=False)

    product = db.relationship('Product', back_populates='productImages')

    def to_dict(self):
        return {
            'id': self.id,
            'url': self.url,
            'preview': self.preview
        }
