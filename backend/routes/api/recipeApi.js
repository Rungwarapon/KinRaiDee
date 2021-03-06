const express = require("express");
const router = express.Router();
const Recipe = require("../../models/recipeModels");
const User = require("../../models/userModels");

router.post("/create", async (req, res, next) => {
  console.log(req.body);
  try {
    let data = new Recipe(req.body);
    await data.save(() => {
      res.status(200).json(data);
    });
  } catch (err) {
    res.status(500).send({ message: "Error!" });
    console.log(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    let data = [];
    let recipes = await Recipe.find().exec();
    for (const recipe of recipes) {
      const user = await User.findOne({ _id: recipe.userId }).exec();
      data.push({
        _id: recipe._id,
        recipeName: recipe.recipeName,
        directions: recipe.directions,
        ingredients: recipe.ingredients,
        date: recipe.date,
        picture: recipe.picture,
        status: recipe.status,
        userId: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        photo: user.photo,
      });
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send({ message: "Error!" });
  }
});

router.get("/:_id", async (req, res, next) => {
  let recipeId = req.params._id;
  try {
    let data = [];
    let recipe = await Recipe.findOne({ _id: recipeId }).exec();
    const user = await User.findOne({ _id: recipe.userId }).exec();
    data.push({
      _id: recipe._id,
      recipeName: recipe.recipeName,
      directions: recipe.directions,
      ingredients: recipe.ingredients,
      date: recipe.date,
      picture: recipe.picture,
      status: recipe.status,
      userId: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      photo: user.photo,
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send({ message: "Error!" });
  }
});

router.get("/users/:_id", async (req, res, next) => {
  let userId = req.params._id;
  try {
    let data = await Recipe.find({ userId: userId }).exec();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send({ message: "Error!" });
  }
});

router.put("/update/:_id", async (req, res, next) => {
  try {
    let data = await Recipe.findOneAndUpdate({ _id: req.params._id }, req.body);
    res.status(200).send({ message: "Edit Success!" });
  } catch (err) {
    res.status(500).send({ message: "Error!" });
  }
});

router.delete("/delete/:_id", async (req, res, next) => {
  try {
    let data = await Recipe.findOneAndDelete({ _id: req.params._id });

    res.status(200).send({ message: "successfully" });
  } catch (err) {
    return res.status(500).send({ message: "Error" });
  }
});

router.post("/search", async (req, res, next) => {
  let recipeName = [];
  try {
    let searchText = req.body.searchRecipe;
    let data = await Recipe.find().exec();
    let recipes = data.filter(
      (recipe) => recipe.recipeName.indexOf(searchText) !== -1
    );
    for (const recipe of recipes) {
      const user = await User.findOne({ _id: recipe.userId }).exec();
      recipeName.push({
        _id: recipe._id,
        recipeName: recipe.recipeName,
        directions: recipe.directions,
        ingredients: recipe.ingredients,
        date: recipe.date,
        picture: recipe.picture,
        status: recipe.status,
        userId: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        photo: user.photo,
      });
    }
    res.status(200).json(recipeName);
  } catch (err) {
    res.status(500).send({ message: "Error!" });
  }
});

router.post("/search/:vegetableName", async (req, res, next) => {
  let recipes;
  try {
    let vegetableName = req.params.vegetableName;
    switch (vegetableName) {
      case "Yanang":
        vegetableName = "??????????????????";
        break;
      case "Saranae":
        vegetableName = "????????????????????????";
        break;
      case "Plu":
        vegetableName = "?????????";
        break;
      case "Mint":
        vegetableName = "????????????";
        break;
      case "Manow":
        vegetableName = "???????????????";
        break;
      case "Makrut":
        vegetableName = "??????????????????";
        break;
      case "Lemon":
        vegetableName = "??????????????????";
      case "Krapao khaow":
        vegetableName = "???????????????????????????";
        break;
      case "Krapao dang":
        vegetableName = "???????????????????????????";
        break;
      case "Horapa":
        vegetableName = "??????????????????";
        break;
      case "Fahthalinejol":
        vegetableName = "?????????????????????????????????";
        break;
      case "Bai makrut":
        vegetableName = "????????????????????????";
    }
    let data = await Recipe.find().exec();
    recipes = data.filter(
      (recipe) => recipe.ingredients.indexOf(vegetableName) !== -1
    );
    if (vegetableName === "???????????????????????????" || vegetableName === "???????????????????????????") {
      recipes = [
        ...recipes,
        ...data.filter((recipe) => recipe.ingredients.indexOf("??????????????????") !== -1),
      ];
    }
    res.status(200).json(recipes);
  } catch (err) {
    res.status(500).send({ message: "Error!" });
  }
});

module.exports = router;
