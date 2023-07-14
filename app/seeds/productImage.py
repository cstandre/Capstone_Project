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
    ##########################################################################
    adidas_product2_image1 = ProductImage(
        image='https://caitlyn.s3.us-west-2.amazonaws.com/adidas-backpack-01.jpg',
        is_preview=True,
        product_id=7
    )
    adidas_product2_image2 = ProductImage(
        image='https://caitlyn.s3.us-west-2.amazonaws.com/adidas-backpack-02.jpg',
        is_preview=False,
        product_id=7
    )
    adidas_product2_image3 = ProductImage(
        image='https://caitlyn.s3.us-west-2.amazonaws.com/adidas-backpack-03.jpg',
        is_preview=False,
        product_id=7
    )
    adidas_product2_image4 = ProductImage(
        image='https://caitlyn.s3.us-west-2.amazonaws.com/adidas-backpack-04.jpg',
        is_preview=False,
        product_id=7
    )
    adidas_product2_image5 = ProductImage(
        image='https://caitlyn.s3.us-west-2.amazonaws.com/adidas-backpack-05.jpg',
        is_preview=False,
        product_id=7
    )
    ##########################################################################
    adidas_product3_image1 = ProductImage(
        image='https://caitlyn.s3.us-west-2.amazonaws.com/adidas-beanie-01.jpg',
        is_preview=True,
        product_id=8
    )
    adidas_product3_image2 = ProductImage(
        image='https://caitlyn.s3.us-west-2.amazonaws.com/adidas-beanie-02.jpg',
        is_preview=False,
        product_id=8
    )
    adidas_product3_image3 = ProductImage(
        image='https://caitlyn.s3.us-west-2.amazonaws.com/adidas-beanie-03.jpg',
        is_preview=False,
        product_id=8
    )
    adidas_product3_image4 = ProductImage(
        image='https://caitlyn.s3.us-west-2.amazonaws.com/adidas-beanie-04.jpg',
        is_preview=False,
        product_id=8
    )
    ##########################################################################
    adidas_product4_image1 = ProductImage(
        image='https://caitlyn.s3.us-west-2.amazonaws.com/adidas-crew-neck-01.jpg',
        is_preview=True,
        product_id=9
    )
    adidas_product4_image2 = ProductImage(
        image='https://caitlyn.s3.us-west-2.amazonaws.com/adidas-crew-neck-02.jpg',
        is_preview=False,
        product_id=9
    )
    adidas_product4_image3 = ProductImage(
        image='https://caitlyn.s3.us-west-2.amazonaws.com/adidas-crew-neck-03.jpg',
        is_preview=False,
        product_id=9
    )
    adidas_product4_image4 = ProductImage(
        image='https://caitlyn.s3.us-west-2.amazonaws.com/adidas-crew-neck-04.jpg',
        is_preview=False,
        product_id=9
    )
    ##########################################################################
    cleaning_product1_image1 = ProductImage (
        image='https://caitlyn.s3.us-west-2.amazonaws.com/all-purpose-01.jpg',
        is_preview=True,
        product_id=10
    )
    cleaning_product1_image2 = ProductImage (
        image='https://caitlyn.s3.us-west-2.amazonaws.com/all-purpose-02.jpg',
        is_preview=False,
        product_id=10
    )
    cleaning_product1_image3 = ProductImage (
        image='https://caitlyn.s3.us-west-2.amazonaws.com/all-purpose-03.jpg',
        is_preview=False,
        product_id=10
    )
    cleaning_product1_image4 = ProductImage (
        image='https://caitlyn.s3.us-west-2.amazonaws.com/all-purpose-04.jpg',
        is_preview=False,
        product_id=10
    )
    cleaning_product1_image5 = ProductImage (
        image='https://caitlyn.s3.us-west-2.amazonaws.com/all-purpose-05.jpg',
        is_preview=False,
        product_id=10
    )
    ##########################################################################
    cleaning_product2_image1 = ProductImage (
        image='https://caitlyn.s3.us-west-2.amazonaws.com/magic-eraser-01.jpg',
        is_preview=True,
        product_id=11
    )
    cleaning_product2_image2 = ProductImage (
        image='https://caitlyn.s3.us-west-2.amazonaws.com/magic-eraser-02.jpg',
        is_preview=False,
        product_id=11
    )
    cleaning_product2_image3 = ProductImage (
        image='https://caitlyn.s3.us-west-2.amazonaws.com/magic-eraser-03.jpg',
        is_preview=False,
        product_id=11
    )
    cleaning_product2_image4 = ProductImage (
        image='https://caitlyn.s3.us-west-2.amazonaws.com/magic-eraser-04.jpg',
        is_preview=False,
        product_id=11
    )
    cleaning_product2_image5 = ProductImage (
        image='https://caitlyn.s3.us-west-2.amazonaws.com/magic-eraser-05.jpg',
        is_preview=False,
        product_id=11
    )

    ##########################################################################
    cleaning_product3_image1 = ProductImage (
        image='https://caitlyn.s3.us-west-2.amazonaws.com/pink-stuff-01.jpg',
        is_preview=True,
        product_id=12
    )
    cleaning_product3_image2 = ProductImage (
        image='https://caitlyn.s3.us-west-2.amazonaws.com/pink-stuff-02.jpg',
        is_preview=False,
        product_id=12
    )
    cleaning_product3_image3 = ProductImage (
        image='https://caitlyn.s3.us-west-2.amazonaws.com/pink-stuff-03.jpg',
        is_preview=False,
        product_id=12
    )
    cleaning_product3_image4 = ProductImage (
        image='https://caitlyn.s3.us-west-2.amazonaws.com/pink-stuff-04.jpg',
        is_preview=False,
        product_id=12
    )
    cleaning_product3_image5 = ProductImage (
        image='https://caitlyn.s3.us-west-2.amazonaws.com/pink-stuff-05.jpg',
        is_preview=False,
        product_id=12
    )
    ##########################################################################
    cleaning_product4_image1 = ProductImage (
        image='https://caitlyn.s3.us-west-2.amazonaws.com/rags-01.jpg',
        is_preview=True,
        product_id=13
    )
    cleaning_product4_image2 = ProductImage (
        image='https://caitlyn.s3.us-west-2.amazonaws.com/rags-02.jpg',
        is_preview=False,
        product_id=13
    )
    cleaning_product4_image3 = ProductImage (
        image='https://caitlyn.s3.us-west-2.amazonaws.com/rags-03.jpg',
        is_preview=False,
        product_id=13
    )
    cleaning_product4_image4 = ProductImage (
        image='https://caitlyn.s3.us-west-2.amazonaws.com/rags-04.jpg',
        is_preview=False,
        product_id=13
    )
    cleaning_product4_image5 = ProductImage (
        image='https://caitlyn.s3.us-west-2.amazonaws.com/rags-05.jpg',
        is_preview=False,
        product_id=13
    )
    ##########################################################################
    zelda_product1_image1 = ProductImage (
        image='https://caitlyn.s3.us-west-2.amazonaws.com/BOTW-01.jpg',
        is_preview=True,
        product_id=14
    )
    zelda_product1_image2 = ProductImage (
        image='https://caitlyn.s3.us-west-2.amazonaws.com/BOTW-02.jpg',
        is_preview=False,
        product_id=14
    )
    zelda_product1_image3 = ProductImage (
        image='https://caitlyn.s3.us-west-2.amazonaws.com/BOTW-03.jpg',
        is_preview=False,
        product_id=14
    )
    zelda_product1_image4 = ProductImage (
        image='https://caitlyn.s3.us-west-2.amazonaws.com/BOTW-04.jpg',
        is_preview=False,
        product_id=14
    )
    zelda_product1_image5 = ProductImage (
        image='https://caitlyn.s3.us-west-2.amazonaws.com/BOTW-05.jpg',
        is_preview=False,
        product_id=14
    )
    ##########################################################################
    zelda_product2_image1 = ProductImage (
        image='https://caitlyn.s3.us-west-2.amazonaws.com/controller-01.jpg',
        is_preview=True,
        product_id=15
    )
    zelda_product2_image2 = ProductImage (
        image='https://caitlyn.s3.us-west-2.amazonaws.com/controller-02.jpg',
        is_preview=False,
        product_id=15
    )
    zelda_product2_image3 = ProductImage (
        image='https://caitlyn.s3.us-west-2.amazonaws.com/controller-03.jpg',
        is_preview=False,
        product_id=15
    )
    zelda_product2_image4 = ProductImage (
        image='https://caitlyn.s3.us-west-2.amazonaws.com/controller-04.jpg',
        is_preview=False,
        product_id=15
    )
    ##########################################################################
    zelda_product3_image1 = ProductImage (
        image='https://caitlyn.s3.us-west-2.amazonaws.com/glasses-01.jpg',
        is_preview=True,
        product_id=16
    )
    zelda_product3_image2 = ProductImage (
        image='https://caitlyn.s3.us-west-2.amazonaws.com/glasses-02.jpg',
        is_preview=False,
        product_id=16
    )
    zelda_product3_image3 = ProductImage (
        image='https://caitlyn.s3.us-west-2.amazonaws.com/glasses-03.jpg',
        is_preview=False,
        product_id=16
    )
    zelda_product3_image4 = ProductImage (
        image='https://caitlyn.s3.us-west-2.amazonaws.com/glasses-04.jpg',
        is_preview=False,
        product_id=16
    )
    zelda_product3_image5 = ProductImage (
        image='https://caitlyn.s3.us-west-2.amazonaws.com/glasses-05.jpg',
        is_preview=False,
        product_id=16
    )
    ##########################################################################
    zelda_product4_image1 = ProductImage (
        image='https://caitlyn.s3.us-west-2.amazonaws.com/tears-of-the-kingdom-01.jpg',
        is_preview=True,
        product_id=17
    )
    zelda_product4_image2 = ProductImage (
        image='https://caitlyn.s3.us-west-2.amazonaws.com/tears-of-the-kingdom-02.jpg',
        is_preview=False,
        product_id=17
    )
    zelda_product4_image3 = ProductImage (
        image='https://caitlyn.s3.us-west-2.amazonaws.com/tears-of-the-kingdom-03.jpg',
        is_preview=False,
        product_id=17
    )
    zelda_product4_image4 = ProductImage (
        image='https://caitlyn.s3.us-west-2.amazonaws.com/tears-of-the-kingdom-04.jpg',
        is_preview=False,
        product_id=17
    )
    zelda_product4_image5 = ProductImage (
        image='https://caitlyn.s3.us-west-2.amazonaws.com/tears-of-the-kingdom-04.jpg',
        is_preview=False,
        product_id=17
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

    db.session.add(adidas_product2_image1)
    db.session.add(adidas_product2_image2)
    db.session.add(adidas_product2_image3)
    db.session.add(adidas_product2_image4)
    db.session.add(adidas_product2_image5)

    db.session.add(adidas_product3_image1)
    db.session.add(adidas_product3_image2)
    db.session.add(adidas_product3_image3)
    db.session.add(adidas_product3_image4)

    db.session.add(adidas_product4_image1)
    db.session.add(adidas_product4_image2)
    db.session.add(adidas_product4_image3)
    db.session.add(adidas_product4_image4)

    db.session.add(cleaning_product1_image1)
    db.session.add(cleaning_product1_image2)
    db.session.add(cleaning_product1_image3)
    db.session.add(cleaning_product1_image4)
    db.session.add(cleaning_product1_image5)

    db.session.add(cleaning_product2_image1)
    db.session.add(cleaning_product2_image2)
    db.session.add(cleaning_product2_image3)
    db.session.add(cleaning_product2_image4)
    db.session.add(cleaning_product2_image5)

    db.session.add(cleaning_product3_image1)
    db.session.add(cleaning_product3_image2)
    db.session.add(cleaning_product3_image3)
    db.session.add(cleaning_product3_image4)
    db.session.add(cleaning_product3_image5)

    db.session.add(cleaning_product4_image1)
    db.session.add(cleaning_product4_image2)
    db.session.add(cleaning_product4_image3)
    db.session.add(cleaning_product4_image4)
    db.session.add(cleaning_product4_image5)

    db.session.add(zelda_product1_image1)
    db.session.add(zelda_product1_image2)
    db.session.add(zelda_product1_image3)
    db.session.add(zelda_product1_image4)
    db.session.add(zelda_product1_image5)

    db.session.add(zelda_product2_image1)
    db.session.add(zelda_product2_image2)
    db.session.add(zelda_product2_image3)
    db.session.add(zelda_product2_image4)

    db.session.add(zelda_product3_image1)
    db.session.add(zelda_product3_image2)
    db.session.add(zelda_product3_image3)
    db.session.add(zelda_product3_image4)
    db.session.add(zelda_product3_image5)

    db.session.add(zelda_product4_image1)
    db.session.add(zelda_product4_image2)
    db.session.add(zelda_product4_image3)
    db.session.add(zelda_product4_image4)
    db.session.add(zelda_product4_image5)



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

        db.session.delete(adidas_product2_image1)
        db.session.delete(adidas_product2_image2)
        db.session.delete(adidas_product2_image3)
        db.session.delete(adidas_product2_image4)
        db.session.delete(adidas_product2_image5)

        db.session.delete(adidas_product3_image1)
        db.session.delete(adidas_product3_image2)
        db.session.delete(adidas_product3_image3)
        db.session.delete(adidas_product3_image4)

        db.session.delete(adidas_product4_image1)
        db.session.delete(adidas_product4_image2)
        db.session.delete(adidas_product4_image3)
        db.session.delete(adidas_product4_image4)

        db.session.delete(cleaning_product1_image1)
        db.session.delete(cleaning_product1_image2)
        db.session.delete(cleaning_product1_image3)
        db.session.delete(cleaning_product1_image4)
        db.session.delete(cleaning_product1_image5)

        db.session.delete(cleaning_product2_image1)
        db.session.delete(cleaning_product2_image2)
        db.session.delete(cleaning_product2_image3)
        db.session.delete(cleaning_product2_image4)
        db.session.delete(cleaning_product2_image5)

        db.session.delete(cleaning_product3_image1)
        db.session.delete(cleaning_product3_image2)
        db.session.delete(cleaning_product3_image3)
        db.session.delete(cleaning_product3_image4)
        db.session.delete(cleaning_product3_image5)

        db.session.delete(cleaning_product4_image1)
        db.session.delete(cleaning_product4_image2)
        db.session.delete(cleaning_product4_image3)
        db.session.delete(cleaning_product4_image4)
        db.session.delete(cleaning_product4_image5)

        db.session.delete(zelda_product1_image1)
        db.session.delete(zelda_product1_image2)
        db.session.delete(zelda_product1_image3)
        db.session.delete(zelda_product1_image4)
        db.session.delete(zelda_product1_image5)

        db.session.delete(zelda_product2_image1)
        db.session.delete(zelda_product2_image2)
        db.session.delete(zelda_product2_image3)
        db.session.delete(zelda_product2_image4)

        db.session.delete(zelda_product3_image1)
        db.session.delete(zelda_product3_image2)
        db.session.delete(zelda_product3_image3)
        db.session.delete(zelda_product3_image4)
        db.session.delete(zelda_product3_image5)

        db.session.delete(zelda_product4_image1)
        db.session.delete(zelda_product4_image2)
        db.session.delete(zelda_product4_image3)
        db.session.delete(zelda_product4_image4)
        db.session.delete(zelda_product4_image5)


        db.session.execute(text("DELETE FROM product_images"))

    db.session.commit()
