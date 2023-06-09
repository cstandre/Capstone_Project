from app.models import db, ReviewImage, environment, SCHEMA
from sqlalchemy.sql import text


def seed_review_images():
    image1 = ReviewImage(url='https://res.cloudinary.com/djclmc80y/image/upload/v1684715152/review_image_1_yhxoyl.png', review_id=2)
    image2 = ReviewImage(url='https://res.cloudinary.com/djclmc80y/image/upload/v1684715152/review_image_2_xttjp2.png', review_id=1)
    image3 = ReviewImage(url='https://res.cloudinary.com/djclmc80y/image/upload/v1684715152/review_image_3_w5uwai.png', review_id=1)

    db.session.add(image1)
    db.session.add(image2)
    db.session.add(image3)
    db.session.commit()


def undo_review_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.review_images RESTART IDENTITY CASCADE;")
    else:
        db.session.delete(image1)
        db.session.delete(image2)
        db.session.delete(image3)
        db.session.execute(text("DELETE FROM review_images"))

    db.session.commit()
