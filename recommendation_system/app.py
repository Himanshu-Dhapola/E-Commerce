from flask import Flask, jsonify, request
from recommendation import recommend_products
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": ["http://localhost:5173"]}})


@app.route('/recommend/<product_id>', methods=['GET'])
def get_recommendations(product_id): 
    recommended_products = recommend_products(product_id)
    return jsonify(recommended_products.to_dict(orient='records'))

if __name__ == '__main__':
    app.run(debug=True)
