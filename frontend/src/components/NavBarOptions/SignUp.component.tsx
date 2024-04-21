import { useEffect, useState } from 'react';
import NavBar from '../NavBar/NavBar.component';
const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log(username,email, password);
    }
    useEffect(()=>{
        setLoading(true);
    },[])
    return (
        <>
            <NavBar />
            <div className={`${loading ? 'opacity-100 transition-opacity duration-[1500ms]' : 'opacity-0'} flex justify-center items-center h-[80vh]`}>
                <div className='bg-mine-shaft p-6 rounded-lg shadow-md'>
                    <h1 className='text-center text-3xl font-bold'>Sign Up</h1>
                    <form className='flex flex-col space-y-4' onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor='email' className='text-lg'>Email</label>
                            <input 
                            type='text' 
                            id='username' 
                            className='w-full p-2 border-2 border-mine-shaft rounded-md' 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor='email' className='text-lg'>Email</label>
                            <input 
                            type='email' 
                            id='email' 
                            className='w-full p-2 border-2 border-mine-shaft rounded-md' 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor='password' className='text-lg'>Password</label>
                            <input 
                            type='password' 
                            id='password' 
                            className='w-full p-2 border-2 border-mine-shaft rounded-md' 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button 
                        type='submit' 
                        className='bg-mine-shaft border-2 border-white text-white p-2 rounded-md transition-colors hover:bg-white hover:text-mine-shaft active:bg-boulder active:text-scorpion'
                        >Sign Up</button>
                    </form>
                    {/* Add your sign-in form or content here */}
                </div>
            </div>
        </>
    )
}
export default SignUp;