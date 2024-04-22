import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Logout } from '../../Apis/User.api';

const LogOut = () =>{
    const navigate = useNavigate();
    useEffect(()=>{
        Logout(true);
        localStorage.removeItem('token');
        navigate('/');
    },[])
    return null;
}
export default LogOut;