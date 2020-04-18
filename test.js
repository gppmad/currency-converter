var res_json_obj = {};

res_json_obj.currenciesList = [
    {
        "label": "EUR - Euro",
        "value": "EUR"
    },
    {
        "label": "JPY - Japanese Yen",
        "value": "JPY"
    },
    {
        "label": "BGN - Bulgarian Lev",
        "value": "BGN"
    },
    {
        "label": "USD - United States Dollar",
        "value": "USD"
    },
    {
        "label": "CZK - Czech Koruna",
        "value": "CZK"
    },
    {
        "label": "DKK - Danish Krone",
        "value": "DKK"
    },
    {
        "label": "GBP - British Pound Sterling",
        "value": "GBP"
    },
    {
        "label": "HUF - Hungarian Forint",
        "value": "HUF"
    },
    {
        "label": "PLN - Polish Zloty",
        "value": "PLN"
    },
    {
        "label": "RON - Romanian Leu",
        "value": "RON"
    },
    {
        "label": "SEK - Swedish Krona",
        "value": "SEK"
    },
    {
        "label": "CHF - Swiss Franc",
        "value": "CHF"
    },
    {
        "label": "ISK - Icelandic Króna",
        "value": "ISK"
    },
    {
        "label": "NOK - Norwegian Krone",
        "value": "NOK"
    },
    {
        "label": "HRK - Croatian Kuna",
        "value": "HRK"
    },
    {
        "label": "RUB - Russian Ruble",
        "value": "RUB"
    },
    {
        "label": "TRY - Turkish Lira",
        "value": "TRY"
    },
    {
        "label": "AUD - Australian Dollar",
        "value": "AUD"
    },
    {
        "label": "BRL - Brazilian Real",
        "value": "BRL"
    },
    {
        "label": "CAD - Canadian Dollar",
        "value": "CAD"
    },
    {
        "label": "CNY - Chinese Yuan Renminbi",
        "value": "CNY"
    },
    {
        "label": "HKD - Hong Kong Dollar",
        "value": "HKD"
    },
    {
        "label": "IDR - Indonesian Rupiah",
        "value": "IDR"
    },
    {
        "label": "ILS - Israeli New Sheqel",
        "value": "ILS"
    },
    {
        "label": "INR - Indian Rupee",
        "value": "INR"
    },
    {
        "label": "KRW - South Korean Won",
        "value": "KRW"
    },
    {
        "label": "MXN - Mexican Peso",
        "value": "MXN"
    },
    {
        "label": "MYR - Malaysian Ringgit",
        "value": "MYR"
    },
    {
        "label": "NZD - New Zealand Dollar",
        "value": "NZD"
    },
    {
        "label": "PHP - Philippine Peso",
        "value": "PHP"
    },
    {
        "label": "SGD - Singapore Dollar",
        "value": "SGD"
    },
    {
        "label": "THB - Thai Baht",
        "value": "THB"
    },
    {
        "label": "ZAR - South African Rand",
        "value": "ZAR"
    }
];


console.log(res_json_obj.currenciesList.length);

res_json_obj.currenciesList.forEach( (item, index) => {
    //console.log(item.label)
    //console.log(item.value)
    console.log("INSERT INTO public.currencies (\"label\", value) VALUES('"+item.label+"', '"+ item.value +"');");
})