from flask import Flask, jsonify, render_template, request
from flask_cors import CORS
from flask_frozen import Freezer
import shutil
import os

app = Flask(__name__)
CORS(app)
freezer = Freezer(app)

def calculate_tax(income, year):
    tax_rates = {
        '2023': {
            18200: 0,
            45000: 0.19,
            120000: 0.325,
            180000: 0.37,
            float('inf'): 0.45
        },
        '2022': {
            18200: 0,
            45000: 0.19,
            120000: 0.325,
            180000: 0.37,
            float('inf'): 0.45
        },
        '2021': {
            18200: 0,
            45000: 0.19,
            120000: 0.325,
            180000: 0.37,
            float('inf'): 0.45
        }
    }
    tax_rates_selected = tax_rates.get(year, tax_rates['2023'])
    tax = 0
    prev_rate = 0
    for rate, threshold in sorted(tax_rates_selected.items()):
        if income <= rate:
            tax += (income - prev_rate) * threshold
            break
        else:
            tax += (rate - prev_rate) * threshold
            prev_rate = rate
    return income - tax

@app.route('/tax_post_income/<year>.json')  
def tax_post_income(year):
    incomes = range(0, 400001, 1000)
    results = {str(income): calculate_tax(income, year) for income in incomes}
    return jsonify(results)

def tax_post_income_generator():
    years = ['2021', '2022', '2023']
    for year in years:
        yield 'tax_post_income', {'year': year}  

freezer.register_generator(tax_post_income_generator)

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    build_dir = 'build'
    if os.path.exists(build_dir):
        shutil.rmtree(build_dir)  
    freezer.freeze()  
