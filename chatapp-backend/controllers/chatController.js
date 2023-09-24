const Chat = require('../models/Chat');

const createChat = async (req,res,next) => {
   
    try {
        const user1 = req.body.user1;
        const user2 = req.body.user2;

        if(!user1 || !user2){
            res.status(403).json({
                error: 'Wrong input',
            });
            return;
        }

        let chat = new Chat({
            user1,
            user2,
            messages: []
        });

        const result = await chat.save();
        
        res.json({
            chatInitiated: true,
            chatId: result._id,
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            error: 'Failed to initiate chat',
        })
    }
}

const getChat = (req,res,next) => {
    const user1 = req.body.user1;
    const user2 = req.body.user2;

    Chat.findOne({
        $or: [
            {
                $and: [{user1: user1}, {user2: user2}]
            },{
                $and: [{user1: user2}, {user2: user1}]
            }
        ]
    })
    .then(data => {
        if(!data){
            res.json({
                error: false,
                found:false,
            })
        }
        else if(data.messages.length == 0){
            res.json({
                error: false,
                found: true,
                empty: true,
                chatId: data._id,
            })
        }else{
            res.json({
                error: false,
                found: true,
                empty: false,
                messages: data.messages,
                chatId: data._id
            });
        } 
    })
    .catch(err => {
        res.json({
            error: true,
        });
    });
}

const deleteChat = (req,res,next) => {
    const id = req.body.id;

    Chat.deleteOne({_id: id})
    .then(success => {
        res.json({
            chatDeleted: true,
            error: false,
            result: success
        });
    })
    .catch(err => {
        res.json({
            error: true,
            chatDeleted: false,
        });
    });
}

const getAllChats = async (req,res,next) => {
    try {
        const user = req.params.user;
        if(user == ""){
            res.status(422).json({
                error: 'Wrong input',
            });
            return;
        }

        const result = await Chat.find({
            $or: [
                { user1: user},
                { user2: user}
            ]
        }).exec();

        const chats = [];
        result.forEach(element => {
            if(user1 == element.username){
                chats.push(user2);
            }else{
                chats.push(user1);
            }
        });

        res.json(chats);
    }catch(err){
        console.log(err);
        res.status(500).json({
            error: "Failed to get chats",
        });
    }
}

const getNewChats = async (req,res,next) => {
    try {
        let user = req.params.user;

        let friends = await fetch(`http://localhost:8080/friend/${user}`);
        friends = await friends.json();
        if(!friends){
            throw new Error('No friends');
        }

        let chats = await fetch(`http://localhost:8080/chat/${user}`);
        chats = await chats.json();

        const newChats = [];
        friends.forEach(friend => {
            if(!(chats.includes(friend))){
                newChats.push(friend);
            }
        });

        res.json(newChats);
    } catch (error) {
        console.log(error);
        res.status(404).json({
            error: 'Failed to get new friends',
        })
    }
}

module.exports = {
    createChat, getChat, deleteChat, getAllChats, getNewChats,
}