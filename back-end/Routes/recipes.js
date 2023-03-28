const express = require('express');
const fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');
const Router = express.Router();
const Recipes = require('../models/Recipes');
//Route 1:fetch all recipes
Router.get('/fetchallrecipes', fetchuser, async (req, res) => {
    try {
        const recipes = await Recipes.find({ user: req.user.id });
        res.json(recipes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured");
    }
})
//Route 2:add a recipes
Router.post('/addrecipe', fetchuser, [
    body('name', 'enter a valid name').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 })], async (req, res) => {
        console.log(body,'--->')
        try {
            const { name, url, description } = req.body;
            //if there are errors,return bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const recipe = new Recipes({
                name, url, description, user: req.user.id
            })
            const saveRecipe = await recipe.save();
            res.json(saveRecipe);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("some error occured")
        }

    })

//Route 3 :update an existing recipe
Router.put('/updaterecipe/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    //creating a new recipe
    try {
        const newRecipe = {};
        if (title) { newRecipe.title = title };
        if (description) { newRecipe.description = description };
        if (tag) { newRecipe.tag = tag };
        //validating the recipe if it exists or not
        let recipe = await Recipes.findById(req.params.id);
        if (!recipe) return res.status(404).send("not found");
        if (recipe.user.toString() !== req.user.id) return res.status(401).send("Not allowed");
        recipe = await Recipes.findByIdAndUpdate(req.params.id, { $set: newRecipe }, { new: true });
        res.json({ recipe });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured")
    }
})

//Route 4:Delete an existing recipe
Router.delete('/deleterecipe/:id', fetchuser, async (req, res) => {
    try {
        //validating a recipe if it exists or not
        let recipe = await Recipes.findById(req.params.id);
        if (!recipe) return res.status(404).send("not found");
        recipe = await Recipes.findByIdAndDelete(req.params.id);
        res.json({ "success": "recipe has been deleted" });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured")
    }
})
module.exports = Router;