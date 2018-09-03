FROM python:3.7-alpine
WORKDIR /code

# install node, bower: bower might need git as well
RUN apk add --update nodejs nodejs-npm git \
    && npm install -g bower

COPY ./requirements.txt .

RUN set -e; \
    # workaround to install cryptography
    apk del libressl-dev \
    && apk add openssl-dev \
    # for cffi
    && apk add libffi-dev build-base \
    # for pillow
    && apk add build-base python-dev jpeg-dev zlib-dev \
    && pip install -r requirements.txt \
    # remove cryptography workaround
    && apk del openssl-dev \
    && apk add libressl-dev

COPY ./static/bower.json ./static/bower.json
RUN cd static \
    && bower install --allow-root

ADD . /code

# expose port
EXPOSE 5003

CMD ["python", "app.py" ]
