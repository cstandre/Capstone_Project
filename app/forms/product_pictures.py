from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import SubmitField, BooleanField
from app.api.aws_helpers import ALLOWED_EXTENSIONS

class ImageForm(FlaskForm):
    image = FileField("image", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    is_preview = BooleanField("is_preview")
    submit = SubmitField("submit")
