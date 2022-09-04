
import json
import random
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.neural_network import MLPClassifier
import pickle

filename = "intents_dataset.json"
with open(filename, 'r', encoding='UTF-8') as file:
    data = json.load(file)

X = []
y = []

for name in data:
    for phrase in data[name]['examples']:
        X.append(phrase)
        y.append(name)
    for phrase in data[name]['responses']:
        X.append(phrase)
        y.append(name)

vectorizer = CountVectorizer()
vectorizer.fit(X)
X_vec = vectorizer.transform(X)

filename = 'finalized_model.sav'
model_mlp = pickle.load(open(filename, 'rb'))
model_mlp.score(X_vec, y)

def get_intent(text):
    return model_mlp.predict(vectorizer.transform([text]))[0]

def get_response(intent):
    return random.choice(data[intent]['responses'])

def bot(text):
    return get_response(get_intent(text))

#print('Go:\n')
#text = ""
#while text != "Выход":
#    text=input('< ')
#    print('>', bot(text))