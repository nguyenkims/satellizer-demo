import os
import flask
import jwt
from datetime import datetime, timedelta
from flask import Flask, jsonify, request
from flask.ext.sqlalchemy import SQLAlchemy
from jwt import DecodeError, ExpiredSignature

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
app.config['TOKEN_SECRET'] = 'very secret'

db = SQLAlchemy(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(100))

    def token(self):
        payload = {
            'sub': self.id,
            'iat': datetime.utcnow(),
            'exp': datetime.utcnow() + timedelta(days=14)
        }
        token = jwt.encode(payload, app.config['TOKEN_SECRET'])
        return token.decode('unicode_escape')


if os.path.exists('db.sqlite'):
    os.remove('db.sqlite')

db.create_all()


@app.route('/auth/signup', methods=['POST'])
def signup():
    data = request.json

    email = data["email"]
    password = data["password"]

    user = User(email=email, password=password)
    db.session.add(user)
    db.session.commit()

    return jsonify(token=user.token())


@app.route('/auth/login', methods=['POST'])
def login():
    data = request.json

    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify(error="No such user"), 400

    if user.password == password:
        return jsonify(token=user.token())
    else:
        return jsonify(error="Wrong email or password")


@app.route('/user')
def user_info():
    if not request.headers.get('Authorization'):
        return jsonify(error='Authorization header missing'), 401

    token = request.headers.get('Authorization').split()[1]
    try:
        payload = jwt.decode(token, app.config['TOKEN_SECRET'])
    except DecodeError:
        return jsonify(error='Invalid token'), 401
    except ExpiredSignature:
        return jsonify(error='Expired token'), 401
    else:
        user_id = payload['sub']
        user = User.query.filter_by(id=user_id).first()
        if user is None:
            return jsonify(error='Should not happen ...'), 500

        return jsonify(id=user.id, email=user.email), 200

    return jsonify(error="never reach here..."), 500


@app.route('/islive')
def islive():
    return "it's live"


@app.route('/')
def index():
    return flask.redirect('/static/index.html')


if __name__ == '__main__':
    app.run(debug=True)
