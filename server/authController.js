const User = require('./models/User');
const bcrypt = require('bcrypt');
const {validationResult} =  require('express-validator');

class authController {
    async registration(req, res){
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({message: "Registration errors!", errors});
            }

            const {username, password, name} = req.body;
            const existUser = await User.findOne({username});
            if(existUser){
                return res.status(400).json({message: "User already exists!"});
            }
            const hashPassword = bcrypt.hashSync(password, 5);
            const date = Date.now();

            const user = new User({username, password: hashPassword, name, date: date, lastLogDate: date, blocked: false});

            await user.save();
            return res.json({message: "User is created!"});
        }catch(e){
            console.log(e);
            res.status(400).json({message: "Registration Error"})
        }
    }

    async login(req, res){
        try{
            const {username, password} = req.body;
            const user = await User.findOne({username});
            if(!user){
                return res.status(400).json({message:"User not found!"});
            }

            const validPass = bcrypt.compareSync(password, user.password);
            
            if(!validPass){
                return res.status(400).json({message:"Password isn't correct!"});
            }

            if(user.blocked){
                return res.status(400).json({message: "User is blocked"});
            }

            return res.json({user});

        }catch(e){
            console.log(e);
            res.status(400).json({message: "Login Error"})
        }
    }

    async getUsers(req, res){
        try{
            const users = await User.find();
            res.json(users);
        }catch(e){
            console.log(e);
        }
    }
}

module.exports = new authController;