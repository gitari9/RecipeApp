import express from "express";
import enquiryModel from "../models/enquiryModel.js";

const router = express.Router();

router.post('/enquiry', async (req, res) => {
    console.log(req.body);
    const enquiry = new enquiryModel({
        email: req.body.email,
        message: req.body.message
    });
    const newEnquiry = await enquiry.save();
    console.log(newEnquiry);
    res.send({
        message: 'successfully added enquiry',
        data: newEnquiry 
    });

})

router.get ('/enquiry', async(req, res) => {
    // this endpoint fetches all the enqiuries
    const enquiries = await enquiryModel.find()
    res.send ({
        message: 'found all enquiries',
        data: enquiries
    })
})

router.delete('/enquiry/:id', async(req, res) => {
    await enquiryModel.deleteOne({_id: req.params.id})
    res.send({
        message: 'Successfully deleted enquiry'
    })
})

router.get('/enquiry/get/:id', async(req, res) => {
    const enquiry = await enquiryModel.findOne({_id: req.params.id})
    res.send({
        messgae: 'Successfully found enquiry',
        data: enquiry
    })
    
})

router.put('/enquiry/:id', async(req, res) => {
    const enquiry = await enquiryModel.findOne({_id: req.params.id})
    enquiry.email = req.body.email; 
    enquiry.message = req.body.message;
    const newEnquiry = await enquiry.save();
    res.send ({
        message: 'Successfully edited enqiury',
        data: newEnquiry
    })
});

export default router;