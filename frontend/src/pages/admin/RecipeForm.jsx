import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
const RecipeForm = ({show, handleClose, formStatus, recipeData,setRecipeData, createRecipe, editRecipe}) => {
  
   
    const [ingredient, setIngredient] = useState ('')
    const [direction, setDirection] = useState ('')

    return (
        <>
        
         
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{formStatus === 'create' ? 'Create a recipe' : 'Update Recipe'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form onSubmit = {formStatus === 'create' ? createRecipe : editRecipe}>
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control type='text'
                        value={recipeData.title}
                        onChange={(e)=> setRecipeData({...recipeData, title: e.target.value})}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Image</Form.Label>
                    <Form.Control type='file'
                        // value={recipeData.image}
                        onChange={(e) => setRecipeData({...recipeData, image: e.target.files[0]})}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Ingredients</Form.Label>
                    <div style = {styles.flex}>
                        <Form.Control type='text'
                            value={ingredient}
                            onChange={(e) => setIngredient(e.target.value)}
                        />
                        <AddIcon onClick = {() => {
                            console.log('getting clicked')
                            setRecipeData({...recipeData, ingredients: [...recipeData.ingredients, ingredient]})
                            setIngredient('')
                        }} />
                    </div>
                    <ol>
                    {
                        recipeData.ingredients.map((item) => {
                            return(
                                <li key={item}>{item}</li>
                            )
                        })
                    }
                    </ol>
                    {
                        recipeData.ingredients.length > 0 ?
                        <span onClick={() => {
                            setRecipeData({...recipeData, ingredients: []})
                        }}>Clear</span>
                        :null 
                    }
                    </Form.Group>
                    {/* assignment */}
                <Form.Group>
                    <Form.Label>Directions</Form.Label>
                    <div style = {styles.flex}>
                        <Form.Control type='text'
                            value={direction}
                            onChange={(e) =>setDirection(e.target.value)}
                        />
                          <AddIcon onClick = {() => {
                            console.log('getting clicked')
                            setRecipeData({...recipeData, directions: [...recipeData.directions, direction]})
                            setDirection('')
                        }} />
                     </div>
                    <ul>
                    {
                        recipeData.directions.map((item) => {
                            return(
                                <li key={item}>{item}</li>
                            )
                        })
                    }
                    </ul>
                    {
                        recipeData.directions.length > 0 ?
                        <span onClick={() => {
                            setRecipeData({...recipeData, directions: []})
                        }}>Clear</span>
                        :null 
                    }
                </Form.Group>
                <button style = {styles. submitButton}type='submit'>Submit</button>
            </Form>

            </Modal.Body>
          </Modal>
        </>
      )
}

const styles = {
    flex: {
        display: 'flex',
        alignItems: 'center'
    },
    submitButton: {
        backgroundColor: 'red',
        color: 'white',
        width: '100%',
        padding: '7px'
    }
}
export default RecipeForm