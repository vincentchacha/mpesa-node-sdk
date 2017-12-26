# Mpesa Node Sdk

**Introduction**

This is a Mpesa sdk for node.js developers to help javascript developers integrate Mpesa payment system into their web apps easily. The package uses REST API that is documented on safaricom site. You can access it on http://developer.safaricom.co.ke.
 
## Installation

```sh
npm install mpesa-node-sdk
```

 
 
##Configuration
 At your project root, create a .env file and in it set the MPESA_KEY,MPESA_SECRET and MPESA_MODE (i.e live or sandbox) and put the keys you received when registering your application from the safaricom portal.<br>
You can Register for a developer account and get your client_id and secret at [Safaricom Developer Portal](http://developer.safaricom.co.ke). 
 `MPESA_KEY= [YOUR_API_CONSUMER_KEY]` <br>
 `MPESA_SECRET=[YOUR_API_CONSUMER_SECRET]`<br>
 `MPESA_MODE=[live or sandbox]`<br>

**Callback Responses**
NB_You should be able to register  validation and confirmation urls where the callback responses will be sent._

## Usage

  * Require 'mpesa-node-sdk' in your file.

    ```js
    var mpesa = require('mpesa-node-sdk');
    ```

    **B2C Payment Request**
 This is used to initiate the transaction  from business to customers

    ```js
    const request_options= {
        "InitiatorName": " ",
        "SecurityCredential":" ",
        "CommandID": " ",
        "Amount": " ",
        "PartyA": " ",
        "PartyB": " ",
        "Remarks": " ",
        "QueueTimeOutURL": "http://your_timeout_url",
        "ResultURL": "http://your_result_url",
        "Occasion": " "
      };

      mpesa.b2c(request_options,function(data){
          console.log(data);
      })
    ```
**Account Balance Request**
 
This is used to enquire the balance on an M-Pesa BuyGoods (Till Number)

    ```js
const request_options={
    "Initiator":" ",
    "SecurityCredential":" ",
    "CommandID":"AccountBalance",
    "PartyA":" ",
    "IdentifierType":"4",
    "Remarks":" ",
    "QueueTimeOutURL":"https://ip_address:port/timeout_url",
    "ResultURL":"https://ip_address:port/result_url"
};

mpesa.accountBalance(request_options,function(data){
    console.log(data);
})
    ```



**Transaction Status Request**
This is used to check the status of transaction. 

    ```js
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

mpesa.transactionStatus(request_options,function(data){
    console.log(data);
})
    ```


**B2B Payment Request**

This is used to transfer funds between two companies.

    ```js
const request_options= {
    "Initiator": " ",
    "SecurityCredential": " ",
    "CommandID": " ",
    "SenderIdentifierType": " ",
    "RecieverIdentifierType": " ",
    "Amount": " ",
    "PartyA": " ",
    "PartyB": " ",
    "AccountReference": " ",
    "Remarks": " ",
    "QueueTimeOutURL": "http://your_timeout_url",
    "ResultURL": "http://your_result_url"
  };
mpesa.b2b(request_options,function(data){
      
          console.log(data);
})
    ```





**C2B Payment Request**

This is used to Simulate transfer of funds between a customer and business.

    ```js
const request_options={
    "ShortCode":" ",
    "CommandID":"CustomerPayBillOnline",
    "Amount":" ",
    "Msisdn":" ",
    "BillRefNumber":" "
};

mpesa.c2b(request_options,function(data){
    console.log(data);
})
    ```

**Reversal**
 This is used to initiate a reversal request

    ```js
const request_options={
    "Initiator": "",
    "SecurityCredential": "",
    "CommandID":"TransactionReversal",
    "TransactionID": "",
    "Amount": "2000",
    "ReceiverParty": "",
    "RecieverIdentifierType":"4",
    "QueueTimeOutURL": "http://your_timeout_url",
    "ResultURL": "http://your_result_url",
    "Remarks": "wrong transaction",
    "Occasion": ""
};

mpesa.reversal(request_options,function(data){
    console.log(data);
})
    ```


**STK Push Simulation**

This is used to initiate online payment on behalf of a customer.

    ```js
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

mpesa.STKPushSimulation(request_options,function(data){
    console.log(data);
})
    ```


**STK Push Status Query**

 This is used to check the status of a Lipa Na M-Pesa Online Payment.
 
    ```js
const request_options={
    "BusinessShortCode": " " ,
    "Password": " ",
    "Timestamp": " ",
    "CheckoutRequestID": " "
};

mpesa.STKPushQuery(request_options,function(data){
    console.log(data);
})
    ```

## Reference
   [REST API Reference] (https://developer.safaricom.co.ke/docs)


## Running Examples
Examples are located in the [examples directory](/examples).




