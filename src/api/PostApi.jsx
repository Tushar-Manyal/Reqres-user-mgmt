import React from 'react'
import axios from "axios";

const api=axios.create({
    baseURL:"#",
})


export const getPost = () => {
    //-------/posts is a route
 return api.get("/posts")//get method
}

