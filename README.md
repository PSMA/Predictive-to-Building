# Predictive to Building

[![Build Status](https://img.shields.io/badge/version-1.0.0-brightgreen.svg)](https://semver.org/)

Predictive to Building shows how building data can be pulled directly from an address suggestion.

## Requirements

- A beta API Key [register for the beta here](https://developer.psma.com.au/beta-program)
- Python >= 3.6

## Usage

### Setup

1. Clone the repo (or download and unzip)
2. Paste your beta API key into a new file and save it as `api.key`
3. Open a terminal/console/command prompt in the repository directory
4. Create virtual environment (`python -m venv env`)
5. Activate virtual envorinemnt (`.\env\scripts\activate`)
6. Install requirements (`pip install -r requirements.txt`)

### Run

1. Run Flask server (`python flaskApp.py`)
2. Use a browser to connect to localhost:5000
3. Start typing address in textbox
4. Click on a suggestion below the textbox to show the building footprint on the map