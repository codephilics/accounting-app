const router = require('express').Router();
const Debit = require('../models/Debit');
const verify = require('./verifyToken');
const {debitFormValidation} = require('../validations/debit.validation');


router.post("/add",verify, async (req, res) => {
    
    const {error} = debitFormValidation.validate(req.body, { presence: 'required'});
    if (error) return res.status(400).send(error.details[0].message);
    
    try{
        const debit = new Debit({
            company: req.body.company,
            coco: req.body.coco,
            site: req.body.site,
            person: req.body.person,
            department: req.body.department,
            cause: req.body.cause,
            carrier: req.body.carrier,
            referBy: req.body.referBy,
            amount: req.body.amount, 
            otherCost: req.body.otherCost,
            total: req.body.total,
            dena: req.body.dena,
            paona: req.body.paona,
            vara: req.body.vara,
            warning: req.body.warning,
            note: req.body.note,
            editedBy: req.body.editedBy,
            image_url: req.body.image_url,
            date: req.body.date
        });
        const saveDebitForm = await debit.save();
        res.send(saveDebitForm);
   }catch(err){
        console.log(err);
        res.status(400).send(err);
   }

});


router.get("/get",verify, async (req, res) => {
    try{
        const debitList = await Debit.find({});
        res.send(debitList);
   }catch(err){
        console.log(err);
        res.status(400).send(err);
   }
});


module.exports = router;