from fastapi import APIRouter
from flask_mail import Message
import json
import hashlib
import binascii
from .services import db
from flask import (Flask, request, jsonify, url_for, Blueprint)
import os
from itsdangerous import URLSafeTimedSerializer, SignatureExpired
from pydantic import BaseModel
from fastapi.encoders import jsonable_encoder
from starlette.responses import JSONResponse
import motor.motor_asyncio


auth_api_router = APIRouter()

uniqueURL = URLSafeTimedSerializer('SomeSecret!')


class SignupFormRequest(BaseModel):
    email: str
    username: str
    password: str
    phone: str


class SignupFormResponse(BaseModel):
    email: str
    username: str
    key: str
    salt: str
    phone: str
    verified_email: bool


@auth_api_router.put('/signup', response_model=SignupFormResponse)
async def signup(request: SignupFormRequest):

    json_compatible_item_data = jsonable_encoder(request)

    user = json_compatible_item_data
    for key, value in user.items():
        user[key] = value.strip()

    email = user['email']
    password = user['password']

    salt = hashlib.sha256(os.urandom(60)).hexdigest().encode('ascii')
    key = hashlib.pbkdf2_hmac('sha512', password.encode('utf-8'), salt, 100000)
    key = binascii.hexlify(key)

    user.pop('password')

    token = uniqueURL.dumps(email, salt='email-verify')

    user['token'] = token
    user['salt'] = salt
    user['key'] = key
    user['verified_email'] = False

    signup = await db.users.insert_one(user)

    return user

    # msg = Message(
    #     'Confirm Email', sender='safetync-0553f3@inbox.mailtrap.io', recipients=[email])

    # link = url_for('auth_api.confirm_email', token=token, _external=True)

    # msg.body = 'Please confirm your email by clicking on the link {}'.format(
    #     link)

    # mail.send(msg)
    # error = ''
    # try:
    #     mail.send(msg)
    #     return 'Signed Up! An email has been sent to you inbox, please verify your email.'
    # except Exception:
    #     return (str(Exception))


@auth_api_router.get('/confirm_email/{token}')
async def confirm_email(token):
    try:
        mail = uniqueURL.loads(token, salt='email-verify', max_age=3600)

        query = {'token': token}
        updateVerification = {'$set': {'verified_email': True}}
        verify_email = db.users.update_one(query, updateVerification)
    except SignatureExpired:
        return 'The token is expired!'
    return 'The token works! '+token


@auth_api_router.post('/signin')
async def signin():
    requestJSON = request.json['body']
    user = json.loads(json.dumps(requestJSON))
    password = user['password']
    user.pop('password')
    storedKey = db.users.find_one(user)

    salt = storedKey['salt']
    key = hashlib.pbkdf2_hmac('sha512', password.encode('utf-8'), salt, 100000)
    key = binascii.hexlify(key)

    return 'matched' if key == storedKey['key'] else 'not matched'
