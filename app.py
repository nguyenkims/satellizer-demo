from flask import Flask

app = Flask(__name__)


@app.route('/islive')
def islive():
    return "it's live"


if __name__ == '__main__':
    app.run(debug=True)
