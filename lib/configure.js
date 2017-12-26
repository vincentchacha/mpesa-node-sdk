/* Copyright 2017 Vincent Chacha. */
"use strict";

var sdkVersion = exports.sdkVersion = require('../package').version;
/**
 * Urls to access when the mode is set to sandbox
 */
var sandbox_urls = exports.sandbox_urls = {
    'auth_url': "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
    'reversal':"https://sandbox.safaricom.co.ke/mpesa/reversal/v1/request",
    "b2c":"https://sandbox.safaricom.co.ke/mpesa/b2c/v1/paymentrequest",
    "b2b":"https://sandbox.safaricom.co.ke/mpesa/b2b/v1/paymentrequest",
    "c2b":"https://sandbox.safaricom.co.ke/mpesa/c2b/v1/simulate",
    "accountBalance":"https://sandbox.safaricom.co.ke/mpesa/accountbalance/v1/query",
    "STKPushSimulation":"https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
    "STKPushQuery":"https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query",
    "transactionStatus":"https://sandbox.safaricom.co.ke/mpesa/transactionstatus/v1/query"
};
/**
 * Urls to access when the mode is set to live. Production urls
 */
var live_urls = exports.live_urls = {
    'auth_url': "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
    'reversal':"https://api.safaricom.co.ke/mpesa/reversal/v1/request",
    "b2c":"https://api.safaricom.co.ke/mpesa/b2c/v1/paymentrequest",
    "b2b":"https://api.safaricom.co.ke/mpesa/b2b/v1/paymentrequest",
    "c2b":"https://api.safaricom.co.ke/mpesa/c2b/v1/simulate",
    "accountBalance":"https://api.safaricom.co.ke/mpesa/accountbalance/v1/query",
    "STKPushSimulation":"https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
    "STKPushQuery":"https://api.safaricom.co.ke/mpesa/stkpushquery/v1/query",
    "transactionStatus":"https://api.safaricom.co.ke/mpesa/transactionstatus/v1/query"
};