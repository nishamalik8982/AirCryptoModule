
'use strict'

// require module
var AirCrypto = require ('./index.js');

// use the AirCrypto class inside the AirCrypto module
var aircrypto = new AirCrypto.AirCrypto("CFF7D059-5EFC-49B2-BD18-B937261943B5","b25c9ae6f91d4c9f948b67ec00113456");
var paymentID = "";

// Quantities to get from user
var amount = 234;
var primaryCurrency = "AUD";
var secondaryCurrency = "XRP"; // or "ETH", "BTC", "LTC", "BCH",  you choose
var userEmail = "user@gmail.com";

aircrypto.getQuote(amount, primaryCurrency, secondaryCurrency).then(function (res) {
  let quote = JSON.parse(res);
  console.log('QUOTE: %f %s == %d %s',amount.toFixed(2),primaryCurrency,quote.toFixed(2),secondaryCurrency);
});


// input: email, the currency in crypto (secondaryCurrency in this case), amount in AUD
aircrypto.createPayment(userEmail, secondaryCurrency, amount).then(function (res) {
  let payment = JSON.parse(res);
  paymentID = payment.Data.PaymentID;

  console.log('PAYMENT: status: %s, payment id: %s', payment.Status, paymentID);

  aircrypto.paymentStatus(paymentID).then(function (res) {
    let paymentStatus = JSON.parse(res);
    console.log('PAYMENT STATUS: %s,  %s', payment.Status, paymentStatus.Data.Status);
  });
});
