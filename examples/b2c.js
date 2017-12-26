var mpesa = require('mpesa');

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

      /**
       * Call the api and pass the options as the first parameter
       */
      mpesa.b2c(request_options,function(data){
      
          console.log(data);
      })