
// generate html dynamically
function getConverter(number){
    var html = '';
    for(var i=0; i<number; i++){
        html = html + `
        <table>
        <tr>
        <td>
        <h2>Currency Converter ${i+1}</h2>
        </td>
        </tr>
        <tr>
        <td>
        <p>Type in amount and select currency:</p>
        </td>
        </tr>
            <tr>
                <td>
                    <input id="fromAmount${i}" oninput="convert(${i})" type="number" />
                </td>
                <td>
                    <select onchange="convert(${i})" id="from${i}">
                        <option value="CAD" selected>CAD</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                    </select>
                </td>
            </tr>
        
            <tr>
            <td>
            <p>Converted amount:</p>
            </td>
            </tr>
            <tr>
                <td>
                    <input id="toAmount${i}" type="text"  disabled />
                </td>
                <td>
                    <select id="to${i}" onchange="convert(${i})">
                        <option value="CAD">CAD</option>
                        <option value="USD" selected>USD</option>
                        <option value="EUR">EUR</option>
                    </select>
                </td>
            </tr>
            <tr>
            <td align="right">
            <p><a href="#" onclick="showDisclaimer();">Disclaimer</a></p>
            </td>
            </tr>
        </table>
        `;
    }

    return html;
}


function convert(id) {
    var from = document.getElementById('from'+id).value;
    var to = document.getElementById('to'+id).value;
    var fromAmount = document.getElementById('fromAmount'+id);
    var toAmount = document.getElementById('toAmount'+id);
    var fromAmountValue = fromAmount.value;

    // when server is down, pops up error message
    if(serverDown){
        alert("Server is down, please try again later.");
        fromAmount.value = '';
        toAmount.value = '';
    }
    // when server works
    else
    {
    if(from == to){
        toAmount.value = fromAmount.value;
    }
    else if (fromAmountValue.length > 0) {
        toAmount.value = calculate(from, to, fromAmountValue).toFixed(2);
    }
}
}

function calculate(from, to, amount){
    console.log(from, to, rates[from], rates[to], amount);
    return amount*rates[to]/rates[from];
}

function showDisclaimer() {
    alert("Latest update: " + currencyJSONData.date + "\n" +
        "\nCreated by Max." +
        "\nAll rights reserved.");
}