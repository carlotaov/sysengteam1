# SIMS Discover

SIMS Discover is a data visualisation web application powered by D3.js. 

---
# Downloading the repository
 1. Click 'Clone or Download' on top of the page and select 'Download Zip'
 2. Extract the downloaded zip
---
# Setup
1. Install version 2.6 or above of Python (does not support Python 3)
2. Use the terminal to traverse to the folder where you have extracted the application
3. Install virtualenv: `virtualenv venv`
4. Initialise virtual environment `venv/scripts/activate`
5. Install Python libraries in the virtual environment `pip install --editable .`
6. Set the FLASK_APP environment:
    1. Linux/OS X: `export FLASK_APP = SIMS`
    2. Windows: `set FLASK_APP = SIMS`
7.  Set the FLASK_DEBUG environment `export FLASK_DEBUG = true`
8.  Initialise database `flask initdb`
9.  Run flask server python SIMS/SIMS.py
10. Access the application through your browser by entering the address displayed on the terminal 
("https://" + local_ip* + ":5000")
