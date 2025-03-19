import React, { useState, useEffect } from 'react'
import foodRecipe from '../assets/foodRecipe.png'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import RecipeItems from '../components/RecipeItems'
import { useNavigate } from 'react-router-dom'
import Modal from '../components/Modal'
import InputForm from '../components/InputForm'
import toast from 'react-hot-toast'

export default function Home() {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        toast.success("Welcome to Home", {
            position: "top-right", // You can change this to 'top-center', 'bottom-left', etc.
            duration: 3000, // Display time in milliseconds
        })
    }, [])

    const addRecipe = () => {
        let token = localStorage.getItem("token")
        if (token)
            navigate("/addRecipe")
        else {
            setIsOpen(true)
        }
    }

    return (
        <> 
            <section className='home'>
                <div className='left'>
                    <h1>FoOd ReCiPiEs</h1>
                    <h5>"Bringing flavors to life—one recipe at a time!" "Cook, Share, and Savor Every Bite!"</h5>
                    <button onClick={addRecipe} className='share'>Share your recipe</button>
                </div>
                <div className='right'>
                    
                        <img src={foodRecipe} width="320px" className='plate' height="300px" alt="Food Recipe" />
                    
                </div>
            </section>
            {(isOpen) && <Modal onClose={() => setIsOpen(false)}><InputForm setIsOpen={() => setIsOpen(false)} /></Modal>}
            <div className='recipe'>
                <RecipeItems />
            </div>
        </>
    )
}