const express = require("express");
const router = express.Router();
const verify = require('./verifyToken');
const Account = require('../models/Account');
const {accountFormValidation} = require('../validations/account.validator');

router.post("/add",verify,async (req, res) => {
    console.log("Test");
    const {error} = accountFormValidation.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    try{
        const account = new Account({
            full_name: req.body.full_name,
            id: req.body.id,
            nid: req.body.nid,
            blood_group: req.body.blood_group,
            father_name: req.body.father_name,
            mother_name: req.body.mother_name,
            parmanent_address: req.body.parmanent_address,
            present_address: req.body.present_address,
            opening_date: req.body.opening_date,
            closing_date: req.body.closing_date,
            note: req.body.note,
            created_by: req.body.created_by,
            date: req.body.date 
        });
        const saveAccountForm = await account.save();
        res.send(saveAccountForm);
   }catch(err){
        console.log(err);
        res.status(400).send(err);
   }
});

router.get("/get",verify, async (req, res) => {
    try{
        const accountList = await Account.find({});
        res.send(accountList);
   }catch(err){
        console.log(err);
        res.status(400).send(err);
   }
});

router.put("/update",verify, async (req, res) => {
    const {error} = accountFormValidation.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    try{
        const accountItem = await Account.updateOne(
            {_id: req.body._id},
            {$set:{
                    full_name: req.body.full_name,
                    id: req.body.id,
                    nid: req.body.nid,
                    blood_group: req.body.blood_group,
                    father_name: req.body.father_name,
                    mother_name: req.body.mother_name,
                    parmanent_address: req.body.parmanent_address,
                    present_address: req.body.present_address,
                    opening_date: req.body.opening_date,
                    closing_date: req.body.closing_date,
                    note: req.body.note,
                    created_by: req.body.created_by,
                    date: req.body.date 
                }
            });
        res.send(accountItem);
   }catch(err){
        console.log(err);
        res.status(400).send(err);
   }
});


router.delete("/remove",verify, async (req, res) => {
    try{
        const accountItem = await Account.remove({_id: req.body.id});
        res.send(accountItem);
   }catch(err){
        console.log(err);
        res.status(400).send(err);
   }
});


module.exports = router;