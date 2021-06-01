const router = require('express').Router();
const { UserModel } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UniqueConstraintError } = require("sequelize");
const User = require("../models/user");


router.post("/register", async (req,res) => {

    const { username, passwordhash } = req.body.user;

    try {const newUser = await UserModel.create({
        username,
        passwordhash: bcrypt.hashSync(passwordhash, 12)
    })
            const token = jwt.sign(
              {id: newUser.id,},
              process.env.JWT_SECRET,
              {expiresIn: 60 * 60 * 24 * 7}  
            )
     res.status(201).json({
         msg: 'User Registered',
         user: newUser,
         token
     })

    } catch (error){
        if(error instanceof UniqueConstraintError) {
            res.status(409).json({
                msg: "email already in use, try again"
            });
        } else {
            res.status(500).json({
                error: `Failed to register user: ${error}`
            })
        }
    }

}),

router.post('/login', async(req, res) => {
    let { username, passwordhash } = req.body.user;

    try {
        let loginUser = await User.findOne({
            where: { username: username,},
        })

        if(loginUser) {

            let passwordComparison = await bcrypt.compare   
            (passwordhash, loginUser.passwordhash);

            if (passwordComparison) {

                let token = jwt.sign(

                    {id: loginUser.id},
                        process.env.JWT_SECRET,
                        {expireIn: 60 * 60 * 24 * 7}
                );

                res.status(200).json({
                    user: loginUser,
                    msg: "User successfully logged in!",
                    token
                });
            } else {

                res.status(401).json({
                    msg: "Incorrect username or password"
                })
            }

        } else {

            res.status(401).json({
                msg: "Incorrect username or password"
            })
        }
    } catch (err) {
        res.status(500).json({
            msg: "Error logging in!"
        })
    }
});

module.exports = router;