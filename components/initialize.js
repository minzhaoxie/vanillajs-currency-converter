var currencyJSONData = null;
var rates = null;
var address = "http://api.fixer.io/latest";
var serverDown;

var xHttp = new XMLHttpRequest();
    xHttp.onreadystatechange = function () {
          // check the server status
          if (xHttp.readyState != 4 || xHttp.status != 200) {
            serverDown = true;
            return;
        } else {
            serverDown = false;
            setupCurrencyData(this.responseText);
        }
    }
    xHttp.open('GET', address, true);
    xHttp.send();


    //store fixer.io json data into local variable
function setupCurrencyData(currencyData) {
    if(currencyData) {
        try {
            currencyJSONData = JSON.parse(currencyData);
            rates = currencyJSONData.rates;
            var baseCurrency = currencyJSONData.base;
            //base currency is 1
            rates[baseCurrency] = 1;
        } catch(e) {
            console.log(e);
        }
    }
}