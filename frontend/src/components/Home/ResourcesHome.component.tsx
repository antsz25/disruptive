<div className='flex justify-center items-center h-[80vh]'> <h1 className='text-3xl font-bold'>Loading...</h1> </div> 
import { useEffect, useState } from 'react';
import Home from './Home.component';

export default function RenderPhotos() {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setLoading(true);
        }, 1000);
    },[]);
    return (
        <>
            {loading && <Home />}
            {!loading && <div className='flex justify-center items-center h-[80vh]'> <h1 className='text-3xl font-bold'>Loading...</h1> </div> }
        </>
    )
} 
