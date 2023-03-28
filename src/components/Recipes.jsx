import React, { useContext, useEffect, useRef,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import recipeContext from '../context/RecipeContext';
import AddRecipe from './AddRecipe';
import RecipeItem from './RecipeItem';
const Recipes = (props) => {
    const context = useContext(recipeContext);
  const { recipes, getRecipe,editRecipe} = context;
  const ref = useRef(null);
  const refClose = useRef(null);
  let history=useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token')){
      console.log(localStorage.getItem('token'))
    getRecipe();
    }
    else {
      console.log(localStorage.getItem('token'))
      history("/login");
    }
    // eslint-disable-next-line 
  }, [])
  const updateRecipe = (currRecipe) => {
    ref.current.click();
    setRecipe({id:currRecipe._id, ename:currRecipe.name,eurl:currRecipe.url,edescription:currRecipe.description});
    props.showAlert("Note Updated","successful");
  }
  const [recipe, setRecipe] = useState({id:"", ename: "", eurl: "", edescription: "" });
  const handleClick = (e) => {
    console.log("updating the note",recipe)
    editRecipe(recipe.id,recipe.ename,recipe.eurl,recipe.edescription);
    refClose.current.click();
  }
  const onChange=(e)=>{
    setRecipe({...recipe,[e.target.name]:e.target.value});
  }
  return (
    <div>
      <AddRecipe showAlert={props.showAlert}/>
      <button type="button" ref={ref} className="d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Recipe</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <form>
        <div className="mb-3">
          <label htmlFor="etitle" className="form-label">name</label>
          <input type="text" className="form-control" onChange={onChange} id="etitle" name='etitle' value={recipe.ename} minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="edescription" className="form-label">url</label>
          <input type="text" className="form-control" onChange={onChange} id="edescription" name='edescription' value={recipes.url}minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="etag" className="form-label">Description</label>
          <input type="text" className="form-control" onChange={onChange} id="etag" name='etag' value={recipe.edescription}/>
        </div>
      </form> 
            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" onClick={handleClick} className="btn btn-primary">Update Recipe</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Recipes</h2>
        <div className="container mx-24">
          {recipes.length===0&&'No notes to display'}
        </div>
        {recipes.map((recipe) => {
            console.log(recipes)
          return <RecipeItem recipe={recipe} updateRecipe={updateRecipe} key={recipe._id} />;
        })}
      </div>
    </div>
  )
}

export default Recipes
