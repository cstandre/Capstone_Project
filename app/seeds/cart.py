from app.models import db, Cart, environment, SCHEMA
from sqlalchemy.sql import text


def seed_cart():
    cart1 = Cart(user_id=1)
    cart2 = Cart(user_id=2)
    cart3 = Cart(user_id=3)

    db.session.add(cart1)
    db.session.add(cart2)
    db.session.add(cart3)
    db.session.commit()


def undo_cart():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.carts RESTART IDENTITY CASCADE;")
    else:
        db.session.delete(cart1)
        db.session.delete(cart2)
        db.session.delete(cart3)
        db.session.execute(text("DELETE FROM carts"))

    db.session.commit()
