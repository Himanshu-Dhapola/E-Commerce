import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

data = pd.read_json('E-Commerce.products.json')

data['combined_features'] = data['category'] + ' ' + data['brand']

vectorizer = TfidfVectorizer(stop_words='english')

tfidf_matrix = vectorizer.fit_transform(data['combined_features'])

cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)

def recommend_products(product_id, cosine_sim=cosine_sim):
    product_id = str(product_id)
    idx_list = data.index[data['_id'] == product_id].tolist()

    if not idx_list:
        return f"Product ID {product_id} not found in the dataset."
    
    idx = idx_list[0]
    
    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:9]
    product_indices = [i[0] for i in sim_scores]

    return data.iloc[product_indices][['_id', 'title', 'description', 'discountPercentage', 'discountedPrice', 'price', 'imageUrl', 'brand']]
