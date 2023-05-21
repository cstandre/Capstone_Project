from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text


def seed_reviews():
    review1 = Review(
        user_id=1, product_id=3, header='Must buy!', review='Super comfortable and afordable.', stars=4)
    review2 = Review(
        user_id=2, product_id=2, header='Everyday wear', review='Very secure feeling. I wear them hiking all the time.', stars=5)
    review3 = Review(
        user_id=3, product_id=1, header='Perfect fit', review='Cute, soft and comfy!', stars=4)

    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.commit()


def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.delete(review1)
        db.session.delete(review2)
        db.session.delete(review3)
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
