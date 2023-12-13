import NavBar from "./NavBar"
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import Form from 'react-bootstrap/Form'
import DeleteIcon from '@mui/icons-material/Delete';
import CheckAuthModal from "../components/CheckAuthModal";


const Recipe = () => {
    const { id } = useParams()
    const [recipe, setRecipe] = useState({})
    const token = Cookies.get('token')
    const userId = Cookies.get('userId')
    const [comment, setComment] = useState(``)
    const [show, setShow] = useState(false);
    const [showComments, setShowComments] = useState(false)

    const getRecipe = async() => {
        const response = await axios.get(`http://localhost:5000/recipe/get/${id}`)
        console.log(response)
        setRecipe(response.data.data)
    }

    const sendComment = async(e) => {
        e.preventDefault()
        if(!token){
            setShow(true)
        }else {
            setShow(false)
            const response = await axios.post(
                `http://localhost:5000/recipe/comment/${id}`,
                {comment},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            console.log(response)
            setRecipe({...recipe, comments: response.data.data})
            setComment('')
        }
    }

    const deleteComment = async (commentId) => {
        const response = await axios.post(`http://localhost:5000/recipe/comment/delete/${id}`, 
        {commentId: commentId},
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        )
        console.log(response)
        const filteredComments = recipe.comments.filter((comment) => {
            return comment._id !== commentId
        })
        setRecipe({...recipe, comments: filteredComments})
    }
    // 65702cf8d8c46983d60df113

    // '65702cf8d8c46983d60df113')
// new ObjectId('65702cffd8c46983d60df118')
// new ObjectId('657144a97030a0e397898c69')

    useEffect(()=>{
        getRecipe()
    }, [])
    return(
        <>
            <CheckAuthModal show={show} setShow={setShow}/>
            <NavBar/>
            <div className="containerRecipe">
                <div className="containr">
                        <img className="imgg" src={'http://localhost:5000/' + recipe.image }
                        alt=""
                        />
                    <div className="details">
                        <h4>{recipe.title}</h4>
                        <h5>Ingredients</h5>
                        {
                            recipe.ingredients ? 
                            recipe.ingredients.map ((ingredient) => {
                                return(
                                    <h5 key={ingredient}>{ingredient}</h5>
                                )
                            })
                            : null
                        }
                     
                        <h5>Directions</h5>
                        {
                            recipe.directions ?
                            recipe.directions.map((direction) => {
                                return(
                                    <h6 key={direction}>{direction}</h6>
                                )
                            })
                            : null
                        }
                    </div>
                </div>
                <div className="form">
                    <div className="likes">
                        <FavoriteIcon />
                        <p>20 likes</p>
                    </div>
                    <Form onSubmit = {sendComment}>
                    <Form.Group>
                        <Form.Label>Leave a comment</Form.Label>
                        <div>
                            <Form.Control type='text'
                                value={comment}
                                onChange={(e) =>setComment(e.target.value)}
                            />
                        </div>
                    </Form.Group>
                    <button type='submit'>Submit</button>
                    </Form>
                    {/* view button */}
                    
                    <button onClick={()=>setShowComments(true)}>Show Comments</button>
                    {/* <div id="comments">
                      <p>Comments section here </p>
                    </div> */}
                        {
                            recipe.comments && showComments === true ?
                            recipe.comments.map((item) => {
                                return(
                                    <div key={item._id}>
                                    <div style={styles.commentUserDetails}>
                                    <p>{item.userName}</p>
                                    {
                                        // check if the comment belong to us so that we onlu display the deleted icon when the comment is ours
                                        userId === item.userId ?
                                            <DeleteIcon onClick={()=> deleteComment(item._id)}/>
                                            : null

                                    }
                                    </div>
                                    <p style={styles.comment}>{item.message}</p>
                                    </div>
                                )
                            })
                            : null
                        }
                </div>
            </div>
        </>
    )
}

const styles = {
    commentUserDetails: {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '12px',
        fontWeight: 700,
    },
    comment: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        padding: '10px',
        borderRadius: '7px'
    },
    // comments: {
    //     // display: 'none'
    //    }
}
export default Recipe