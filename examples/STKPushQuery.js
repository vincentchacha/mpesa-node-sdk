var mpesa = require('mpesa-node-sdk');

/**
 * Set the request options
 */
const request_options={
    "BusinessShortCode": " " ,
    "Password": " ",
    "Timestamp": " ",
    "CheckoutRequestID": " "
};

/**
 * Call the api and pass the options as the first parameter
 */
mpesa.STKPushQuery(request_options,function(data){

    console.log(data);
})
