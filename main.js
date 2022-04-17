function validateForm() {
    var news = "'" + document.getElementById("news").value + "'";
    console.log(news)
    var models = document.getElementsByName('ml_models');
    var model = "";
    for(i = 0; i < models.length; i++) {
        if(models[i].checked){
            model = models[i].value;
        }
    }
    
     var info = new FormData();
     info.append('news', news);
     info.append('model', model);
    console.log
     var xhr = new XMLHttpRequest();
     xhr.open('POST', "http://127.0.0.1:5000/predictStockPrice");
     xhr.onload = function () {
        console.log((this.response))
        $("#demo").html(this.response);
     };
     xhr.send(info);
     return false;
     
  }