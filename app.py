import flask
from flask import Flask

app = Flask(__name__)


@app.route('/islive')
def islive():
    return "it's live"


@app.route('/')
def index():
    return flask.redirect('/static/index.html')


if __name__ == '__main__':
    app.run(debug=True)
