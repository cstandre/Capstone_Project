from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text


def seed_products():
    nike_product_1 = Product(
        owner_id=1, product_name='Nike Sportswear Club Fleece Women\'s Oversized Crop Graphic Hoodie', price=70.00, brand='Nike', stock_quantity=50, description='Club Fleece sweatshirts, universally loved for their coziness and consistency, are for everyone. Always soft and made with a relaxed fit, they’re basics that help you do more. Cropped to meet your favorite high-waisted pants, this spacious hoodie is perfect for colder days that call for a little extra style.')
    nike_product_2 = Product(
        owner_id=1, product_name='Nike Women\'s Sneaker Running Shoes', price=122.00, brand='Nike', stock_quantity=100, description='Women\'s running shoes from Nike.')
    nike_product_3 = Product(
        owner_id=1, product_name='Nike Women\'s NSW Tight Fleece Varsity', price=50.00, brand='Nike', stock_quantity=5, description='The semi-brushed fleece fabric has a soft, lightweight feel perfect for everyday wear')
    nike_product_4 = Product(
        owner_id=1, product_name='Nike Tech Hip Pack', price=58.00, brand='Nike', stock_quantity=50, description='The Nike Tech Hip Pack lets you easily access and carry your gear. It features 2 zippered pockets to store your stuff and an adjustable strap allowing you to customize your fit.'
    )
    nike_product_5 = Product(
        owner_id=1, product_name='Nike Legacy 91 Tech Swoosh Hat', price=32.30, brand='Nike', stock_quantity=400, description='CLASSIC COMFORT. The Nike Dri-FIT Legacy91 Hat is a comfortable course staple with a metal buckle closure and a soft sweatband. This product is made with at least 50% recycled polyester fibers. Benefits Nike Dri-FIT technology moves sweat away from your skin for quicker evaporation, helping you stay dry and comfortable. Sweatband is soft and absorbent. Adjustable closure lets you personalize your fit.'
    )
    ##############################################################################
    adidas_product_1 = Product(
        owner_id = 2, product_name = 'adidas Women\'s Puremotion Adapt Running Shoe', price=56.00, brand='Adidas', stock_quantity=1000, description='Built for running. Revitalized for style. Sharp and simple, meet clean and laceless. Cut what\'s unnecessary, keep the attitude.'
    )

    db.session.add(nike_product_1)
    db.session.add(nike_product_2)
    db.session.add(nike_product_3)
    db.session.add(nike_product_4)
    db.session.add(nike_product_5)

    db.session.add(adidas_product_1)

    db.session.commit()


def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.delete(nike_product_1)
        db.session.delete(nike_product_2)
        db.session.delete(nike_product_3)
        db.session.delete(nike_product_4)
        db.session.delete(nike_product_5)

        db.session.delete(adidas_product_1)

        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
