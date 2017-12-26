"use strict";
require('dotenv').config();
var configure = require('./configure');
var request = require('request-promise');


var self=module.exports={
/**
 * Authentication. This process involves generation of auth token by sending to auth url in mpesa
 *  api both client_id and the secret_id credentials for the auth token to be generated and returned
 * to the client.
 */
    generateMpesaToken:function(callback){
        var consumer_key = process.env.MPESA_KEY;
        var consumer_secret = process.env.MPESA_SECRET;
        var auth = "Basic " + new Buffer(consumer_key + ":" + consumer_secret).toString("base64");

        const options = {
            uri: '',
            port: 443,
            method: 'GET',
            headers : {
              "Authorization" : auth,
              'Content-Type': 'application/json'
            },
            json: true // Automatically parses the JSON string in the response
          };
        /** 
        *Check  the MPESA_MODE settings on .env file. Access the sandbox auth url if mode is set to 'sandbox'
        * and access the production url if set to 'live'
        */
          if(process.env.MPESA_MODE=='sandbox'){
            options.uri=configure.sandbox_urls.auth_url;
          }
          else if(process.env.MPESA_MODE=='live'){
            options.uri=configure.live_urls.auth_url;
          }
          return new Promise((resolve, reject)=>{
            request(options, (error, res, token)=>{
                if (error) {
                  reject(error);
                }
                else {
                  resolve(token);
                  callback(token);
                }
               });
           });
      },
       /**
     * Use this function to initiate a reversal request
     * @param $CommandID | Takes only 'TransactionReversal' Command id
     * @param $Initiator | The name of Initiator to initiating  the request
     * @param $SecurityCredential | 	Encrypted Credential of user getting transaction amount
     * @param $TransactionID | Organization Receiving the funds
     * @param $Amount | Amount
     * @param $ReceiverParty | Organization /MSISDN sending the transaction
     * @param $RecieverIdentifierType | Type of organization receiving the transaction
     * @param $ResultURL | The path that stores information of transaction
     * @param $QueueTimeOutURL | The path that stores information of time out transaction
     * @param $Remarks | Comments that are sent along with the transaction.
     * @param $Occasion | 	Optional Parameter
     * @return mixed|string
     */
    reversal:function(request_options,callback){

      var bodyString ={
              "Initiator": request_options.Initiator,
              "SecurityCredential":request_options.SecurityCredential,
              "CommandID":request_options.CommandID,
              "TransactionID": request_options.TransactionID,
              "Amount": request_options.Amount,
              "ReceiverParty":request_options.ReceiverParty,
              "RecieverIdentifierType":request_options.RecieverIdentifierType,
                "ResultURL": request_options.ResultURL,
                  "QueueTimeOutURL": request_options.QueueTimeOutURL,
              "Remarks": request_options.Remarks,
              "Occasion": request_options.Occasion
      };
            // request option
      var options = {
              uri: '',
              port: 443,
              method: 'POST',
              headers: {
                "Authorization":''
              },
              body:bodyString,
              json: true // Automatically stringifies the body to JSON
         };

         /**
          * Check .env file for mode configuration//sandbox/live
          */
         if(process.env.MPESA_MODE==='sandbox'){
            options.uri=configure.sandbox_urls.reversal;
          }else if(process.env.MPESA_MODE==='live'){
            options.uri=configure.live_urls.reversal;
          }
          /**
           * Get token and use it to make a request.
           */
          return self.generateMpesaToken(function(token){
             }).then(function(token) {
              var access_token=token.access_token;
              options.headers.Authorization="Bearer " +access_token;
              
              })
              .then(function() {
              return request(options).then(function (parsedBody) {
              callback(parsedBody)
               })
               }).catch(error => console.log(error));
        
    

    },
        /**
         * b2c transaction
         * initiate the transaction to make a transaction from business to customers
     * @param $InitiatorName | 	This is the credential/username used to authenticate the transaction request.
     * @param $SecurityCredential | Base64 encoded string of the B2C short code and password, which is encrypted using M-Pesa public key and validates the transaction on M-Pesa Core system.
     * @param $CommandID | Unique command for each transaction type e.g. SalaryPayment, BusinessPayment, PromotionPayment
     * @param $Amount | The amount being transacted
     * @param $PartyA | Organization’s shortcode initiating the transaction.
     * @param $PartyB | Phone number receiving the transaction
     * @param $Remarks | Comments that are sent along with the transaction.
     * @param $QueueTimeOutURL | The timeout end-point that receives a timeout response.
     * @param $ResultURL | The end-point that receives the response of the transaction
     * @param $Occasion | 	Optional
     * @return string
     */
    b2c:function(request_options,callback){

        var bodyString = {
          "InitiatorName": request_options.InitiatorName,
          "SecurityCredential":request_options.SecurityCredential,
          "CommandID": request_options.CommandID,
          "Amount": request_options.Amount,
          "PartyA": request_options.PartyA,
          "PartyB": request_options.PartyB,
          "Remarks": request_options.Remarks,
          "QueueTimeOutURL": request_options.QueueTimeOutURL,
          "ResultURL": request_options.ResultURL,
          "Occasion": " "
        }
    /**
     * Request Options
     */
          var options = {
            uri: '',
            port: 443,
            method: 'POST',
            headers: {
              "Authorization":''
            },
            body:bodyString,
            json: true // Automatically stringifies the body to JSON
          };


          if(process.env.MPESA_MODE==='sandbox')
          {
            options.uri=configure.sandbox_urls.b2c;
          }
          else if(process.env.MPESA_MODE==='live')
          {
            options.uri=configure.live_urls.b2c;
          }
          /**
           * Get the access token and use it to make request
           */
          return self.generateMpesaToken(function(token)
              {
              }).then(function(token)
              { 
                var access_token=token.access_token;
                options.headers.Authorization="Bearer " +access_token;
                
              })
              .then(function() 
              {
                return request(options).then(function (parsedBody)
                {
                  callback(parsedBody)
              })
              }).catch(error => console.log(error));



    },
        /**
     * Use this function to initiate a C2B transaction
     * @param $ShortCode | 6 digit M-Pesa Till Number or PayBill Number
     * @param $CommandID | Unique command for each transaction type.
     * @param $Amount | The amount been transacted.
     * @param $Msisdn | MSISDN (phone number) sending the transaction, start with country code without the plus(+) sign.
     * @param $BillRefNumber | 	Bill Reference Number (Optional).
     * @return mixed|string
     */
    c2b:function(request_options,callback){
      /**
       * Body parameters to send as request
       */
     var bodyString = {
        //Fill in the request parameters with valid values
        "ShortCode":request_options.ShortCode,
        "CommandID":request_options.CommandID,
        "Amount":request_options.Amount,
        "Msisdn":request_options.Msisdn,
        "BillRefNumber":request_options.BillRefNumber
        }
       /**
        * Request options
        */   
          var options = {
            uri: '',
            port: 443,
            method: 'POST',
            headers: {
              "Authorization":''
            },
            body:bodyString,
            json: true // Automatically stringifies the body to JSON
          };


          if(process.env.MPESA_MODE==='sandbox')
          {
            options.uri=configure.sandbox_urls.c2b;
          }
          else if(process.env.MPESA_MODE==='live')
          {
            options.uri=configure.live_urls.c2b;
          }
      
          /**
           * Get token and use it to make a request
           */
      return self.generateMpesaToken(function(token)
          {
            }).then(function(token) 
            { 
              var access_token=token.access_token;
              options.headers.Authorization="Bearer " +access_token;
              
            })
            .then(function() 
            {
              return request(options).then(function (parsedBody)
               {
                callback(parsedBody)
            })
            }).catch(error => console.log(error));

    },
        /**
     * Use this to initiate a balance inquiry request
     * @param $CommandID | A unique command passed to the M-Pesa system.
     * @param $Initiator | 	This is the credential/username used to authenticate the transaction request.
     * @param $SecurityCredential | Base64 encoded string of the M-Pesa short code and password, which is encrypted using M-Pesa public key and validates the transaction on M-Pesa Core system.
     * @param $PartyA | Type of organization receiving the transaction
     * @param $IdentifierType |Type of organization receiving the transaction
     * @param $Remarks | Comments that are sent along with the transaction.
     * @param $QueueTimeOutURL | The path that stores information of time out transaction
     * @param $ResultURL | 	The path that stores information of transaction
     * @return mixed|string
     */
    accountBalance:function(request_options,callback){
      /**
       * Body request parameters
       */
        var bodyString = {
          "Initiator":request_options.Initiator,
          "SecurityCredential":request_options.SecurityCredential,
          "CommandID":request_options.CommandID,
          "PartyA":request_options.PartyA,
          "IdentifierType":"4",
          "Remarks":request_options.Remarks,
          "QueueTimeOutURL":request_options.QueueTimeOutURL,
          "ResultURL":request_options.ResultURL
          }

        /**
         * Request options
         */      
        var options = {
          uri: '',
          port: 443,
          method: 'POST',
          headers: {
            "Authorization":''
          },
          body:bodyString,
          json: true // Automatically stringifies the body to JSON
        };


          if(process.env.MPESA_MODE==='sandbox')
          {
            options.uri=configure.sandbox_urls.accountBalance;
          }
          else if(process.env.MPESA_MODE==='live')
          {
            options.uri=configure.live_urls.accountBalance;
          }

          return self.generateMpesaToken(function(token){
                }).then(function(token)
                { 
                  var access_token=token.access_token;
                  options.headers.Authorization="Bearer " +access_token;
                  
                })
                .then(function()
                {
                  return request(options).then(function (parsedBody)
                  {
                    callback(parsedBody)
                })
                }).catch(error => console.log(error));



    },
        /**
     * Use this function to make a transaction status request
     * @param $Initiator | The name of Initiator to initiating the request.
     * @param $SecurityCredential | 	Base64 encoded string of the M-Pesa short code and password, which is encrypted using M-Pesa public key and validates the transaction on M-Pesa Core system.
     * @param $CommandID | Unique command for each transaction type, possible values are: TransactionStatusQuery.
     * @param $TransactionID | Organization Receiving the funds.
     * @param $PartyA | Organization/MSISDN sending the transaction
     * @param $IdentifierType | Type of organization receiving the transaction
     * @param $ResultURL | The path that stores information of transaction
     * @param $QueueTimeOutURL | The path that stores information of time out transaction
     * @param $Remarks | 	Comments that are sent along with the transaction
     * @param $Occasion | 	Optional Parameter
     * @return mixed|string
     */
    transactionStatus:function(request_options,callback){
      /**
       * Body request parameters
       */
        var bodyString ={
          "Initiator":request_options.Initiator,
          "SecurityCredential":request_options.SecurityCredential,
          "CommandID":request_options.CommandID,
          "TransactionID":request_options.TransactionID,
          "PartyA":request_options.PartyA,
          "IdentifierType":"1",
          "ResultURL":request_options.ResultURL,
          "QueueTimeOutURL":request_options.QueueTimeOutURL,
          "Remarks":request_options.Remarks,
          "Occasion":" "
        }
        /**
         * Request options
         */
            
        var options = {
          uri: '',
          port: 443,
          method: 'POST',
          headers: {
            "Authorization":''
          },
          body:bodyString,
          json: true // Automatically stringifies the body to JSON
         };


          if(process.env.MPESA_MODE==='sandbox')
          {
            options.uri=configure.sandbox_urls.transactionStatus;
          }
          else if(process.env.MPESA_MODE==='live')
          {
            options.uri=configure.live_urls.transactionStatus;
          }
          /**
           * Get access token and use it to make a post request
           */
          return self.generateMpesaToken(function(token)
                {
                }).then(function(token)
                 { 
                  var access_token=token.access_token;
                  options.headers.Authorization="Bearer " +access_token;
                 
                })
                .then(function()
                {
                  return request(options).then(function (parsedBody)
                  {
                    callback(parsedBody)
                })
                }).catch(error => console.log(error));


    },

        /**
     * Use this function to initiate a B2B request
     * @param $Initiator | This is the credential/username used to authenticate the transaction request.
     * @param $SecurityCredential | Base64 encoded string of the B2B short code and password, which is encrypted using M-Pesa public key and validates the transaction on M-Pesa Core system.
     * @param $Amount | Base64 encoded string of the B2B short code and password, which is encrypted using M-Pesa public key and validates the transaction on M-Pesa Core system.
     * @param $PartyA | Organization’s short code initiating the transaction.
     * @param $PartyB | Organization’s short code receiving the funds being transacted.
     * @param $Remarks | Comments that are sent along with the transaction.
     * @param $QueueTimeOutURL | The path that stores information of time out transactions.it should be properly validated to make sure that it contains the port, URI and domain name or publicly available IP.
     * @param $ResultURL | The path that receives results from M-Pesa it should be properly validated to make sure that it contains the port, URI and domain name or publicly available IP.
     * @param $AccountReference | Account Reference mandatory for “BusinessPaybill” CommandID.
     * @param $commandID | Unique command for each transaction type, possible values are: BusinessPayBill, MerchantToMerchantTransfer, MerchantTransferFromMerchantToWorking, MerchantServicesMMFAccountTransfer, AgencyFloatAdvance
     * @param $SenderIdentifierType | Type of organization sending the transaction.
     * @param $RecieverIdentifierType | Type of organization receiving the funds being transacted.

     * @return mixed|string
     */
    b2b:function(request_options,callback){
      /**
       * Request body parameters
       */
        var bodyString = {
          "Initiator": request_options.Initiator,
          "SecurityCredential": request_options.SecurityCredential,
          "CommandID":request_options.CommandID,
          "SenderIdentifierType": request_options.SenderIdentifierType,
          "RecieverIdentifierType": request_options.RecieverIdentifierType,
          "Amount": request_options.Amount,
          "PartyA": request_options.PartyA,
          "PartyB":request_options.PartyB,
          "AccountReference": request_options.AccountReference,
          "Remarks": request_options.Remarks,
          "QueueTimeOutURL": request_options.QueueTimeOutURL,
          "ResultURL": request_options.ResultURL
        }
           /**
            * Request options
            */ 
          var options = {
            uri: '',
            port: 443,
            method: 'POST',
            headers: {
              "Authorization":''
            },
            body:bodyString,
            json: true // Automatically stringifies the body to JSON
      };


          if(process.env.MPESA_MODE==='sandbox')
          {
            options.uri=configure.sandbox_urls.b2b;
          }
          else if(process.env.MPESA_MODE==='live')
          {
            options.uri=configure.live_urls.b2b;
          }

          return self.generateMpesaToken(function(token)
              {
              }).then(function(token)
              { 
                var access_token=token.access_token;
                options.headers.Authorization="Bearer " +access_token;
                
              })
              .then(function()
              {
                return request(options).then(function (parsedBody)
                {
                  callback(parsedBody)
              })
              }).catch(error => console.log(error));


    },
        /**
     * Use this function to initiate an STKPush Simulation
     * @param $BusinessShortCode | The organization shortcode used to receive the transaction.
     * @param $LipaNaMpesaPasskey | The password for encrypting the request. This is generated by base64 encoding BusinessShortcode, Passkey and Timestamp.
     * @param $TransactionType | The transaction type to be used for this request. Only CustomerPayBillOnline is supported.
     * @param $Amount | The amount to be transacted.
     * @param $PartyA | The MSISDN sending the funds.
     * @param $PartyB | The organization shortcode receiving the funds
     * @param $PhoneNumber | The MSISDN sending the funds.
     * @param $CallBackURL | The url to where responses from M-Pesa will be sent to.
     * @param $AccountReference | Used with M-Pesa PayBills.
     * @param $TransactionDesc | A description of the transaction.
     * @param $Remark | Remarks
     * @return mixed|string
     */
    STKPushSimulation:function(request_options,callback){
      /**
       * Body Request parameters
       */
        var bodyString= {
          "BusinessShortCode":request_options.BusinessShortCode,
          "Password": request_options.Password,
          "Timestamp": request_options.Timestamp,
          "TransactionType": request_options.TransactionType,
          "Amount":request_options.Amount,
          "PartyA": request_options.PartyA,
          "PartyB": request_options.PartyB,
          "PhoneNumber": request_options.PhoneNumber,
          "CallBackURL": request_options.CallBackURL,
          "AccountReference": request_options.AccountReference,
          "TransactionDesc": request_options.TransactionDesc
        }
          /**
           * Request options
           */
          var options = {
            uri: '',
            port: 443,
            method: 'POST',
            headers: {
              "Authorization":''
            },
            body:bodyString,
            json: true // Automatically stringifies the body to JSON
           };
  
  
              if(process.env.MPESA_MODE==='sandbox')
              {
                options.uri=configure.sandbox_urls.STKPushSimulation;
              }
              else if(process.env.MPESA_MODE==='live')
              {
                options.uri=configure.live_urls.STKPushSimulation;
              }
              /**
               * Get the access token and use it to make a request
               */
              return self.generateMpesaToken(function(token)
                   {
                    }).then(function(token)
                    { 
                      var access_token=token.access_token;
                      options.headers.Authorization="Bearer " +access_token;
                     
                    })
                    .then(function()
                    {
                      return request(options).then(function (parsedBody)
                      {
                        callback(parsedBody)
                    })
                    }).catch(error => console.log(error));
                    


    },
        /**
     * Use this function to initiate an STKPush Status Query request.
     * @param $checkoutRequestID | Checkout RequestID
     * @param $businessShortCode | Business Short Code
     * @param $password | Password
     * @param $timestamp | Timestamp
     * @return mixed|string
     */
    STKPushQuery:function(request_options,callback){
        /**
         * Request body parameters
         */
        var bodyString= {
          "BusinessShortCode":request_options.BusinessShortCode ,
          "Password": request_options.Password,
          "Timestamp": request_options.Timestamp,
          "CheckoutRequestID":request_options.CheckoutRequestID
          }
         /**
          * Request options
          */ 
          var options = {
            uri: '',
            port: 443,
            method: 'POST',
            headers: {
              "Authorization":''
            },
            body:bodyString,
            json: true // Automatically stringifies the body to JSON
         };
    
    
            if(process.env.MPESA_MODE==='sandbox')
            {
              options.uri=configure.sandbox_urls.STKPushQuery;
            }
            else if(process.env.MPESA_MODE==='live')
            {
              options.uri=configure.live_urls.STKPushQuery;
            }
          
            return self.generateMpesaToken(function(token)
                {
                  }).then(function(token)
                  { 
                    var access_token=token.access_token;
                    options.headers.Authorization="Bearer " +access_token;
      
                  })
                  .then(function()
                  {
                    return request(options).then(function (parsedBody)
                    {
                      callback(parsedBody)
                  })
                  }).catch(error => console.log(error));
      
    }
};