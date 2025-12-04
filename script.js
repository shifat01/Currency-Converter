const fromDropDown = document.getElementById("from-currency-select");
const toDropDown = document.getElementById("to-currency-select");
const result = document.getElementById("result");

let API_KEY = "cur_live_Z8DyNFWsfY3VFAknqlVpcWTZIwlZViRZ1rRT8bls";


currencies.forEach((currency) => {
  fromDropDown.innerHTML += `<option value="${currency}">${currency}</option>`;
  toDropDown.innerHTML += `<option value="${currency}">${currency}</option>`;
});


fromDropDown.value = "USD";
toDropDown.value = "BDT";

let convertCurrency = () => {
  const amount = document.querySelector("#amount").value;
  const fromCurrency = fromDropDown.value;
  const toCurrency = toDropDown.value;

  if (amount.length === 0) {
    alert("Please enter amount");
    return;
  }

  const apiUrl = `https://api.currencyapi.com/v3/latest?apikey=${API_KEY}&base_currency=${fromCurrency}`;

  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {

      if (!data.data[toCurrency]) {
        result.innerHTML = "Conversion not available for this currency.";
        return;
      }

      let rate = data.data[toCurrency].value;

      let converted = amount * rate;

      result.innerHTML =
        `${amount} ${fromCurrency} = ${converted.toFixed(2)} ${toCurrency}`;
    })
    .catch(() => {
      result.innerHTML = "Error fetching data.";
    });
};

document.getElementById("convert-button").addEventListener("click", convertCurrency);
