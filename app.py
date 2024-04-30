from flask import Flask, jsonify, render_template, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
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


@app.route('/tax_post_income')
def tax_post_income():
    year = request.args.get('year', '2023')
    incomes = range(0, 400001, 1000)
    results = {str(income): calculate_tax(income, year) for income in incomes}
    return jsonify(results)

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
