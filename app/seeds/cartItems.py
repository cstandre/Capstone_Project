from app.models import db, CartItem, environment, SCHEMA
from sqlalchemy.sql import text


def seed_cart_items():
    item1 = CartItem()
    item2 = CartItem()
    item3 = CartItem()

    db.session.add(item1)
    db.session.add(item2)
    db.session.add(item3)
    db.session.commit()


def undo_cart_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.cartItems RESTART IDENTITY CASCADE;")
    else:
        db.session.delete(item1)
        db.session.delete(item2)
        db.session.delete(item3)
        db.session.execute(text("DELETE FROM cartItems"))

    db.session.commit()
