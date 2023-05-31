from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField, IntegerField, SubmitField
from wtforms.validators import DataRequired, NumberRange


class ProductForm(FlaskForm):
    product_name = StringField('product_name', validators=[DataRequired()])
    price = DecimalField('price', places=2, validators=[NumberRange(min=0)])
    brand = StringField('brand', validators=[DataRequired()])
    stock_quantity = IntegerField('stock_quantity', validators=[NumberRange(min=0)])
    description = StringField('description', validators=[DataRequired()])
    submit = SubmitField('Submit')
