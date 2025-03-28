import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AboutUs from './pages/AboutUs';
import Home from './pages/Home';
import MainNavigation from './components/MainNavigation';
import AddFoodRecipe from './pages/AddFoodRecipe';
import EditRecipe from './pages/EditRecipe';
import RecipeDetails from './pages/RecipeDetails';
import RecipeItems from './components/RecipeItems';
import axios from 'axios';

// ✅ Function to Fetch All Recipes
const getAllRecipes = async () => {
  let allRecipes = [];
  try {
    const response = await axios.get('https://mern-project-recipe.onrender.com/recipe/');
    allRecipes = response.data;
  } catch (error) {
    console.error("Error fetching recipes:", error);
  }
  return allRecipes;
};

// ✅ Function to Get Recipes Created by Logged-in User
const getMyRecipes = async () => {
  let user = JSON.parse(localStorage.getItem("user"));
  let allRecipes = await getAllRecipes();
  return allRecipes.filter(item => item.createdBy === user?._id);
};

// ✅ Function to Get Favorite Recipes
const getFavRecipes = () => {
  return JSON.parse(localStorage.getItem("fav")) || [];
};

// ✅ Function to Get a Single Recipe by ID
const getRecipe = async ({ params }) => {
  let recipe = null;
  try {
    const res = await axios.get(`https://mern-project-recipe.onrender.com/recipe/${params.id}`);
    recipe = res.data;
    
    // Fetch creator details
    const userRes = await axios.get(`https://mern-project-recipe.onrender.com/user/${recipe.createdBy}`);
    recipe = { ...recipe, email: userRes.data.email };
  } catch (error) {
    console.error("Error fetching recipe details:", error);
  }
  return recipe;
};

// ✅ Define Routes (Removed NotFound)
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainNavigation />,
    children: [
      { path: "/", element: <Home />, loader: getAllRecipes },
      { path: "/myRecipe", element: <RecipeItems />, loader: getMyRecipes },
      { path: "/favRecipe", element: <RecipeItems />, loader: getFavRecipes },
      { path: "/addRecipe", element: <AddFoodRecipe /> },
      { path: "/editRecipe/:id", element: <EditRecipe /> },
      { path: "/recipe/:id", element: <RecipeDetails />, loader: getRecipe },
      { path: "/about", element: <AboutUs /> },  // ✅ "About Us" Route
    ],
  },
]);

// ✅ Main App Component
export default function App() {
  return <RouterProvider router={router} />;
}
