import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CurrencyConverter() {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get('https://api.frankfurter.app/currencies')
      .then((res) => {
        setCurrencies(Object.keys(res.data));
      });
  }, []);

  const handleConvert = () => {
    if (fromCurrency === toCurrency) {
      setConvertedAmount(amount);
      return;
    }

    setLoading(true);
    axios.get(`https://api.frankfurter.app/latest`, {
      params: {
        amount,
        from: fromCurrency,
        to: toCurrency
      }
    })
    .then((res) => {
      setConvertedAmount(res.data.rates[toCurrency]);
      setLoading(false);
    })
    .catch(() => {
      setConvertedAmount('Error');
      setLoading(false);
    });
  };

  return (
    <div className="converter-box">
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      /><br></br>
      <p>&nbsp;</p>

      <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
        {currencies.map((cur) => (
          <option key={cur} value={cur}>{cur}</option>
        
        ))}
        
      </select>

      <span>   to    </span>

      <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
        {currencies.map((cur) => (
          <option key={cur} value={cur}>{cur}</option>
          
        ))}<br></br>
      </select>
      
<br></br>
<p>&nbsp;</p>
      <button onClick={handleConvert}>Convert</button>

      {loading && <p>Converting...</p>}

      {convertedAmount && !loading && (
        <h3>{amount} {fromCurrency} = {convertedAmount} {toCurrency}</h3>
      )}
    </div>
  );
}

export default CurrencyConverter;
