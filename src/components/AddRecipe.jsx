import React, { useContext, useState } from "react";
import recipeContext from "../context/RecipeContext";
import {
  Box,
  styled,
  Button,
  FormControl,
  Typography,
  FormHelperText,
} from "@mui/material";
const MainButton = styled(Button)`
  background: #cb002b;
  margin-top: 6px;
  margin-left: 15rem;
  width:'10px';
`;
const DivCompo = styled(Box)`
  align-items: center;
`;
const RecipeImage = styled("img")`
  height: 40vh;
  display: block;
  width: 35vw;
`;
const FormMain = styled(FormControl)`
  height: 50vh;
  width: 100vw;
`;

const AddRecipe = () => {
  const context=useContext(recipeContext)
  const {addRecipe}=context;
  const [recipe, setRecipe] = useState({ title: "", description: "", tag: "" });
  const handleClick = (e) => {
    e.preventDefault();
    addRecipe(recipe.title, recipe.description, recipe.tag);
    setRecipe({ title: "", description: "", tag: "" });
  }
  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  }
  return (
    <Box>
      <Box>
        <FormMain>
          <Typography style={{marginBottom:'10px',fontWeight:'bold'}} variant="h5">Add your recipes</Typography>
          <Typography>Add url for your recipe image</Typography>
          <input onChange={handleChange} style={{width:'80vw'}} type="text" />
          <Typography>Add your recipe details in here</Typography>
          <textarea onChange={handleChange} style={{width:'80vw'}} name="" id="" cols="20" rows="20"></textarea>
          <MainButton onClick={handleClick} style={{width:'10px'}}>Submit</MainButton>
        </FormMain>
      </Box>
    </Box>
  );
};

export default AddRecipe;
