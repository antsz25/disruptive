import React, { useEffect, useState } from 'react';
import NavBar from '../../NavBar/NavBar.component';
import { RegisterUser } from '../../Apis/User.api';
import { useNavigate } from 'react-router-dom';
const SignUp = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: '',
        areCreator: false,
    });
    const [errors, setErrors] = useState({
        email: '',
        password: '',
        username: '',
    });
    const [success, setSuccess] = useState(false);

    const handleChange = (e:any) => {
        //Set the form data with the new values
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === 'areCreator' ? e.target.checked : value,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',
        }));
    };

    const handleSubmit = async (e:any) => {
        e.preventDefault();

        const { email, password, username } = formData;
        const newErrors: Partial<typeof errors> = {};
        //Set errors of the form if the fields are empty
        if (!email) newErrors.email = 'Email is required';
        if (!password) newErrors.password = 'Password is required';
        if (!username) newErrors.username = 'Username is required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors as typeof errors);
        } else {
            try{
                const resp = await RegisterUser(formData);
                if(resp.error){ // Change the state of the errors in the form
                        if(resp.error.includes('Email')){
                            newErrors.email = 'Email is already exists';
                        }
                        if(resp.error.includes('Username')){
                            newErrors.username = 'Username is already exists';
                        }
                        if(resp.error.includes('password')){
                            newErrors.password = 'Password needs to be at least 8 characters long';
                        }
                        setErrors(newErrors as typeof errors);
                        setSuccess(false);
                        return;
                }
                // If the user is created successfully, set the success state to true
                setSuccess(true);
            }catch(err){
                console.log(err);
            }
        }
    };
    useEffect(() => {
        setLoading(true);
        setSuccess(true);
        if(localStorage.getItem('token') !== null){
            navigate('/home');
        }
    }, []);
    return (
        <>
            <NavBar />
            <div className={`${loading ? 'opacity-100 transition-opacity duration-[1500ms]' : 'opacity-0'} flex justify-center items-center h-[80vh]`}>
                <div className='bg-mine-shaft p-6 rounded-lg shadow-md min-h-[500px] min-w-[460px] max-w-[460px] max-h-[500px]'>
                    <h1 className='text-center text-3xl font-bold'>Sign Up</h1>
                    <form className='flex flex-col space-y-4' onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor='username' className='text-lg'>
                                Username
                            </label>
                            <input
                                type='text'
                                id='username'
                                name='username'
                                className='w-full p-2 border-2 text-tundora border-mine-shaft rounded-md'
                                value={formData.username}
                                onChange={handleChange}
                            />
                            {errors.username && <span className='text-red-500'>{errors.username}</span>}
                        </div>
                        <div>
                            <label htmlFor='email' className='text-lg'>
                                Email
                            </label>
                            <input
                                type='email'
                                id='email'
                                name='email'
                                className='w-full p-2 border-2 text-tundora border-mine-shaft rounded-md'
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && <span className='text-red-500'>{errors.email}</span>}
                        </div>
                        <div>
                            <label htmlFor='password' className='text-lg'>
                                Password
                            </label>
                            <input
                                type='password'
                                id='password'
                                name='password'
                                className='w-full p-2 border-2 text-tundora border-mine-shaft rounded-md'
                                value={formData.password}
                                onChange={handleChange}
                            />
                            {errors.password && <span className='text-red-500'>{errors.password}</span>}
                        </div>
                        <div>
                            <label htmlFor='areCreator' className='text-lg'>
                                Are you a creator?
                            </label>
                            <input
                                type='checkbox'
                                id='areCreator'
                                name='areCreator'
                                className='mx-4 p-2 border-2 border-mine-shaft rounded-md'
                                checked={formData.areCreator}
                                onChange={handleChange}
                            />
                        </div>
                        <button
                            type='submit'
                            className='bg-mine-shaft border-2 border-white text-white p-2 rounded-md transition-colors hover:bg-white hover:text-mine-shaft active:bg-boulder active:text-scorpion'
                        >
                            Sign Up
                        </button>
                        {success && <span className='text-royal-blue text-lg text-center'>User created successfully</span>}
                    </form>
                </div>
            </div>
        </>
    );
};

export default SignUp;
