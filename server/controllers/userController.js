const User = require('../models/User');


class userController {
    async userBlock(req, res){
        try{
            const {_id} = req.body;
            const updatedUser = await User.findByIdAndUpdate(_id, {blocked: "Blocked"}, {new: true});
            console.log(updatedUser);
            res.json({message:'User updated!'})
        }catch(e){
            console.log(e);
        }
    }

    async userDelete(req, res){
        try{
            const {_id} = req.body;
            await User.findByIdAndDelete(_id);
            res.json({message: "User deleted succesfully!"});
        }catch(e){
            console.log(e);
        }
    }

    async userUnblock(req, res){
        try{
            const {_id} = req.body;
            const updatedUser = await User.findByIdAndUpdate(_id, {blocked: "Active"}, {new: true});
            console.log(updatedUser);
            res.json({message:'User updated!'})
        }catch(e){
            console.log(e)
        }
    }
}

module.exports = new userController;