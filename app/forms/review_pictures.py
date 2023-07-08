from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import SubmitField
from app.aws_helpers import ALLOWED_EXTENSIONS

class ReviewImageFrom(FlaskForm):
    image = FileField("image[]", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    submit = SubmitField("submit")
