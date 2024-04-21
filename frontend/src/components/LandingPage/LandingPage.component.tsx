import {useEffect, useState} from 'react';
import './../../../src/style.css';
import Navbar from '../NavBar/NavBar.component';
import GetPhoto200x300 from '../Apis/GetPhoto.api'
export default function LandingPage(){
    const [photos, setPhotos] = useState<{ photo1: string, photo2: string }>({ photo1: '', photo2: '' });
    async function GetPhotos() {
        try {
            const response = await GetPhoto200x300();
            const response2 = await GetPhoto200x300();
            return { photo1: response, photo2: response2 };
        } catch (error) {
            console.error(error);
            throw error; // Rethrow the error to handle it outside this function if needed
        }
    }
    async function fetchImageUrls() {
        try {
            const newImageUrls: any = await GetPhotos();
            // Guardar las URLs en el estado local
            localStorage.setItem('cachedImageUrls', JSON.stringify(newImageUrls)); // Cache the images url in local storage for better performance
            localStorage.setItem('NumberOfReloads', '1');
            setPhotos(newImageUrls);
            setLoading(true);
        } catch (error) {
            console.error('Error fetching image URLs:', error);
            // Handle the error, such as setting a state to display an error message
        }
    }
    useEffect(() => {
        (async() =>{
            //Get a new request if there are no cached images
            const cachedImageUrls = localStorage.getItem('cachedImageUrls');
            if (cachedImageUrls && cachedImageUrls !== "{}") {
                if(localStorage.getItem('NumberOfReloads') === '3'){
                    localStorage.removeItem('cachedImageUrls');
                    localStorage.removeItem('NumberOfReloads');
                    return fetchImageUrls();
                }
                localStorage.setItem('NumberOfReloads', (parseInt(localStorage.getItem('NumberOfReloads') as string) + 1).toString());
                return setPhotos(JSON.parse(cachedImageUrls));
            } else {
                // Realizar la petición para obtener las URLs de las imágenes
               return fetchImageUrls();
            }
        })();
    },[]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(true);
        }, 1);
        return () => clearTimeout(timer);
    },[]);
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
                        <img src={photos.photo1} alt="Picsum" loading='lazy' className="max-h-[300px] w-[300px] md:order-2" />
                    </div>
                </div>
                <div className="container mx-auto p-[3rem]">
                    <div className={`flex flex-col md:flex-row items-center justify-center min-h-full${loading ? 'opacity-100 transition-opacity duration-[1800ms]' : 'opacity-1'}`}>
                    <img src={photos.photo2} alt="Picsum" loading='lazy' className="max-h-[300px] w-[300px] md:order-0" />
                        <div className="text-justify mx-10 max-w-[35rem]">
                            <p className='text-lg leading-loose font-semibold text-mine-shaft'>Explore our repository of images, texts, and videos organized by categories.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}