import { useEffect, useState } from 'react';
import GetPhoto200x300 from '../Apis/LandingPage.api';
import { LandingPage } from './LandingPage.component';
export default function RenderPhotos() {
    const [photos, setPhotos] = useState<{ photo1: string, photo2: string }>({ photo1: '', photo2: '' });
    const [loading, setLoading] = useState(false);
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
                if(localStorage.getItem('NumberOfReloads') === '2'){
                    localStorage.removeItem('cachedImageUrls');
                    localStorage.removeItem('NumberOfReloads');
                    return await fetchImageUrls();
                }
                localStorage.setItem('NumberOfReloads', (parseInt(localStorage.getItem('NumberOfReloads') as string) + 1).toString());
                setLoading(true);
                return setPhotos(JSON.parse(cachedImageUrls));
            } else {
                // Realizar la petición para obtener las URLs de las imágenes
            return await fetchImageUrls();
            }
        })();
    },[]);
    return (
        <>
            {loading && <LandingPage data={photos} />}
            {!loading && <div className='flex justify-center items-center h-[80vh]'> <h1 className='text-3xl font-bold'>Loading...</h1> </div> }
        </>
    )
} 
