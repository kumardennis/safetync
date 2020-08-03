import json
import hashlib
import binascii
from database import mongo
from flask import (Flask, request, jsonify, url_for, Blueprint)

email_api = Blueprint('email_api', __name__)
