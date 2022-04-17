# CSE573-SWM-StockPrediction
Download the Processed CSV and pickle files from: 
https://drive.google.com/drive/folders/1k_Bk6BR6muv_ENm2g7Mi5_T3MFV7RQ2u?usp=sharing

Note: Only pickle files are necessary. CSV files are only for reference.  (If you want to test with CSV files, please download the NEWS dataset from the link given in News folder readme)

Link for google collab which contains the code to obtain the tweets data related to stocks of AMZN and AAPL:
https://colab.research.google.com/drive/1Mf1OYaHD2H_MtKu7zEU_TkTOtrY5WvEV?usp=sharing

To run the testing UI and get the results please follow the following steps: (Tested on Windows PC) 

0. To use the trained models directly, please ensure that you have downloaded the trained models' pickle files as mentioned in './Code/input-testing/' folder readme.
1. Open the terminal from the directory containing index.html and run:  "python -m http.server 8080"
2. Now run the server.py file (This is the flask server to handle the Rest call from UI)
3. Open your browser and navigate to localhost:8080
4. This will open the UI of the application
5. Enter the news item inside the text box, select a model to predict and submit to get the result.
