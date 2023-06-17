from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField
from wtforms.validators import DataRequired

class ReviewForm(FlaskForm):
    header = StringField('header', validators=[DataRequired()])
    review = StringField('review', validators=[DataRequired()])
    stars = IntegerField('stars', validators=[DataRequired()])
    submit = SubmitField('submit')
