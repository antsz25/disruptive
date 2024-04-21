import {useEffect, useState} from 'react';
import './../../../src/style.css';
import Navbar from '../NavBar/NavBar.component';
export function LandingPage({data}:{data: {photo1: string, photo2: string}}){
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
    }, []);
    return (
        <>
            <Navbar />
            <div className={`${loading ? 'opacity-100 transition-opacity duration-[1500ms]' : 'opacity-0'}`}>
                <h1 className="text-4xl font-bold text-center text-gray-800">Welcome to Disruptive Studio</h1>
                <div className="container mx-auto p-[10rem]">
                    <div className={`flex flex-col md:flex-row items-center justify-center min-h-full${loading ? 'opacity-100 transition-opacity duration-[1800ms]' : 'opacity-0'}`}>
                        <div className="text-justify mx-10 max-w-[35rem]">
                            <p className='text-lg leading-loose font-semibold text-mine-shaft'>Find relevant content and discover new experiences at Disruptive Studio. </p>
                        </div>
                        <img src={data.photo1} alt="Picsum" loading='lazy' className="max-h-[300px] w-[300px] md:order-2" />
                    </div>
                </div>
                <div className="container mx-auto p-[3rem]">
                    <div className={`flex flex-col md:flex-row items-center justify-center min-h-full${loading ? 'opacity-100 transition-opacity duration-[1800ms]' : 'opacity-1'}`}>
                    <img src={data.photo2} alt="Picsum" loading='lazy' className="max-h-[300px] w-[300px] md:order-0" />
                        <div className="text-justify mx-10 max-w-[35rem]">
                            <p className='text-lg leading-loose font-semibold text-mine-shaft'>Explore our repository of images, texts, and videos organized by categories.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}