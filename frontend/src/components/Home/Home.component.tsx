import { useEffect, useState } from 'react';
import Navbar from '../NavBar/NavBar.component';
import { useNavigate } from 'react-router-dom';
export default function Home() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(()=>{
        setLoading(true);
        if(localStorage.getItem('token') === null){
            return navigate('/');
        }
    },[]);
    return (
        <>
            <Navbar/>
            <div className={`${loading ? 'opacity-100 transition-opacity duration-[1500ms]' : 'opacity-0'}`}>
                <div className='flex justify-center items-center h-[80vh]'>
                    <h1 className='text-3xl font-bold'>Welcome to the Home Page</h1>
                </div>
            </div>
        </>
    )
}