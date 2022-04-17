from flask import Flask
from flask import request
from Code.inputTesting import predict
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/predictStockPrice', methods=['GET','POST'])
def predictStockPrice():
    data = "dummyValue"
    modelName = "LogisticRegression"
    try:
        data = request.form.get("news")
        modelName = request.form.get("model")
    except:
        pass
    print("data: {}".format(data))
    print("modelName: {}".format(modelName))
    return predict.predictStockPrice(data, modelName)
    



@app.route("/")
def helloWorld():
  return "Hello, cross-origin-world!"

if __name__ == '__main__':
    app.run()