// imports
const express = require('express');
const path = require('path');

if(process.env.NODE_ENV !== 'production') require('dotenv').config();

//add stripe object
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// instatiate new express app
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// in production
// serve a file inside path
if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));

    // if user sends get request we eant to send static files - html, css, js
    app.get('*', function(req, res){
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

//listen on port
app.listen(port, error => {
    if(error) throw error;
    console.log('Server running on port ' + port);
})

// getting data from frontend on route /payment - charging and sending response
app.post('/payment', (req, res)=> {
    const body = {
        source: req.body.token.id,
        amount: req.body.amount,
        currency: 'usd'
    };

    stripe.charges.create(body, (stripeErr, stripeRes) => {
        if(stripeErr){
            res.status(500).send({error: stripeErr})
        }else{
            res.status(200).send({success: stripeRes})
        }
    });
})