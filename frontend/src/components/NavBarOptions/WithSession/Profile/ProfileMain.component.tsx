import Navbar from "../../../NavBar/NavBar.component";
import { useState, useEffect } from "react";
import { useNavigate} from 'react-router-dom';
import ContentUploaded from "./contentUploaded.component";
import Profile from "./Profile.component";
import { getMe } from '../../../Apis/User.api';
import AdminPanel from "./editContent.component";
interface User{
    email: string;
    username: string;
    role: string;
}
const ProfileMain = () =>{
    const navigate = useNavigate();
    const [showContent, setShowContent] = useState(true);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<User>({
        email: '',
        username: '',
        role: '',
    });
    useEffect(()=>{
        if(localStorage.getItem('token') === null){
            return navigate('/');
        }
        const fetchMe = async () => {
            try{
                const response:any = await getMe().then((res) => res);
                if(!response){
                    throw new Error('No response');
                }
                const userData:User = response;
                setUser(userData);
            }catch(err:any){
                console.error(err);
            }
        }
        fetchMe();
        setLoading(true);
    },[]);
    if(user.role === 'admin'){
        return (
            <>
            <Navbar />
            <AdminPanel />
            </>
        )
    }
    return (
        <>
            <Navbar />
            <div className={`${loading ? 'opacity-100 transition-opacity duration-[1500ms]' : 'opacity-0'} flex justify-center flex-row order-1 h-[80vh]`}>
                {loading && <Profile data={user} setShowContent={setShowContent}/>}
                {user.role==="creator" && showContent && <ContentUploaded />}
            </div>
        </>
    )
}
export default ProfileMain;