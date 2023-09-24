const Chat = require('../models/Chat');

const sendMessage = (req,res,next) => {
    const sender = req.body.sender;
    const receiver = req.body.receiver;
    const payload = req.body.payload;

    let message = {
        sender,
        payload,
        time: Date.now(),
    }

    Chat.findOneAndUpdate({
        $or: [
            { $and: [
                { user1: sender}, {user2: receiver }
            ]},
            { $and: [
                { user1: receiver}, {user2: sender}
            ]}
        ]
    }, {
        $push: { "messages": message}
    })
    .then(data => {
        if(!data){
            res.json({
                success: false,
                error: false,
            })
        }
        else
            res.json({
            success: true,
            error:false,
        });
    })
    .catch(err => {
        res.json({
            success: false,
            error: true,
        })
    })
}

const getMessages = (req,res,next) => {
    const id = req.params.id;

    Chat.findOne({ _id: id})
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        console.warn(err);
        res.json({
            error: err
        })
    })
}

module.exports = {
    sendMessage, getMessages
}