import flask
import jwt
from datetime import datetime, timedelta
from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy

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


db.create_all()

@app.route('/islive')
def islive():
    return "it's live"


@app.route('/')
def index():
    return flask.redirect('/static/index.html')


if __name__ == '__main__':
    app.run(debug=True)
