const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const convertBtn = document.getElementById("convert-btn");
const amountInput = document.getElementById("amount");
const resultDiv = document.getElementById("result");

const apiKey = "405564ad94d2bb79124d2a1c"; // Get from exchangerate-api.com
const apiURL = "https://v6.exchangerate-api.com/v6/405564ad94d2bb79124d2a1c/latest/";

// Populate currency dropdowns
const currencies = ["USD", "EUR", "GBP", "INR", "JPY", "AUD", "CAD", "CNY"];
currencies.forEach((currency) => {
    const option1 = new Option(currency, currency);
    const option2 = new Option(currency, currency);
    fromCurrency.appendChild(option1);
    toCurrency.appendChild(option2);
});
fromCurrency.value = "USD";
toCurrency.value = "INR";

// Convert button click
convertBtn.addEventListener("click", () => {
    const amount = parseFloat(amountInput.value);
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (isNaN(amount)) {
        resultDiv.textContent = "Please enter a valid amount.";
        return;
    }

    fetch(apiURL + from)
        .then((res) => res.json())
        .then((data) => {
            const rate = data.conversion_rates[to];
            const converted = (amount * rate).toFixed(2);
            resultDiv.textContent = `${amount} ${from} = ${converted} ${to}`;
        })
        .catch(() => {
            resultDiv.textContent = "Error fetching exchange rate.";
        });
});