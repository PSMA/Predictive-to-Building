from flask import Flask, request, current_app
import os
import json
import requests

app = Flask(__name__)

with open("api.key", 'r') as key_file:
    api_key = key_file.readline().strip()

@app.route("/")
def hello():
    return current_app.send_static_file('index.html')

@app.route('/script.js')
def send_js():
    return current_app.send_static_file('script.js')

        
@app.route("/suggest")
def suggest():
    addressString = request.args.get('addressString')
    url = "https://api.psma.com.au/beta/v1/predictive/address/"
    headers = {'authorization': api_key}
    params = {
        'query' : addressString,
        'maxNumberOfResults': 10,
        'dataset': 'gnaf'
    }
    response = requests.request("GET", url, headers=headers, params=params)
    return response.text
        

@app.route("/getBuilding")
def getBuilding():
    addressId = request.args.get('addressId')
    url = "https://api.psma.com.au/beta/v1/buildings"
    headers = {'authorization': api_key}
    params = {
        'addressId': addressId,
        'include': 'footprint2d'
    }
    response = requests.request("GET", url, headers=headers, params=params)
    return response.text

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')