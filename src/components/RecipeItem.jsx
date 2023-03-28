import React, { useContext } from 'react'
import recipeContext from '../context/RecipeContext';
import { Box,Typography,styled } from '@mui/material';

const MainBox=styled(Box)`
height:30vh;
width:25vw;
`
const RecipeImage=styled('img')`
height:55vh;
width:60vh;
`

const RecipeItem = (props) => {
  const context=useContext(recipeContext)
  const {deleteRecipe}=context;
  const {editRecipe}=context;
    const {recipe,updateRecipe}=props;
    console.log(recipe,'--->')
  return (
    <MainBox>
        <Box>
        <Box>
            <Typography variant='h6' style={{fontWeight:'bold'}}>{recipe.name}</Typography>
            <RecipeImage src={recipe.url} alt="" />
            <Typography>{recipe.description}</Typography>
            <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteRecipe(recipe._id)}}></i>
            <i className="fa-solid fa-pen-to-square mx-2"onClick={()=>{updateRecipe(recipe)}}></i>
        </Box>
      </Box>
      </MainBox>
  )
}

export default RecipeItem
