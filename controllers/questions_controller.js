// DEPENDENCIES
const questions = require('express').Router();
const db = require('../models');
const { Question, Answer } = db ;
const { Op } = require('sequelize');
// const client = require('../server');

// FIND ALL QUESTIONS
questions.get('/', async (req, res) => {
        try {
        const foundQuestions = await Question.findAll({
            order: db.sequelize.random(),
            limit: 10,
            include: {
                model: Answer,
                as: "answers"
            }
        })

        res.status(200).json(foundQuestions)
    } catch (error) {
        res.status(500).json(error)
    }
})

// FIND A USER ANSWERS BY EMAIL
questions.get('/:email', async (req, res) => {
    try {
        const foundQuestion = await Question.findAll({
            where: { email: { [Op.like]: `%${req.query.email ? req.query.email : ''}%` } }
        })
        res.status(200).json(foundQuestion)
    } catch (error) {
        res.status(500).json(error)
    }
})


// CREATE A QUESTION
questions.post('/', async (req, res) => {
    try {
        const newQuestion = await Question.create(req.body)
        res.status(200).json({
            message: 'Successfully inserted a new question.',
            data: newQuestion
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// UPDATE A QUESTION
questions.put('/:id', async (req, res) => {
    try {
        const updatedQuestion = await Question.update(req.body, {
            where: {
                question_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated question.`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// DELETE A QUESTION
questions.delete('/:id', async (req, res) => {
    try {
        const deletedQuestions = await Question.destroy({
            where: {
                question_id: req.params.id
            }
        })
        // res.status(200).redirect('http://localhost:3000/questions')
        res.status(200).json()
    } catch(err) {
        res.status(500).json(err)
    }
})

// EXPORT
module.exports = questions;