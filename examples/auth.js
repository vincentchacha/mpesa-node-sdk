var mpesa = require('mpesa');


/**
 * Generate token. The keys used to generate are in the .env file in the root folder.
 */
mpesa.generateMpesaToken(config,function(data) {
    console.log(data);
});

