import { useEffect, useState } from 'react';
import NavBar from '../../NavBar/NavBar.component';
import { LoginUser } from '../../Apis/User.api';
import { useNavigate } from 'react-router-dom';
const SignIn = () => {
    const [data, setData] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e:any) => {
        try{
            e.preventDefault();
            const resp:any = await LoginUser({data: data, password: password});
            if(resp.error){
                setError(resp.error);
                return;
            }
            localStorage.setItem('token', resp.headers.get('Authorization'));
            navigate('/home');
        }catch(err : any){
            setError(err);
        }
    }
    useEffect(()=>{
        setLoading(true);
        if(localStorage.getItem('token') !== null){
            navigate('/home');
        }
    },[])
    return (
        <>
            <NavBar />
            <div className={`${loading ? 'opacity-100 transition-opacity duration-[1500ms]' : 'opacity-0'} flex justify-center items-center h-[80vh] `}>
                <div className='bg-mine-shaft p-6 rounded-lg shadow-md min-h-[350px]'>
                    <h1 className='text-center text-3xl font-bold'>Sign In</h1>
                    <form className='flex flex-col space-y-4' onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor='data' className='text-lg'>Email or Username</label>
                            <input 
                            type='text' 
                            id='data' 
                            className='w-full p-2 border-2 text-tundora border-mine-shaft rounded-md' 
                            value={data}
                            onChange={(e) => setData(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor='password' className='text-lg'>Password</label>
                            <input 
                            type='password' 
                            id='password' 
                            className='w-full p-2 border-2 text-tundora border-mine-shaft rounded-md' 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button 
                        type='submit' 
                        className='bg-mine-shaft border-2 border-white text-white p-2 rounded-md transition-colors hover:bg-white hover:text-mine-shaft active:bg-boulder active:text-scorpion'
                        >Sign In</button>
                        {error && <p className='text-red-500 text-lg text-center'>{error}</p>}
                    </form>
                </div>
            </div>
        </>
    )
}
export default SignIn;