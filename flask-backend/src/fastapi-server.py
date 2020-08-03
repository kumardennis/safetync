# from fastapi import FastAPI
# import motor.motor_asyncio
# import requests
# import json
import strict_rfc3339
# from Blueprints.weatherToken import token
# from pydantic import BaseModel

# app = FastAPI()


# @app.get("/")
# async def root():
#     return {"message": "Hello World"}


# class Request(BaseModel):
#     lat: float
#     lng: float


# class Response(BaseModel):
#     airQualityIndex: int
#     timestamp: str


# @app.get('/weather')
# async def get_weather():
#     lat = 59.4370
#     lng = 24.7536
#     response = requests.get(
#         f'https://api.waqi.info/feed/geo:{lat};{lng}/?token={token}')
#     response_dict = response.json()

#     rfctime = strict_rfc3339.timestamp_to_rfc3339_utcoffset(
#         1586869200)
#     custom_response = {}
#     custom_response['airQualityIndex'] = response_dict['data']['aqi']
#     custom_response['timestamp'] = rfctime
#     return custom_response

rfctime = strict_rfc3339.timestamp_to_rfc3339_utcoffset(
    1586869200)

print(rfctime)