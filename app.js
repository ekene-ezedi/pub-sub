//requires modules
const express = require('express');

const app = express();

//built in middleware for parsing json payload
app.use(express.json())

const PORT = process.env.PORT || 8000;

const topic1Subscribers = [];

//subscription route
app.post('/subscribe/topic1',(req,res)=>{
    const url = req.body.url;
    console.log('Subscribing url to topic1 ................')
    topic1Subscribers.push(url);
    const message = 'Subscription successfull';
    res.redirect(`/event/?message=${message}`)
});

//publishing route
app.post('/publish/topic1',(req,res)=>{
    //forwasr data and topic to all subscribed urls [http://localhost:8000/event] of topic1
    res.redirect(`/event/?message=${req.body.message}&topic=topic1`)
})

app.get('/event', (req,res)=>{
    console.log(req.query);
    res.status(200).send(req.query);
})

app.listen(PORT,()=>{console.log(`app running on port ${PORT}`)})