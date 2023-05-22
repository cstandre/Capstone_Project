from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text


def seed_products():
    product1 = Product(
        owner_id=1,
        product_name='Nike Sportswear Club Fleece Women\'s Oversized Crop Graphic Hoodie',
        price=70.00,
        brand='Nike',
        stock_quantity=50,
        description='Club Fleece sweatshirts, universally loved for their coziness and consistency, are for everyone. Always soft and made with a relaxed fit, they’re basics that help you do more. Cropped to meet your favorite high-waisted pants, this spacious hoodie is perfect for colder days that call for a little extra style.')
    product2 = Product(
        owner_id=2,
        product_name='Nike Women\'s Sneaker Running Shoes',
        price=122.00, brand='Nike',
        stock_quantity=100,
        description='Women\'s running shoes from Nike.')
    product3 = Product(
        owner_id=3,
        product_name='Nike Women\'s NSW Tight Fleece Varsity',
        price=50.00,
        brand='Nike',
        stock_quantity=5,
        description='The semi-brushed fleece fabric has a soft, lightweight feel perfect for everyday wear')

    db.session.add(product1)
    db.session.add(product2)
    db.session.add(product3)
    db.session.commit()


def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.delete(product1)
        db.session.delete(product2)
        db.session.delete(product3)
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
