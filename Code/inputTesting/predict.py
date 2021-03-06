# Note: The following testing script expects the following trained model pickle files in model-training directory
#1. logistic_regression-pca-one-gram-one-day-mixed-data-model.pkl
#2. random_forest-XGBoost-pca-one-gram-one-day-mixed-data-3k-30-model.pkl
#3. random-forest-pca-one-gram-one-day-mixed-data-model.pkl
#4. svm-pca-one-gram-one-day-mixed-data-model.pkl

# The sizes of these trained models is in GBs so they could not been uploaded to git repo. These files can be instead downloaded from following drive link:
# https://drive.google.com/drive/folders/15vqLDwFREx9gX7kcnJb68MgI4W20J0iF?usp=sharing




import pickle
import string
import re

from nltk.corpus import stopwords, words
from nltk import sent_tokenize,wordpunct_tokenize
from nltk.stem import SnowballStemmer

# input_doc = sys.argv[1]
# model = sys.argv[2]
# print(input_doc, model)
# # with open('test-input.txt', 'r') as file:
# #     input_doc = file.read().replace('\n', '')

# input_doc = input_doc.lower()

# #print("input is: \n", input_doc)

# input_sentences = []
# for sentence in nltk.sent_tokenize(input_doc):
#     if 'amazon' in sentence or 'amzn' in sentence or 'apple' in sentence or 'aapl' in sentence:
#         input_sentences.append(sentence)

# if not input_sentences:
#     print('The input news provided is not related to either AMAZON or APPLE')
# else
#     print('i am not empty')
def extract_words(input_words):
    
    # Remove all non-ascii words
    processed_words = [w for w in input_words if w.isascii()]
    
    # Remove punctuation words
    tr_dict = str.maketrans(dict.fromkeys(string.punctuation))
    processed_words = [w.translate(tr_dict) for w in processed_words if w]
    
    # Remove links
    final_words = []
    for word in processed_words:
        if not re.match('[www]', word):
            final_words.append(word)
    
    # Remove stop words
    stop_words = set(stopwords.words('english'))
    processed_words = [w for w in final_words if w not in stop_words]
    
    # Stem words and return unique words
    stemmer = SnowballStemmer('english')
    seen = set()
    processed_words = [stemmer.stem(word) for word in processed_words if word]
    processed_words = [x for x in processed_words if not (x in seen or seen.add(x))]
    del seen
    
    # Keep only words from English dictionary
    english_words = set([w.lower() for w in words.words()])
    processed_words = [w for w in processed_words if w in english_words]
    
    return processed_words

def predictStockPrice(input_doc, model):
    input_doc = input_doc.lower()
    input_sentences = []
    for sentence in sent_tokenize(input_doc):
        if 'amazon' in sentence or 'amzn' in sentence or 'apple' in sentence or 'aapl' in sentence:
            input_sentences.append(sentence)
    
    token_words = []
    print(token_words)
    for sentence in input_sentences:
        token_words.extend(wordpunct_tokenize(sentence))
    token_words = extract_words(token_words)

    preprocessed_input = [' '.join(token_words)]

    with open('E:\\CSE573-SWM-StockPrediction-main\\Code\\inputTesting\\trained-one-gram-vectorizer.pkl', 'rb') as f:
        trained_one_gram_vectorizer = pickle.load(f)

    test_tf_idf_vector = trained_one_gram_vectorizer.transform(preprocessed_input)
    #print("final test vector shape:",test_tf_idf_vector.shape)
    if(model == "LogisticRegression"):
        #testing input document on Logistic Regression
        with open('E:\\CSE573-SWM-StockPrediction-main\\Code\\inputTesting\\logistic_regression-pca-one-gram-one-day-mixed-data-model.pkl', 'rb') as f:
            logistic_regression_one_gram_one_day_classifier = pickle.load(f)
            
        y_pred=logistic_regression_one_gram_one_day_classifier.predict(test_tf_idf_vector)

        label = y_pred[0]
        if 1 == label:
            return "1"
        elif -1 == label:
            return "0"

    elif(model == "RandomForest"):
        #testing input document on Random Forest
        with open('E:\\CSE573-SWM-StockPrediction-main\\Code\\inputTesting\\random-forest-pca-one-gram-one-day-mixed-data-model-001.pkl', 'rb') as f:
            random_forest_one_gram_one_day_classifier = pickle.load(f)
            
        y_pred=random_forest_one_gram_one_day_classifier.predict(test_tf_idf_vector)

        label = y_pred[0]
        if 1 == label:
            return "1"
        elif -1 == label:
            return "0"

    else:
        #testing input document on SVM
        with open('E:\\CSE573-SWM-StockPrediction-main\\Code\\inputTesting\\svm-pca-one-gram-one-day-mixed-data-model.pkl', 'rb') as f:
            svm_one_gram_one_day_classifier = pickle.load(f)
            
        y_pred=svm_one_gram_one_day_classifier.predict(test_tf_idf_vector)

        label = y_pred[0]
        if 1 == label:
            return "1"
        elif -1 == label:
            return "0"