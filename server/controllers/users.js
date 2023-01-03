import mongoose from "mongoose";
import user from '../models/auth.js'

export const getAllusers = async(req,res)=>{
    try {
        const allusers = await user.find();
        const alluserdetail = []
        allusers.forEach(users => {
            alluserdetail.push({_id:users._id,name:users.name,about:users.about,tags:users.tags,joinedOn:users.joinedOn})
        });
        res.status(200).json(alluserdetail);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}
export const updateProfile=async(req,res)=>{
    const {id:_id} =req.params;
    const {name,about, tags}= req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("questions unavailable...")
    }

    try {
        const updateProfile = await user.findByIdAndUpdate(_id,{ $set:{ 'name':name, 'about':about, 'tags':tags}}, { new: true })
        res.status(200).json(updateProfile)
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}