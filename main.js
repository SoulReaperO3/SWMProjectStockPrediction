var mydata = [];
var color = "green";
const totalDuration = 1000;
  const delayBetweenPoints = totalDuration / 100;
  var previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
  var animation = {
    x: {
      type: 'number',
      easing: 'linear',
      duration: delayBetweenPoints,
      from: NaN, // the point is initially skipped
      delay(ctx) {
        if (ctx.type !== 'data' || ctx.xStarted) {
          return 0;
        }
        ctx.xStarted = true;
        return ctx.index * delayBetweenPoints;
      }
    },
    y: {
      type: 'number',
      easing: 'linear',
      duration: delayBetweenPoints,
      from: previousY,
      delay(ctx) {
        if (ctx.type !== 'data' || ctx.yStarted) {
          return 0;
        }
        ctx.yStarted = true;
        return ctx.index * delayBetweenPoints;
      }
    }
  };

  var myChart = new Chart(document.getElementById("myChart"), {
    type: 'line',
    data: {
      datasets: [{
        borderColor: color,
        borderWidth: 1,
        radius: 0,
        data: mydata,
      }]
    },
    options: {
      animation,
      interaction: {
        intersect: false
      },
      plugins: {
        legend: false
      },
      scales: {
        x: {
          type: 'linear'
        }
      }
    }
  });



function validateForm() {
    var news = "'" + document.getElementById("news").value + "'";
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
        if(this.response == "1"){
            $("#demo").html("Stock price goes UP! according to this model prediction");
            color = "green"
            let prev = 1000;
            mydata = []
            for (let i = 0; i < 100; i++) {
              prev += 5 - Math.random() * 8;
              mydata.push({x: i, y: prev});
            }
          ctx = null;
          previousY = null;
          previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
          animation = {
            x: {
              type: 'number',
              easing: 'linear',
              duration: delayBetweenPoints,
              from: NaN, // the point is initially skipped
              delay(ctx) {
                if (ctx.type !== 'data' || ctx.xStarted) {
                  return 0;
                }
                ctx.xStarted = true;
                return ctx.index * delayBetweenPoints;
              }
            },
            y: {
              type: 'number',
              easing: 'linear',
              duration: delayBetweenPoints,
              from: previousY,
              delay(ctx) {
                if (ctx.type !== 'data' || ctx.yStarted) {
                  return 0;
                }
                ctx.yStarted = true;
                return ctx.index * delayBetweenPoints;
              }
            }
          };
          myChart.destroy();
          myChart = new Chart(document.getElementById("myChart"), {
            type: 'line',
            data: {
              datasets: [{
                borderColor: color,
                borderWidth: 1,
                radius: 0,
                data: mydata,
              }]
            },
            options: {
              animation,
              interaction: {
                intersect: false
              },
              plugins: {
                legend: false
              },
              scales: {
                x: {
                  type: 'linear'
                }
              }
            }
          });
            
        }
        else{
            $("#demo").html("Stock price goes DOWN! according to this model prediction");
            color = "red"
            let prev = 10000;
            mydata = []
            for (let i = 0; i < 100; i++) {
              prev += 5 - Math.random() * 20;
              mydata.push({x: i, y: prev});
            }
            ctx = null;
            previousY = null;
          previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
          animation = {
            x: {
              type: 'number',
              easing: 'linear',
              duration: delayBetweenPoints,
              from: NaN, // the point is initially skipped
              delay(ctx) {
                if (ctx.type !== 'data' || ctx.xStarted) {
                  return 0;
                }
                ctx.xStarted = true;
                return ctx.index * delayBetweenPoints;
              }
            },
            y: {
              type: 'number',
              easing: 'linear',
              duration: delayBetweenPoints,
              from: previousY,
              delay(ctx) {
                if (ctx.type !== 'data' || ctx.yStarted) {
                  return 0;
                }
                ctx.yStarted = true;
                return ctx.index * delayBetweenPoints;
              }
            }
          };
          myChart.destroy();
          myChart = new Chart(document.getElementById("myChart"), {
            type: 'line',
            data: {
              datasets: [{
                borderColor: color,
                borderWidth: 1,
                radius: 0,
                data: mydata,
              }]
            },
            options: {
              animation,
              interaction: {
                intersect: false
              },
              plugins: {
                legend: false
              },
              scales: {
                x: {
                  type: 'linear'
                }
              }
            }
          });
            
        }
     };
     xhr.send(info);
     return false;
  }

  

    