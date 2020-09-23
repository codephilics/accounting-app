const router = require('express').Router();
const User = require('../models/User');
const {registerValidation,loginValidation} = require('../validations/auth.validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verify = require('./verifyToken');

router.post('/register', async (req,res) => {
     
     const {error} = registerValidation.validate(req.body);
     if (error) return res.status(400).send(error.details[0].message);

     const usernameExist = await User.findOne({username: req.body.username});
     if(usernameExist) return res.status(400).send('username already exits');

     const salt = await bcrypt.genSalt(10);
     const hashPassword = await bcrypt.hash(req.body.password, salt);

     try{
          const user = new User({
               username: req.body.username,
               email: req.body.email,
               password: hashPassword,
          });
          const saveUser = await user.save();
          res.send(saveUser);
     }catch(err){
          console.log(err);
          res.status(400).send(err);
     }
});

router.post('/login', async (req,res) => {
     const {error} = loginValidation.validate(req.body);
     if(error) return res.status(400).send(error.details[0].message);

     const user = await User.findOne({username: req.body.username});
     if(!user) return res.status(400).send('Username is not found')

     const validePass = await bcrypt.compare(req.body.password, user.password);
     if(!validePass) return res.status(400).send('Password is wrong')

     const token = jwt.sign(
          {
            id: user._id,
            username: user.username,
          },
          process.env.TOKEN_SECRET
        );
     res.header('authorization',token).send(token);
});


router.post('/info', verify, (req,res) => {
      res.send(req.user);
});

module.exports = router;