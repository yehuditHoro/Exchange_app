import React, { useState, useEffect } from 'react';

const CurrencyRates = () => {
  const [rates, setRates] = useState({});
  const [currencies, setCurrencies] = useState([]);
  const [currentCurrency, setCurrentCurrency] = useState('');

  useEffect(() => {
    const loadCurrencies = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/available-currencies');
        if (!res.ok) {
          throw new Error('Unable to fetch the list of available currencies');
        }
        const data = await res.json();
        setCurrencies(data.currencies || []);
      } catch (error) {
        console.error('Failed to load available currencies:', error);
      }
    };

    loadCurrencies();
  }, []);

  const loadRates = async (currency) => {
    try {
      const res = await fetch(`http://localhost:8000/api/exchange-rates/${currency}`);
      if (!res.ok) {
        throw new Error('Unable to fetch exchange rates');
      }
      const data = await res.json();
      setRates(data);
    } catch (error) {
      console.error('Failed to load exchange rates:', error);
    }
  };

  const handleCurrencySelection = (e) => {
    const selectedCurrency = e.target.value;
    setCurrentCurrency(selectedCurrency);
    loadRates(selectedCurrency);
  };

  return (
    <div>
      <h1>Currency Exchange Rates</h1>
      <select value={currentCurrency} onChange={handleCurrencySelection}>
        <option value="">Select a Currency</option>
        {currencies.map(currency => (
          <option key={currency} value={currency}>{currency}</option>
        ))}
      </select>
      <table>
        <thead>
          <tr>
            <th>Base</th>
            <th>Target</th>
            <th>Rate</th>
          </tr>
        </thead>
        <tbody>
          {rates.rates && Object.keys(rates.rates).map((targetCurrency) => (
            <tr key={targetCurrency}>
              <td>{rates.base_currency}</td>
              <td>{targetCurrency}</td>
              <td>{rates.rates[targetCurrency]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CurrencyRates;
