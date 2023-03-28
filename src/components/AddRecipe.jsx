import React, { useContext,useState } from 'react'
import { Box,Typography,Button } from '@mui/material'
import RecipeContext from '../context/RecipeContext'
const AddRecipe = () => {
  const context = useContext(RecipeContext);
  const { addRecipe } = context;
  const [recipe, setRecipe] = useState({ name: "", url: "", description: "" });
  const handleClick = (e) => {
    e.preventDefault();
    addRecipe(recipe.name, recipe.url, recipe.description);
    setRecipe({ name: "", url: "", description: "" });
  }
  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  }
  return (
    <Box>
      <Typography>Add a recipe</Typography>
      <Box>
        <Typography name>Name</Typography>
        <input onChange={handleChange}  type="text" name='name' />
      </Box>
      <Box>
      <Typography>url</Typography>
      <input onChange={handleChange} type="text" name='url' />
      </Box>
      <Box>
      <Typography>Description</Typography>
      <input onChange={handleChange} type="text" name='description' />
      </Box>
      <Button onClick={handleClick}>submit</Button>
    </Box>
  )
}

export default AddRecipe
