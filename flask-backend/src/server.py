from itsdangerous import URLSafeTimedSerializer, SignatureExpired

from fastapi import FastAPI
from Blueprints.AuthAPI import auth_api_router

from fastapi.encoders import jsonable_encoder

import hashlib
import binascii
import logging

app = FastAPI()


app.include_router(auth_api_router)


@app.get("/")
async def root():
    return {"message": "Hello World"}
