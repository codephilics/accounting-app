const router = require('express').Router();
const Credit = require('../models/Credit');
const verify = require('./verifyToken');
const {creditFormValidation} = require('../validations/credit.validation');


router.post("/add",verify, async (req, res) => {
    
    const {error} = creditFormValidation.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    try{
        const credit = new Credit({
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
            due: req.body.due,
            invest: req.body.invest,
            note: req.body.note,
            editedBy: req.body.editedBy,
            file_url: req.body.file_url,
            date: req.body.date
        });
        const saveCreditForm = await credit.save();
        res.send(saveCreditForm);
   }catch(err){
        console.log(err);
        res.status(400).send(err);
   }

});


router.get("/get",verify, async (req, res) => {
    try{
        const creditList = await Credit.find({});
        res.send(creditList);
   }catch(err){
        console.log(err);
        res.status(400).send(err);
   }
});


module.exports = router;