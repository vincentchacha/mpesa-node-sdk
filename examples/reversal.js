var mpesa = require('mpesa');

/**
 * Set the request options
 */
const request_options={
    "Initiator": "testapi",
    "SecurityCredential": "Mzpva3FauW9/7lj6jsGytknr4a63Bsx2imcGP4D1Oq9/qhChHEMHcO2DBx8mA4ZDk7nd0y3ir8o8ClLM9YrVcBh305zSsKAHnRDzHsurvdT9e73Iy0gcAIbTnRSmLfZmXEk81PpJ9hbf6MTuoW0pj2wm0ieH9f8O8WP1PkXRbhSKZ7pXrjC91CRALcwA4HH/THCUHG/t84TZgNarzGZaK7cD8v9aWJwaR71Zp53118YByambKGFbX+Gdl6ayfdzQ/Yqp+57r6+TsaXH45GWWKS3X2r9WgpU8VkpfEFuARqkjtjMZDbeRyc7pxJ1g3RLmy3sCQxlL+Km2TA4KIj4K7Q==",
    "CommandID":"TransactionReversal",
    "TransactionID": "LC7918MI73",
    "Amount": "2000",
    "ReceiverParty": "254708374149",
    "RecieverIdentifierType":"4",
      "ResultURL": "https://ibuild.co.ke:443/result",
        "QueueTimeOutURL": "https://ibuild.co.ke:443/timeout",
    "Remarks": "wrong transaction",
    "Occasion": ""
};

/**
 * Call the api and pass the options as the first parameter
 */
mpesa.reversal(request_options,function(data){

    console.log(data);
})