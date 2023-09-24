const Request = require('../models/Request');
const Friend = require('../models/Friends');

const sendRequest = (req,res,next) => {
    const currUser = req.body.currUser;
    const secondUser = req.body.secondUser;

    Request.findOneAndUpdate({user: secondUser}, {
        $push: { "requests": currUser}
    })
    .then(success => {
        res.json({
            requestSent: true,
            error: false,
        });
    })
    .catch(error => {
        res.json({
            requestSent: false,
            error: 'Failed to send request',
        });
    });
}

const getRequests = async (req,res,next) => {
    try{
        const user = req.params.user;
        const result = await Request.findOne({user: user}).exec();

        if(!result){
            res.status(226).json({
                error: 'Not found'
            });
            return;
        }
        
        res.status(200).json(result.requests);
    }catch(err){
        console.log(err);
        res.status(500).json({
            error: 'Failed to get requests',
            errData: err,
        })
    }
}

const acceptRequest = async (req,res,next) => {
    try{
        const currUser = req.body.currUser;
        const secondUser = req.body.secondUser;

        if(!secondUser || !currUser) {
            res.status(422).json({
                error: 'Wrong input',
            });
            return;
        }
        
        const removeRequest = await Request.findOneAndUpdate({user: currUser}, {
            $pull: {"requests": secondUser}
        });


        const res1 = await Friend.findOneAndUpdate({user: currUser},{
            $push : {"friends": secondUser}
        });

        const res2 = await Friend.findOneAndUpdate({user: secondUser}, {
            $push: {"friends": currUser}
        });

        res.status(200).json({
            friendAdded: secondUser,
        });
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            error: 'Failed to add friend'
        });
    }
}

module.exports = {
    getRequests, sendRequest, acceptRequest
}