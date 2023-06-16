from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Review


review_routes = Blueprint('reviews', __name__)

## Get all reviews
@review_routes.route('')
def all_reviews():
    """
    Query for all reviews and return them in a list of dictionaries.
    """
    reviews = Review.query.all()

    if not reviews:
        return {'error': 'No reviews could be found'}

    return {review.id: review.to_dict() for review in reviews}

## Get all reviews for the current user
@review_routes.route('/current')
@login_required
def user_reviews():
    """
    Queries for all reviews and returns only the reviews that where written by the current user.
    """

    user_id = current_user.id
    reviews = Review.query.filter_by(user_id = user_id)

    if not reviews:
        return {'error': 'Reviews not found'}

## Create a review


## Edit your review

## Delete you review

## Add img to review
