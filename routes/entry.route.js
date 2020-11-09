const router = require('express').Router();
const Entry = require('../models/Entry');
const verify = require('./verifyToken');
const {entryFormValidation} = require('../validations/entry.validator');


router.post("/add",verify, async (req, res) => {
    
//     const {error} = entryFormValidation.validate(req.body);
//     if (error) return res.status(400).send(error.details[0].message);
    try{
        const entry = new Entry({
            type: req.body.type,
            company: req.body.company,
            coco: req.body.coco,
            site: req.body.site,
            person: req.body.person,
            department: req.body.department,
            cause: req.body.cause,
            carrier: req.body.carrier,
            referBy: req.body.referBy,
            quantity: req.body.quantity,
            amount: req.body.amount, 
            otherCost: req.body.otherCost,
            dena: req.body.dena,
            paona: req.body.paona,
            vara: req.body.vara,
            warning: req.body.warning,
            note: req.body.note,
            editedBy: req.body.editedBy,
            date: req.body.date,
            time: req.body.time
        });
        const saveEntryForm = await entry.save();
        res.send(saveEntryForm);
   }catch(err){
        console.log(err);
        res.status(400).send(err);
   }

});


router.get("/get",verify, async (req, res) => {
    try{
        const entryList = await Entry.find({});
        res.send(entryList);
   }catch(err){
        console.log(err);
        res.status(400).send(err);
   }
});

router.get("/getall",verify, async (req, res) => {
    try{
        const entryList = await Entry.find({});
        res.send(entryList);
   }catch(err){
        console.log(err);
        res.status(400).send(err);
   }
});



router.put("/update",verify, async (req, res) => {
    // const {error} = entryFormValidation.validate(req.body);
    // if (error) return res.status(400).send(error.details[0].message);
    try{
        const entryItem = await Entry.findByIdAndUpdate(
            {_id: req.body._id},req.body,{ useFindAndModify: false }
            );
        res.send(entryItem);
   }catch(err){
        console.log(err);
        res.status(400).send(err);
   }
});

// router.put("/update",verify, async (req, res) => {
//     const {error} = entryFormValidation.validate(req.body);
//     if (error) return res.status(400).send(error.details[0].message);
//     try{
//         const entryItem = await Entry.updateOne(
//             {_id: req.body._id},
//             {$set:{
//                     type: req.body.type,
//                     company: req.body.company,
//                     coco: req.body.coco,
//                     site: req.body.site,
//                     person: req.body.person,
//                     department: req.body.department,
//                     cause: req.body.cause,
//                     carrier: req.body.carrier,
//                     referBy: req.body.referBy,
//                     amount: req.body.amount, 
//                     otherCost: req.body.otherCost,
//                     total: req.body.total,
//                     dena: req.body.dena,
//                     paona: req.body.paona,
//                     vara: req.body.vara,
//                     warning: req.body.warning,
//                     note: req.body.note,
//                     editedBy: req.body.editedBy,
//                     date: req.body.date
//                 }
//             });
//         res.send(entryItem);
//    }catch(err){
//         console.log(err);
//         res.status(400).send(err);
//    }
// });


router.delete("/remove",verify, async (req, res) => {
    try{
        const entryItem = await Entry.remove({_id: req.body.id});
        res.send(entryItem);
   }catch(err){
        console.log(err);
        res.status(400).send(err);
   }
});



module.exports = router;