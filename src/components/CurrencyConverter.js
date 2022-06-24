import ExchangeRate from "./ExchangeRate";
import { useState } from 'react'
import axios from 'axios'

function CurrencyConverter() {
    
    const currencies = ['BTC', 'ETH', 'USD', 'XRP', 'LTC', 'ADA']
    const [choosenPrimaryCurrency, setChoosenPrimaryCurrency] = useState('BTC');
    const [choosenSecondaryCurrency, setChoosenSecondaryCurrency] = useState('BTC');
    const [amount, setAmount] = useState(1);
    //const [exchangeRate, setExchangeRate] = useState(0)
    const [result, setResult] = useState(0)
    const [primaryCurrencyExchanged, setPrimaryCurrencyExchanged] = useState('BTC')
    const [secondaryCurrencyExchanged, setSecondaryCurrencyExchanged] = useState('BTC')

    const [exchangedData, setExchangedData] = useState({
        primaryCurrency: 'BTC',
        secondaryCurrency: 'BTC',
        exchangeRate: 0
    })

    console.log(amount)

    const convert = () => {
        
        const options = {
            method: 'GET',
            url: 'https://alpha-vantage.p.rapidapi.com/query',
            params: {from_currency: choosenPrimaryCurrency, function: 'CURRENCY_EXCHANGE_RATE', to_currency: choosenSecondaryCurrency},
            headers: {
              'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
              'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
            }
          };
          
          axios.request(options).then(function (response) {
              console.log(response.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"]);
              //setExchangeRate(response.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"])
              setResult(response.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"] * amount)
/*               setPrimaryCurrencyExchanged(choosenPrimaryCurrency)
              setSecondaryCurrencyExchanged(choosenSecondaryCurrency) */
              setExchangedData({
                primaryCurrency: choosenPrimaryCurrency,
                secondaryCurrency: choosenSecondaryCurrency,
                exchangeRate: response.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"]
              })
          }).catch(function (error) {
              console.error(error);
          });

    };
    
    
    return (
      <div className="currency-converter">
        <h2>Currency Converter</h2>

        <div className="input-box">
        <table>
            <tbody>
                <tr>
                    <td>Primary Currency:</td>
                    <td>
                        <input 
                            type="number"
                            name="currency-amount-1"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </td>
                    <td>
                        <select
                            value={choosenPrimaryCurrency}
                            name="currency-option-1"
                            className="currency-options"
                            onChange={(e) => setChoosenPrimaryCurrency(e.target.value)}
                        >
                            {currencies.map((currency, _index) => (<option key={_index}>{currency}</option>))}
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>Secondary Currency:</td>
                    <td>
                        <input 
                            type="number"
                            name="currency-amount-2"
                            value={result}
                            disable="true"
                        />
                    </td>
                    <td>
                        <select
                            value={choosenSecondaryCurrency}
                            name="currency-option-2"
                            className="currency-options"
                            onChange={(e) => setChoosenSecondaryCurrency(e.target.value)} 
                        >
                            {currencies.map((currency, _index) => (<option key={_index}>{currency}</option>))}
                        </select>
                    </td>
                </tr>

            </tbody>
        </table>

        <button className="convert-button" onClick={convert}>Convert</button>
        </div>

        <ExchangeRate
          exchangedData={exchangedData}
        />
      </div>
    );
  }
  
  export default CurrencyConverter;