FROM ubuntu:16.04

# install python3
RUN apt-get update && apt-get install -y python3-dev python3-pip
ADD . /code
WORKDIR /code
RUN pip3 install -q -r requirements.txt

# install nodejs and bower
RUN apt-get install -y curl python-software-properties git
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN apt-get install -y nodejs
RUN npm install -g bower

# install bower dependencies
RUN cd static && bower --allow-root install

EXPOSE 5002

CMD python3 app.py
