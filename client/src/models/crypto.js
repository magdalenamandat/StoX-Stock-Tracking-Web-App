const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');
const API_CRYPTO_KEY = require('../api_crypto_key.js');

const CryptoData = function (url) {
  this.url =`https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=BTC&market=USD&apikey=${API_CRYPTO_KEY}`;
  this.request = new Request(this.url);
};

CryptoData.prototype.bindEvents = function () {

  PubSub.subscribe('Crypto:request-data', (evt) => {
    this.url = `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=BTC&market=USD&apikey=${API_CRYPTO_KEY}`;
    const request = new Request(this.url);
  });

};

CryptoData.prototype.initialize = function () {
  const request = new Request(this.url);
  request.get().then((data) => {
    this.publishCryptoData(data);
  });
};


CryptoData.prototype.publishCryptoData = function (data) {
  PubSub.publish('Crypto:publish-data', data);
};



module.exports = CryptoData;
