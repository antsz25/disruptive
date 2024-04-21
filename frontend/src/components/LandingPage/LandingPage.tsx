import {useEffect, useState} from 'react';
import './../../../src/style.css';
export default function LandingPage(){
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
          setLoading(true);
        }, 1);
        return () => clearTimeout(timer);
      }, []);
    return (
        <div className={`${loading ? 'opacity-100 transition-opacity duration-[1500ms]' : 'opacity-0'}`} style ={{
            backgroundImage: 'linear-gradient(to bottom right, #909090,60%, #5376e5)',
            padding: '1rem',
            color: 'white',
        }}>
            <section>
                <img src="./../../src/Images/logo.png" className='max-w-[15rem]' />
            </section>
            <h1 className="text-4xl font-bold text-center text-gray-800">Welcome to Disruptive Studio</h1>
            <div className="container mx-auto">
                <div className={`flex flex-col md:flex-row items-center justify-center h-screen ${loading ? 'opacity-100 transition-opacity duration-[1800ms]' : 'opacity-0'}`}>
                    <div className="text-right mx-10 max-w-[50%]">
                        <p>Imagine an experience where multimedia content adapts to each user intuitively and accessibly. At Disruptive Studio, we bring this vision to life.</p>
                    </div>
                    <img src="https://picsum.photos/300/300" alt="Picsum" className="max-h-[300px] md:order-2" />
                </div>
            </div>
        </div>
    );
}