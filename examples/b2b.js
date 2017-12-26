var mpesa = require('mpesa');

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
      
      /**
       * Call the api and pass the options as the first parameter
       */
      mpesa.b2b(request_options,function(data){
      
          console.log(data);
      })