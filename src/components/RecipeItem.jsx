import React, { useContext, useState } from 'react';
import RecipeContext from '../context/RecipeContext';
const AddRecipe = () => {
  const context = useContext(RecipeContext);
  const { addRecipe } = context;
  const [recipe, setRecipe] = useState({ title: "", description: "", tag: "" });
  const handleClick = (e) => {
    e.preventDefault();
    addRecipe(recipe.title, recipe.description, recipe.tag);
    setRecipe({ title: "", description: "", tag: "" });
  }
  const onChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  }
  return (
    <div className='container my-3'>

      <h1>Add a recipe</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">title</label>
          <input type="text" className="form-control" onChange={onChange} value={recipe.title} id="title" name='title' minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" onChange={onChange} value={recipe.description} id="description" name='description' minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" onChange={onChange} value={recipe.tag} id="tag" name='tag' minLength={5} required />
        </div>
        <button disabled={recipe.title.length < 5 || recipe.description.length < 5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
      </form>

    </div>
  )
}

export default AddRecipe