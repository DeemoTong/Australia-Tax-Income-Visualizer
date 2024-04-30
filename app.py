from flask import Flask, jsonify, render_template
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
def calculate_tax(income):
    if income <= 18200:
        tax = 0
    elif income <= 45000:
        tax = (income - 18200) * 0.19
    elif income <= 120000:
        tax = 5092 + (income - 45000) * 0.325
    elif income <= 180000:
        tax = 29467 + (income - 120000) * 0.37
    else:
        tax = 51667 + (income - 180000) * 0.45
    return income - tax

@app.route('/tax_post_income')
def tax_post_income():
    incomes = range(0, 400001, 1000)
    results = {str(income): calculate_tax(income) for income in incomes}
    return jsonify(results)

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
