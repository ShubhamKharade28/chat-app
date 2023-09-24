const User = require('../models/User');
const Friend = require('../models/Friends');

const searchUsers = async (req,res,next) => {
    try{
        let searchInput = req.body.search;
        let currUser = req.body.user;

        const friendData = await Friend.findOne({user: currUser}).exec();
        const friends = friendData ? friendData.friends : [];

        const users =  await User.find({
            $and: [
                { username: { $regex: searchInput, $options: 'i' }},
                { username: {$nin: friends}},
                { username: {$ne: currUser}}
            ]
        });

        res.json({
            usersFound: true,
            users: users.map((user) => {
                return {
                    username: user.username,
                    name: user.name,
                    _id: user._id,
                }
            })
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            usersFound: false,
            error: 'Error fetching users',
        })
    }
}

const searchAll = (req,res,next) => {
    const searchInput = req.body.input;
    const currUser = req.body.currUser;
    console.log(searchInput, currUser);

    User.find({ username: {$regex: searchInput, $options: 'i'}})
    .then(users => {
        
        res.json({
            error: false,
            usersFound: true,
            users: users.filter((user) => user.username !== currUser),
        })
    })
    .catch(err => {
        res.json({
            error: true,
        })
    })
}

const searchOne = async (req,res,next) => {
    try {
        const username = req.params.username;
        if(username == ""){
            res.status(200).json({
                error: 'Wrong Input',
            });
            return;
        }
        const result = await User.findOne({ username: username}).exec();
        if(!result) {
            res.status(404).json({
                error: "User not found"
            });
            return;
        }
        
        res.json({
            name: result.name,
            username: result.username,
            email: result.email,
        });
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            error: 'Failed to fetch user-data',
        });
    }
}

module.exports = {
    searchUsers, searchAll,searchOne
}