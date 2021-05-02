const readline = require('readline-sync')
const stripe = require('stripe')('sk_test_51IlxoPCChrPzKjMCz6PSLDIG1dzMwnONwuh60XJU0iVgAraSbpM0LeG8Sskj064DHmXqxjFvPHse4pgSeMhEFTDu00CtdXwzp1');




const cardNumber = readline.question('Enter credit card number: ');
const expiryMonth = readline.question('Enter card expiry month: ');
const expiryYear = readline.question('Enter card expiry year: ');
const cvc = readline.question('Enter card CVC code: ');
const amount = readline.question('Enter Amount: ');
let tokenID, chargeID;
getpayment = async () => {
  try {
    const token = await stripe.tokens.create({
      card: {
        number: cardNumber,
        exp_month: expiryMonth,
        exp_year: expiryYear,
        cvc: cvc,
      },
    });
    tokenID = token.id;
  } catch (error) {
    console.log(error.raw.message)
    return;
  }

  try {

    const charge = await stripe.charges.create({
      amount: amount,
      currency: 'usd',
      source: tokenID,
      description: 'My First Test Charge (created for API docs)',
    });

    console.log("Your Token ID: ", tokenID);
    console.log("Your Charge ID: ", charge.id);


  } catch (error) {
    console.log(error.raw.message)
    return;
  }
}


getpayment();