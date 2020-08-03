import os
from flask_pymongo import PyMongo
from flask import (Flask, request, jsonify, url_for)
from bson.json_util import dumps

app = Flask(__name__)

app.config["MONGO_URI"] = "mongodb://localhost:27017/safetync"
mongo = PyMongo(app)
print(mongo.db.posts.insert_one(
    {"hello": "world"}).inserted_id)

changeStreams = mongo.db.posts.watch()
for change in changeStreams:
    print(dumps(change))
    print(' ')

if __name__ == '__main__':
    app.run()
