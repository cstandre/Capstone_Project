from app.models import db, ReviewImage, environment, SCHEMA
from sqlalchemy.sql import text


def seed_review_images():
    image1 = ReviewImage(url='', review_id=1)
    image2 = ReviewImage(url='', review_id=2)
    image3 = ReviewImage(url='', review_id=3)

    db.session.add(image1)
    db.session.add(image2)
    db.session.add(image3)
    db.session.commit()


def undo_review_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviewImages RESTART IDENTITY CASCADE;")
    else:
        db.session.delete(image1)
        db.session.delete(image2)
        db.session.delete(image3)
        db.session.execute(text("DELETE FROM reviewImages"))

    db.session.commit()
