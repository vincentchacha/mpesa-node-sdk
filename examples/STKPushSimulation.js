var mpesa = require('mpesa');

/**
 * Set the request options
 */
const request_options={
    "BusinessShortCode": " ",
    "Password": " ",
    "Timestamp": " ",
    "TransactionType": "CustomerPayBillOnline",
    "Amount": " ",
    "PartyA": " ",
    "PartyB": " ",
    "PhoneNumber": " ",
    "CallBackURL": "https://ip_address:port/callback",
    "AccountReference": " ",
    "TransactionDesc": " "
};

/**
 * Call the api and pass the options as the first parameter
 */
mpesa.STKPushSimulation(request_options,function(data){

    console.log(data);
})