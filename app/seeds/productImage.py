from app.models import db, ProductImage, environment, SCHEMA
from sqlalchemy.sql import text


def seed_product_images():
    nike_product1_image1 = ProductImage(url='https://res.cloudinary.com/djclmc80y/image/upload/v1684711048/fleece_hoodie_1_szjuir.jpg', preview=True, product_id=1)
    nike_product1_image2 = ProductImage(url='https://res.cloudinary.com/djclmc80y/image/upload/v1684711047/fleece_hoodie_3_mcgffr.jpg', preview=False, product_id=1)
    nike_product1_image3 = ProductImage(url='https://res.cloudinary.com/djclmc80y/image/upload/v1684711048/fleece_hoodie_2_vlvbjp.jpg', preview=False, product_id=1)
    nike_product1_image4 = ProductImage(url='https://res.cloudinary.com/djclmc80y/image/upload/v1684711047/fleece_hoodie_4_bxkkrj.jpg', preview=False, product_id=1)

    nike_product2_image1 = ProductImage(url='https://caitlyn.s3.us-west-2.amazonaws.com/seeder/shoes_1.jpg', preview=True, product_id=2)
    nike_product2_image2 = ProductImage(url='https://res.cloudinary.com/djclmc80y/image/upload/v1684711047/fleece_hoodie_4_bxkkrj.jpg', preview=False, product_id=1)
    nike_product2_image3 = ProductImage(url='https://caitlyn.s3.us-west-2.amazonaws.com/seeder/shoes_3.jpg', preview=False, product_id=2)
    nike_product2_image4 = ProductImage(url='https://caitlyn.s3.us-west-2.amazonaws.com/seeder/shoes_4.jpg', preview=False, product_id=2)

    nike_product3_image1 = ProductImage(url='https://caitlyn.s3.us-west-2.amazonaws.com/seeder/pants_1.jpg', preview=True, product_id=3)
    nike_product3_image2 = ProductImage(url='https://caitlyn.s3.us-west-2.amazonaws.com/seeder/pants_2.jpg', preview=False, product_id=3)
    nike_product3_image3 = ProductImage(url='https://caitlyn.s3.us-west-2.amazonaws.com/seeder/fleece_hoodie_3.jpg', preview=False, product_id=3)
    nike_product3_image4 = ProductImage(url='https://caitlyn.s3.us-west-2.amazonaws.com/seeder/pants_4.jpg', preview=False, product_id=3)

    nike_product4_image1 = ProductImage(url='https://caitlyn.s3.us-west-2.amazonaws.com/hip_pack_1.jpg', preview=True, product_id=4)
    nike_product4_image2 = ProductImage(url='https://caitlyn.s3.us-west-2.amazonaws.com/hip_pack_2.jpg', preview=False, product_id=4)
    nike_product4_image3 = ProductImage(url='https://caitlyn.s3.us-west-2.amazonaws.com/hip_pack_3.jpg', preview=False, product_id=4)

    nike_product5_image1 = ProductImage(url='https://caitlyn.s3.us-west-2.amazonaws.com/seeder/tech_swoosh_hat_1.jpg', preview=True, product_id=5)
    nike_product5_image2 = ProductImage(url='https://caitlyn.s3.us-west-2.amazonaws.com/seeder/tech_swoosh_hat_2.jpg', preview=False, product_id=5)


    db.session.add(nike_product1_image1)
    db.session.add(nike_product1_image2)
    db.session.add(nike_product1_image3)
    db.session.add(nike_product1_image4)

    db.session.add(nike_product2_image1)
    db.session.add(nike_product2_image2)
    db.session.add(nike_product2_image3)
    db.session.add(nike_product2_image4)

    db.session.add(nike_product3_image1)
    db.session.add(nike_product3_image2)
    db.session.add(nike_product3_image3)
    db.session.add(nike_product3_image4)

    db.session.add(nike_product4_image1)
    db.session.add(nike_product4_image2)
    db.session.add(nike_product4_image3)

    db.session.add(nike_product5_image1)
    db.session.add(nike_product5_image2)

    db.session.commit()


def undo_product_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.productImages RESTART IDENTITY CASCADE;")
    else:
        db.session.delete(nike_product1_image1)
        db.session.delete(nike_product1_image2)
        db.session.delete(nike_product1_image3)
        db.session.delete(nike_product1_image4)

        db.session.delete(nike_product2_image1)
        db.session.delete(nike_product2_image2)
        db.session.delete(nike_product2_image3)
        db.session.delete(nike_product2_image4)

        db.session.delete(nike_product3_image1)
        db.session.delete(nike_product3_image2)
        db.session.delete(nike_product3_image3)
        db.session.delete(nike_product3_image4)

        db.session.delete(nike_product4_image2)
        db.session.delete(nike_product4_image1)
        db.session.delete(nike_product4_image3)

        db.session.delete(nike_product5_image1)
        db.session.delete(nike_product5_image2)

        db.session.execute(text("DELETE FROM productImages"))

    db.session.commit()
