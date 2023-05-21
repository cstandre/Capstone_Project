from .db import db, environment, SCHEMA

class ReviewImage(db.Model):
    __tablename__ = 'reviewImages'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String, nullable=False)
    review_id = db.Column(db.Integer, nullable=False)

    review = db.relationship('Review', back_populates='reviewImages')


    def to_dict(self):
        return {
            'id': self.id,
            'url': self.url
        }
