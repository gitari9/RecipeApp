import SearchIcon from '@mui/icons-material/Search';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import NavBar from "./NavBar"
import FavoriteIcon from '@mui/icons-material/Favorite';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import YouTubeIcon from '@mui/icons-material/YouTube';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate()
    const [recipes, setRecipes] = useState([])
    const getRecipes = async() => {
        const response = await axios.get('http://localhost:5000/recipe')
        console.log(response)
        setRecipes(response.data.data)
    }

    useEffect(() => {
        getRecipes()
    }, [])

    return(
        <>
            <NavBar/>
            <div>
                <img className="img" src="./images/fruit_bowl.png"
                alt=""
                />
            </div>
            <div className='button'>
                <input className='recipe' placeholder='Search a recipe...'/>
                <SearchIcon className='buttonicon'/>
            </div>
                <Row xs={1} md={4} className="g-4">
                    {
                        recipes.map((recipe) => {
                            return(
                                <Col className='cod' key={recipe._id}>
                                <Card className='crd'>
                                    <Card.Img variant="top" src={'http://localhost:5000/' + recipe.image }/>
                                    <div className='overlay-text'>
                                        <div className='overlay-text-center'>
                                            <p className='p'>{recipe.title}</p>
                                            <div className='icon'>
                                                <FavoriteIcon />
                                                <p>{recipe.likes.length}</p>
                                            </div>
                                            <button onClick={()=>{
                                                console.log('getting clicked')
                                                navigate(`/recipe/${recipe._id}`)
                                            }}className='btnz'>View</button>
                                        </div>
                                    </div> 
                                </Card>
                            </Col>
                            )
                        })
                    }
                </Row>
                    {/* <Col className='cod'>
                        <Card className='crd'>
                            <Card.Img variant="top" src="./images/salad.png" />
                            <div className='overlay-text'>
                                <div className='overlay-text-center'>
                                    <p className='p'>Egg,beetroot Nicoise Salad</p>
                                    <div className='icon'>
                                        <FavoriteIcon />
                                        <p>29 likes</p>
                                    </div>
                                    <button className='btnz'>View</button>
                                </div>
                            </div> 
                        </Card>
                    </Col>
                    <Col className='cod'>
                        <Card className='crd'>
                            <Card.Img variant="top" src="./images/cake.png" />
                            <div className='overlay-text'>
                                <div className='overlay-text-center'>
                                    <p className='p'>Classic Strawberry Layer Cake</p>
                                    <div className='icon'>
                                        <FavoriteIcon />
                                        <p>23 likes</p>
                                    </div>
                                    <button className='btnz'>View</button>
                                </div>
                            </div> 
                        </Card>
                    </Col>
                    <Col className='cod'>
                        <Card className='crd'>
                            <Card.Img variant="top" src="./images/toast.png" />
                            <div className='overlay-text'>
                                <div className='overlay-text-center'>
                                    <p className='p'>Sandwich With Boiled Eggs</p>
                                    <div className='icon'>
                                        <FavoriteIcon />
                                        <p>32 likes</p>
                                    </div>
                                    <button className='btnz'>View</button>
                                </div>
                            </div> 
                        </Card>
                    </Col>
                    <Col className='cod'>
                        <Card className='crd'>
                            <Card.Img variant="top" src="./images/oatmeal.png" />
                            <div className='overlay-text'>
                                <div className='overlay-text-center'>
                                    <p className='p'>Soupy Lobster Oats With Veges</p>
                                    <div className='icon'>
                                        <FavoriteIcon />
                                        <p>26 likes</p>
                                    </div>
                                    <button className='btnz'>View</button>
                                </div>
                            </div> 
                        </Card>
                    </Col>
                    <Col className='cod'>
                        <Card className='crd'>
                            <Card.Img variant="top" src="./images/salad.png" />
                            <div className='overlay-text'>
                                <div className='overlay-text-center'>
                                    <p className='p'>Egg,Beetroot Nicoise Salad</p>
                                    <div className='icon'>
                                        <FavoriteIcon />
                                        <p>29 likes</p>
                                    </div>
                                    <button className='btnz'>View</button>
                                </div>
                            </div> 
                        </Card>
                    </Col>
                    <Col className='cod'> 
                        <Card className='crd'>
                            <Card.Img variant="top" src="./images/cake.png" />
                            <div className='overlay-text'>
                                <div className='overlay-text-center'>
                                    <p className='p'>Classic Strawberry Layer Cake</p>
                                    <div className='icon'>
                                        <FavoriteIcon />
                                        <p>23 likes</p>
                                    </div>
                                    <button className='btnz'>View</button>
                                </div>
                            </div>    
                        </Card>
                    </Col>
                    <Col className='cod'>
                        <Card className='crd'>
                            <Card.Img variant="top" src="./images/toast.png" />
                            <div className='overlay-text'>
                                <div className='overlay-text-center'>
                                    <p className='p'>Sandwich With Boiled Eggs</p>
                                    <div className='icon'>
                                        <FavoriteIcon />
                                        <p>32 likes</p>
                                    </div>
                                    <button className='btnz'>View</button>
                                </div>
                            </div>  
                        </Card>
                    </Col>
                    <Col className='cod'>
                        <Card className='crd'>
                            <Card.Img variant="top" src="./images/oatmeal.png" />
                            <div className='overlay-text'>
                                <div className='overlay-text-center'>
                                    <p className='p'>Soupy Lobster Oats With Veges</p>
                                    <div className='icon'>
                                        <FavoriteIcon />
                                        <p>26 likes</p>
                                    </div>
                                    <button className='btnz'>View</button>
                                </div>
                            </div>  
                        </Card>
                    </Col>
                    <Col className='cod'>
                        <Card className='crd'>
                            <Card.Img variant="top" src="./images/salad.png" />
                            <div className='overlay-text'>
                                <div className='overlay-text-center'>
                                    <p className='p'>Egg,Beetroot Nicoise Salad</p>
                                    <div className='icon'>
                                        <FavoriteIcon />
                                        <p>29 likes</p>
                                    </div>
                                    <button className='btnz'>View</button>
                                </div>
                            </div>  
                        </Card>
                    </Col>
                    <Col className='cod'>
                        <Card className='crd'>
                            <Card.Img variant="top" src="./images/cake.png" />
                             <div className='overlay-text'>
                                <div className='overlay-text-center'>
                                    <p className='p'>Classic Strawberry Layer Cake</p>
                                    <div className='icon'>
                                        <FavoriteIcon />
                                        <p>23 likes</p>
                                    </div>
                                    <button className='btnz'>View</button>
                                </div>
                            </div>  
                        </Card>
                    </Col>
                    <Col className='cod'>
                        <Card className='crd'>
                            <Card.Img variant="top" src="./images/toast.png" />
                            <div className='overlay-text'>
                                <div className='overlay-text-center'>
                                    <p className='p'>Sandwich With Boiled Eggs</p>
                                    <div className='icon'>
                                        <FavoriteIcon />
                                        <p>32 likes</p>
                                    </div>
                                    <button className='btnz'>View</button>
                                </div>
                            </div> 
                        </Card>
                    </Col>
                    <Col className='cod'>
                        <Card className='crd'>
                            <Card.Img variant="top" src="./images/oatmeal.png" />
                            <div className='overlay-text'>
                                <div className='overlay-text-center'>
                                    <p className='p'>Soupy Lobster Oats With Veges</p>
                                    <div className='icon'>
                                        <FavoriteIcon />
                                        <p>26 likes</p>
                                    </div>
                                    <button className='btnz'>View</button>
                                </div>
                            </div> 
                        </Card>
                    </Col> */}
            <div className='pin'>
                <InstagramIcon className='icns'/>
                <PinterestIcon className='icns'/>
                <TwitterIcon className='icns'/>
                <FacebookRoundedIcon className='icns'/>
                <YouTubeIcon className='icns'/>
                <p>Built by KwetuHub students</p>
                <h6>KwetuHub@2023</h6>
            </div>
        </>
    )

}
export default Home


