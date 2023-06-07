from .db import db, environment, SCHEMA, add_prefix_for_prod

class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)
    header = db.Column(db.String(50), nullable=False)
    review = db.Column(db.String, nullable=False)
    stars = db.Column(db.Integer, nullable=False)

    owner = db.relationship('User', back_populates='reviews')

    product = db.relationship('Product', back_populates='reviews')

    review_images = db.relationship('ReviewImage', back_populates='review', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'owner_name': self.owner.username,
            'header': self.header,
            'review': self.review,
            'stars': self.stars,
            'review_images': [review_image.url for review_image in self.review_images] if self.review_images else []
        }
