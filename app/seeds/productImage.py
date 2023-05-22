from app.models import db, ProductImage, environment, SCHEMA
from sqlalchemy.sql import text


def seed_product_images():
    image1 = ProductImage(url='https://res.cloudinary.com/djclmc80y/image/upload/v1684711048/fleece_hoodie_1_szjuir.jpg', preview=True, product_id=1)
    image2 = ProductImage(url='https://res.cloudinary.com/djclmc80y/image/upload/v1684711047/fleece_hoodie_3_mcgffr.jpg', preview=False, product_id=1)
    image3 = ProductImage(url='https://res.cloudinary.com/djclmc80y/image/upload/v1684711048/fleece_hoodie_2_vlvbjp.jpg', preview=False, product_id=1)
    image4 = ProductImage(url='https://res.cloudinary.com/djclmc80y/image/upload/v1684711047/fleece_hoodie_4_bxkkrj.jpg', preview=False, product_id=1)

    db.session.add(image1)
    db.session.add(image2)
    db.session.add(image3)
    db.session.add(image4)
    db.session.commit()


def undo_product_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.productImages RESTART IDENTITY CASCADE;")
    else:
        db.session.delete(image1)
        db.session.delete(image2)
        db.session.delete(image3)
        db.session.delete(image4)
        db.session.execute(text("DELETE FROM productImages"))

    db.session.commit()
