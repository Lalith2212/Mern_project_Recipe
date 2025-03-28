import React, { useEffect, useState } from 'react'
import { Link, useLoaderData, useNavigate } from 'react-router-dom'
import foodImg from '../assets/foodRecipe.png'
import { BsStopwatchFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from 'axios';

export default function RecipeItems() {
    const recipes = useLoaderData()
    const [allRecipes, setAllRecipes] = useState()
    let path = window.location.pathname === "/myRecipe" ? true : false
    let favItems = JSON.parse(localStorage.getItem("fav")) ?? []
    const [isFavRecipe, setIsFavRecipe] = useState(false)
    const navigate=useNavigate()
    console.log(allRecipes)

    useEffect(() => {
        setAllRecipes(recipes)
    }, [recipes])

    const onDelete = async (id) => {
        await axios.delete(`https://mern-project-recipe.onrender.com/recipe/${id}`)
            .then((res) => console.log(res))
        setAllRecipes(recipes => recipes.filter(recipe => recipe._id !== id))
        let filterItem = favItems.filter(recipe => recipe._id !== id)
        localStorage.setItem("fav", JSON.stringify(filterItem))
    }

    const favRecipe = (item) => {
        let filterItem = favItems.filter(recipe => recipe._id !== item._id)
        favItems = favItems.filter(recipe => recipe._id === item._id).length === 0 ? [...favItems, item] : filterItem
        localStorage.setItem("fav", JSON.stringify(favItems))
        setIsFavRecipe(pre => !pre)
    }

    return (
        <>
           <div className='card-container' style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    padding: "20px",
    justifyContent: "center",
}}>
    {allRecipes?.map((item, index) => {
        return (
            <div 
                key={index} 
                className='card' 
                onDoubleClick={() => navigate(`/recipe/${item._id}`)} 
                style={{
                    background: "black",
                    borderRadius: "10px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    transition: "transform 0.3s ease-in-out",
                    overflow: "hidden",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    padding: "15px",
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
    <img 
    src={`https://mern-project-recipe.onrender.com/images/${item.coverImage}`} 
    marginTop="10px"
    padding-top="20px"
    width="70%"  // Reduced size from 100% to 90%
    height="100x" // Slightly reduced height
    style={{
        objectFit: "cover",
        borderRadius: "12px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        transition: "transform 0.3s ease-in-out",
        cursor: "pointer",
        marginTop: "20px",  // Adds gap from navbar
        display: "block", 
        marginLeft: "auto", 
        marginRight: "auto" // Centers the image
    }}
    onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
    onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
/>

        
                <div className='card-body' style={{ marginTop: "10px" ,background:"#f4c842"}}>
                    <div className='title' style={{
                        fontSize: "1.1rem",
                        fontWeight: "600",
                        marginBottom: "5px",
                    }}>{item.title}</div>
                    <div className='icons' style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                        fontSize: "14px",
                        color: "#666",
                    }}>
                        <div className='timer' style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                        }}>
                            <BsStopwatchFill style={{ color: "#ff6600" }} /> {item.time}
                        </div>
                        {(!path) ? (
                            <FaHeart 
                                onClick={() => favRecipe(item)}
                                style={{
                                    color: favItems.some(res => res._id === item._id) ? "red" : "gray",
                                    fontSize: "18px",
                                    cursor: "pointer",
                                    transition: "color 0.3s",
                                }}
                                onMouseEnter={(e) => e.target.style.color = "red"}
                                onMouseLeave={(e) => e.target.style.color = favItems.some(res => res._id === item._id) ? "red" : "gray"}
                            />
                        ) : (
                            <div className='action' style={{
                                display: "flex",
                                gap: "10px",
                            }}>
                                <Link to={`/editRecipe/${item._id}`} className="editIcon">
                                    <FaEdit style={{
                                        color: "#007bff",
                                        fontSize: "18px",
                                        cursor: "pointer",
                                    }} />
                                </Link>
                                <MdDelete 
                                    onClick={() => onDelete(item._id)} 
                                    className='deleteIcon' 
                                    style={{
                                        color: "red",
                                        fontSize: "18px",
                                        cursor: "pointer",
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    })}
</div>

        </>
    )
}
