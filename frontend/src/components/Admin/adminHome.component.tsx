import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
import Navbar from '../NavBar/NavBar.component';
import {getMe} from '../Apis/User.api'
const AdminHome = () =>{
    useEffect(()=>{
        const request = (async ()=>{
            const result = await getMe();
            return result.json();
        })
        console.log(request);
    },[])
    return(
        <>
            <Navbar />
            <div><h1>Hello admin</h1></div>
        </>
    )
}
export default AdminHome;