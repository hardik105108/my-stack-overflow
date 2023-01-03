import mongoose from "mongoose"
import Questions from "../models/Questions.js"

export const postAnswer = async (req, res) => {
    const { id: _id } = req.params;
    const { onOfAnswers, answerBody, userAnswered, userId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("questions unavailable...")
    }
    updateNoOfQuestions(_id, onOfAnswers)
    try {
        const updatedQuestion = await Questions.findByIdAndUpdate(_id, { $addToSet: { 'answer': [{ answerBody, userAnswered, userId }] } })
        res.status(200).json(updatedQuestion)
    } catch (error) {
        console.log(error)
        res.status(404).json(error)
    }
}

const updateNoOfQuestions = async (_id, onOfAnswers) => {
    try {
        await Questions.findByIdAndUpdate(_id, { $set: { 'onOfAnswers': onOfAnswers } })
    } catch (error) {
        console.log(error)
    }
}
export const deleteAnswer = async (req, res) => {
    const { id: _id } = req.params;
    const { answerId, onOfAnswers } = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("questions unavailable...")
    }
    if (!mongoose.Types.ObjectId.isValid(answerId)) {
        return res.status(404).send("answer unavailable...")
    }
    updateNoOfQuestions(_id, onOfAnswers)
    try {
        await Questions.updateOne({ _id }, { $pull: { 'answer': { _id: answerId } } })
        res.status(200).json({ message: "successfully deleted" })
    } catch (error) {
        res.status(404).json(error)
    }
}