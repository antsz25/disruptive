import { useEffect, useState } from 'react';
import Navbar from '../NavBar/NavBar.component';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../Apis/User.api';
interface User{
    email: string;
    username: string;
    role: string;
    _id: string;
}
export default function Home() {
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState<User>({
        email: '',
        username: '',
        role: '',
        _id: '',
    });
    const navigate = useNavigate();
    const fetchMe = async() =>{
        try{
            const result:User = await getMe().then((res) => res);
            setUserData(result);
        }catch(err:any){
            console.error(err.message);
        }
    }
    useEffect(()=>{
        setLoading(true);
        fetchMe();
        if(localStorage.getItem('token') === null){
            return navigate('/');
        }
        if(userData.role === 'admin'){
            return navigate('/admin');
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