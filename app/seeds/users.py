from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name='Demo', last_name='User', username='DemoUser', email='demo@aa.io', password='password')
    caitlyn = User(
        first_name='Caitlyn', last_name='St.Andre', username='CaitlynStandre', email='caitlynstandre@gmail.com', password='password')
    camden = User(
        first_name='Camden', last_name='St.Andre', username='CamTheSaint', email='Camden@gmail.com', password='password')

    db.session.add(demo)
    db.session.add(caitlyn)
    db.session.add(camden)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
