from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, nullable=False)
    in_progress = db.Column(db.Boolean, default=True)
