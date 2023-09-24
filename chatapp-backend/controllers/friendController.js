
const Friend = require('../models/Friends');

const getFriends = async (req,res,next) => {
    try{
        let uid = req.params.user;
        const data = await Friend.findOne({user: uid}).exec();

        res.status(200).json(data.friends);
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            error: 'Failed to fetch friends',
        });
    }
}

const removeFriend = async (req,res,next) => {
    try {
        const user = req.body.user;
        const toRemove = req.body.toRemove;
        console.log(user,toRemove);

        if(!user || !toRemove){
            res.status(426).json({
                error: 'Wrong Input',
            });
            return;
        }

        await Friend.findOneAndUpdate({user: user}, {
            $pull: { "friends": toRemove}
        });

        await Friend.findOneAndUpdate({user: toRemove}, {
            $pull: { "friends": user}
        });

        res.status(200).json({
            friendRemoved: toRemove,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Failed to remove friend'
        })
    }
}

module.exports = {
    getFriends, removeFriend,
}