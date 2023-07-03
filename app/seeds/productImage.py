from app.models import db, ProductImage, environment, SCHEMA
from sqlalchemy.sql import text


def seed_product_images():
    nike_product1_image1 = ProductImage(
        image='https://caitlyn.s3.us-west-2.amazonaws.com/seeder/fleece_hoodie_1.jpg', is_preview=True,
        product_id=1
    )
    nike_product1_image2 = ProductImage(
        image='https://caitlyn.s3.us-west-2.amazonaws.com/seeder/fleece_hoodie_2.jpg',
        is_preview=False,
        product_id=1
    )
    nike_product1_image3 = ProductImage(
        image='https://caitlyn.s3.us-west-2.amazonaws.com/seeder/fleece_hoodie_3.jpg',
        is_preview=False,
        product_id=1
    )
    nike_product1_image4 = ProductImage(
        image='https://caitlyn.s3.us-west-2.amazonaws.com/seeder/fleece_hoodie_4.jpg',
        is_preview=False,
        product_id=1
    )
    ###########################################################################
    nike_product2_image1 = ProductImage(
        image='https://caitlyn.s3.us-west-2.amazonaws.com/seeder/shoes_1.jpg',
        is_preview=True,
        product_id=2
    )
    nike_product2_image2 = ProductImage(
        image='https://caitlyn.s3.us-west-2.amazonaws.com/seeder/shoes_2.jpg',
        is_preview=False,
        product_id=1
    )
    nike_product2_image3 = ProductImage(
        image='https://caitlyn.s3.us-west-2.amazonaws.com/seeder/shoes_3.jpg',
        is_preview=False,
        product_id=2
    )
    nike_product2_image4 = ProductImage(
        image='https://caitlyn.s3.us-west-2.amazonaws.com/seeder/shoes_4.jpg',
        is_preview=False,
        product_id=2
    )
    ##########################################################################
    nike_product3_image1 = ProductImage(
        image='https://caitlyn.s3.us-west-2.amazonaws.com/seeder/pants_1.jpg',
        is_preview=True,
        product_id=3
    )
    nike_product3_image2 = ProductImage(
        image='https://caitlyn.s3.us-west-2.amazonaws.com/seeder/pants_2.jpg',
        is_preview=False,
        product_id=3
    )
    nike_product3_image3 = ProductImage(
        image='https://caitlyn.s3.us-west-2.amazonaws.com/seeder/pants_3.jpg',
        is_preview=False,
        product_id=3
    )
    nike_product3_image4 = ProductImage(
        image='https://caitlyn.s3.us-west-2.amazonaws.com/seeder/pants_4.jpg',
        is_preview=False,
        product_id=3
    )
    ##########################################################################
    nike_product4_image1 = ProductImage(
        image='https://caitlyn.s3.us-west-2.amazonaws.com/hip_pack_1.jpg',
        is_preview=True,
        product_id=4
    )
    nike_product4_image2 = ProductImage(
        image='https://caitlyn.s3.us-west-2.amazonaws.com/hip_pack_2.jpg',
        is_preview=False,
        product_id=4
    )
    nike_product4_image3 = ProductImage(
        image='https://caitlyn.s3.us-west-2.amazonaws.com/hip_pack_3.jpg',
        is_preview=False,
        product_id=4
    )
    ##########################################################################
    nike_product5_image1 = ProductImage(
        image='https://caitlyn.s3.us-west-2.amazonaws.com/seeder/tech_swoosh_hat_1.jpg', is_preview=True,
        product_id=5
    )
    nike_product5_image2 = ProductImage(
        image='https://caitlyn.s3.us-west-2.amazonaws.com/seeder/tech_swoosh_hat_2.jpg', is_preview=False,
        product_id=5
    )
    ##########################################################################
    adidas_product1_image1 = ProductImage(
        image='https://caitlyn.s3.us-west-2.amazonaws.com/adidas-womens-shoes-01.jpg',
        is_preview=True,
        product_id=6
    )
    adidas_product1_image2 = ProductImage(
        image='https://caitlyn.s3.us-west-2.amazonaws.com/adidas-womens-shoes-02.jpg',
        is_preview=False,
        product_id=6
    )
    adidas_product1_image3 = ProductImage(
        image='https://caitlyn.s3.us-west-2.amazonaws.com/adidas-womens-shoes-03.jpg',
        is_preview=False,
        product_id=6
    )
    adidas_product1_image4 = ProductImage(
        image='https://caitlyn.s3.us-west-2.amazonaws.com/adidas-womens-shoes-04.jpg',
        is_preview=False,
        product_id=6
    )
    adidas_product1_image5 = ProductImage(
        image='https://caitlyn.s3.us-west-2.amazonaws.com/adidas-womens-shoes-05.jpg',
        is_preview=False,
        product_id=6
    )

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

    db.session.add(adidas_product1_image1)
    db.session.add(adidas_product1_image2)
    db.session.add(adidas_product1_image3)
    db.session.add(adidas_product1_image4)
    db.session.add(adidas_product1_image5)

    db.session.commit()


def undo_product_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.product_images RESTART IDENTITY CASCADE;")
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

        db.session.delete(adidas_product1_image1)
        db.session.delete(adidas_product1_image2)
        db.session.delete(adidas_product1_image3)
        db.session.delete(adidas_product1_image4)
        db.session.delete(adidas_product1_image5)

        db.session.execute(text("DELETE FROM product_images"))

    db.session.commit()
