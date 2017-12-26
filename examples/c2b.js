var mpesa = require('mpesa');

/**
 * Set the request options
 */
const request_options={
    "ShortCode":" ",
    "CommandID":"CustomerPayBillOnline",
    "Amount":" ",
    "Msisdn":" ",
    "BillRefNumber":" "
};

/**
 * Call the api and pass the options as the first parameter
 */
mpesa.c2b(request_options,function(data){

    console.log(data);
})