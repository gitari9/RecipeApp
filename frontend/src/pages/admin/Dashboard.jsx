import RecipeForm from "./RecipeForm"
import axios from 'axios'
import { useEffect, useState } from "react"
import Table from 'react-bootstrap/Table';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Cookies from 'js-cookie'
const Dashboard = () => {
    const [show, setShow] = useState(false);
    const [formStatus, setFormStatus] = useState('create')//either create/edit
    const [recipes, setRecipes] = useState([])
    const[recipeData, setRecipeData] = useState({
        title: '', image: '', ingredients: [], directions: []
    })

    const token = Cookies.get('creatorToken')


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getRecipes = async () => {
        const response = await axios.get('http://localhost:5000/recipe')
        console.log(response)
        setRecipes(response.data.data)
    }

    const getRecipe = async (id) => {
        const response = await axios.get(`http://localhost:5000/recipe/get/${id}`)
        console.log(response)
        setRecipeData(response.data.data)
    }

    const createRecipe = async(e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('title', recipeData.title);
        formData.append('image', recipeData.image);
        formData.append('ingredients', JSON.stringify(recipeData.ingredients));
        formData.append('directions', JSON.stringify(recipeData.directions));

        
        const response = await axios.post('http://localhost:5000/recipe', formData, {headers: {
            Authorization: `Bearer ${token}`
        }})
                                    
        console.log(response);
        setRecipes([...recipes, response.data.data])
        handleClose()
      }
    
      const editRecipe = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('title', recipeData.title);
        formData.append('image', recipeData.image);
        formData.append('ingredients', JSON.stringify(recipeData.ingredients));
        formData.append('directions', JSON.stringify(recipeData.directions));
    
        const response = await axios.put(`http://localhost:5000/recipe/${recipeData._id}`, formData,  {headers: {
            Authorization: `Bearer ${token}`
        }});
        console.log(response);
        const newRecipes = recipes.map((recipe) => {
            if(response.data.data._id === recipe._id){
                return response.data.data
            }else {
                return recipe
            }
        })
        setRecipes(newRecipes)
        handleClose()
      }

      const deleteRecipe = async(id) => {
       const response = await axios.delete(`http://localhost:5000/recipe/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
       })
       console.log(response)
       const filteredRecipes = recipes.filter((recipe) => {
        return recipe._id !== id
       })
       setRecipes(filteredRecipes)
      }

    useEffect(() => {
        getRecipes()
    }, [])
    return(
        <>
        <h1>Dashboard</h1>
        <button style = {styles.recipeButton} onClick={() => {
            setFormStatus('create')
            handleShow()
        }}>Add a recipe</button>
        <RecipeForm
         show={show}
         handleClose={handleClose}
         formStatus={formStatus}
         recipeData={recipeData}
         setRecipeData={setRecipeData}
         createRecipe = {createRecipe}
         editRecipe = {editRecipe}
        />
        <h3>My Recipes</h3>
        {/* map over all recipes here using a table */}
        
                 <Table>
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Ingredients</th>
                        <th>Directions</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                        {
                            recipes.map ((recp) => {
                                return(
                                <tr key = {recp.image}>
                                    <td> <img style = {styles.length} src={'http://localhost:5000/' + recp.image}/> </td>
                                    <td>{recp.title}</td>
                                    <td>{recp.ingredients}</td>
                                    <td>{recp.directions}</td>
                                    <td>
                                        <EditIcon onClick={() =>{
                                            getRecipe(recp._id)
                                            setFormStatus('edit')
                                            handleShow()
                                        }}
                                        /> 
                                        <DeleteIcon onClick={() => {
                                            deleteRecipe(recp._id)
                                        }}/>

                                    </td>
                                </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
        
        </>
    )
}
const styles = {
    length: {
        width: '30%' 
    },
    recipeButton: {
        backgroundColor: 'red',
        color: 'white'
    },
    
}
export default Dashboard