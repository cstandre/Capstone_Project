"""empty message

Revision ID: f9a44079ec7d
Revises: ffdc0a98111c
Create Date: 2023-05-20 21:39:45.066582

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f9a44079ec7d'
down_revision = 'ffdc0a98111c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('firstName', sa.String(), nullable=False))
        batch_op.add_column(sa.Column('lastName', sa.String(), nullable=False))
        batch_op.alter_column('username',
               existing_type=sa.VARCHAR(length=40),
               type_=sa.String(length=20),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.alter_column('username',
               existing_type=sa.String(length=20),
               type_=sa.VARCHAR(length=40),
               existing_nullable=False)
        batch_op.drop_column('lastName')
        batch_op.drop_column('firstName')

    # ### end Alembic commands ###