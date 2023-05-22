from app.models import db, ProductImage, environment, SCHEMA
from sqlalchemy.sql import text


def seed_product_images():
    image1 = ProductImage(url='', preview=, product_id=)
    image2 = ProductImage(url='', preview=, product_id=)
    image3 = ProductImage(url='', preview=, product_id=)

    db.session.add(image1)
    db.session.add(image2)
    db.session.add(image3)
    db.session.commit()


def undo_product_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.productImages RESTART IDENTITY CASCADE;")
    else:
        db.session.delete(image1)
        db.session.delete(image2)
        db.session.delete(image3)
        db.session.execute(text("DELETE FROM productImages"))

    db.session.commit()
