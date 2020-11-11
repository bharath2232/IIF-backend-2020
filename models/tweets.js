const mongoose  = require('mongoose');
const Schema = mongoose.Schema
const tweetsShema = new Schema ({
    tweetText : {
        type:String,
    },
    timeStamp: {
        type:String
    },
})
const Tweets = mongoose.model('tweets',tweetsShema);
module.exports = Tweets;
