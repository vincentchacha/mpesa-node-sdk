var mpesa = require('mpesa');

/**
 * Set the request options
 */
const request_options={
    "Initiator":" ",
    "SecurityCredential":" ",
    "CommandID":"TransactionStatusQuery",
    "TransactionID":" ",
    "PartyA":" ",
    "IdentifierType":"1",
    "ResultURL":"https://ip_address:port/result_url",
    "QueueTimeOutURL":"https://ip_address:port/timeout_url",
    "Remarks":" ",
    "Occasion":" "
};

/**
 * Call the api and pass the options as the first parameter
 */
mpesa.transactionStatus(request_options,function(data){

    console.log(data);
})