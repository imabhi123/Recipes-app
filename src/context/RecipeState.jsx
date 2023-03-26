import { useState } from 'react'
import RecipeContext from './RecipeContext'
const RecipeState=(props)=>{
  const host="http://localhost:5000"
    const recipesInitial=[]
      const [recipes,setRecipes]=useState(recipesInitial);
      //get All Recipes
      const getRecipe=async()=>{
        //API call
        const response=await fetch(`${host}/api/recipes/fetchallrecipes`,{
          method:'GET',
          headers:{
            'Content-Type':'Application/json',
            'auth-token':localStorage.getItem('token')
          }
        })
        const json=await response.json();
        setRecipes(json);
      }
      //Add a Recipe
      const addRecipe=async(title,description,tag)=>{
        const response=await fetch(`${host}/api/recipes/addrecipe`,{
          method:'POST',
          headers:{
            'Content-Type':'Application/json',
            'auth-token':localStorage.getItem('token')
          },
          body:JSON.stringify({title,description,tag})
        })
        const recipe=await response.json();
        setRecipes(recipes.concat(recipe));
      }
      //Delete a Recipe
      const deleteRecipe=async(id)=>{
        const response=await fetch(`${host}/api/recipes/deleterecipe/${id}`,{
          method:'DELETE',
          headers:{
            'Content-Type':'Application/json',
            'auth-token':localStorage.getItem('token')
          },
        })
        const newRecipe=recipes.filter((recipe)=>{
        return  recipe._id!==id;
        })
        setRecipes(newRecipe);
      }
      //edit recipe
      const editRecipe=async(id,title,description,tag)=>{
        const response=await fetch(`${host}/api/recipes//updaterecipe/${id}`,{
          method:'PUT',
          headers:{
            'Content-Type':'Application/json',
            'auth-token':localStorage.getItem('token')
          },
          body:JSON.stringify({title,description,tag})
        })
        let newRecipes=JSON.parse(JSON.stringify(recipes))
        for(let i=0;i<newRecipes.length;i++){
          const element=newRecipes[i];
          if(element._id===id){
            newRecipes[i].title=title;
            newRecipes[i].description=description;
            newRecipes[i].tag=tag;
            break;
          }
        }
        setRecipes(newRecipes)
      }
return(
    <RecipeContext.Provider value={{recipes,setRecipes,addRecipe,deleteRecipe,editRecipe,getRecipe}}>
        {props.children}
    </RecipeContext.Provider>
)
}
export default RecipeState;