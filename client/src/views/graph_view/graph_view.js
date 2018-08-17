const PubSub = require('../../helpers/pub_sub.js');
const Highcharts = require('highcharts');
const GraphView = function (container) {
  this.container = container;
}

GraphView.prototype.bindEvents = function () {
  PubSub.subscribe('Graph:publish-graphdata', (evt) => {
    this.render(evt.detail);
  });
};

GraphView.prototype.render = function (graphdata) {
  this.container.innerHTML = '';
  const container = document.createElement('div');
  const listOfDates = [];
  const listOfPrices = [];
const priceData = graphdata["Time Series (Daily)"];
Object.keys(priceData).forEach(function(day) {
  // closingPriceData[day];
  // console.log(priceData[day]["4. close"]);
  //console.log(day);
  listOfDates.push(day);
  listOfPrices.push(parseFloat(priceData[day]["4. close"]));
})
console.log(listOfDates);
console.log(listOfPrices);



  console.log("graph rendering complete:", graphdata);
  var chart = new Highcharts.Chart(
    {
      chart: {
        type: 'line',
        renderTo: container
      },
      title: {
        text: "test"
      },
      series: listOfDates,
      xAxis: {
        categories: []
      },
      yAxis: [{
        title: {
          text: "Y axis"
        }
      }],
      series: [{
        type: 'line',
        data: listOfPrices,
        name: 'y axis data'
      }]
    }
  )
  this.container.appendChild(container);


  };



module.exports = GraphView;
