import { useEffect, useState } from "react";
import "./../../../src/style.css";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () =>{
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        setLoading(true);
    }, []);
    const handleClick = () => {
        if(localStorage.getItem('token') !== null){
            navigate('/home');
        }
        else{
            navigate('/');
        }
    }
    if(localStorage.getItem('token') !== null){
        return (
            <section className={`${loading ? 'opacity-100 transition-opacity duration-[1500ms]' : 'opacity-0'} bg-gray-950 text-white `}>
                <nav className="container mx-auto flex items-center justify-between py-4">
                    <img src="./../../src/Images/logo.png" className='max-w-[15rem]' onClick={handleClick} style={{cursor:'pointer'}}/>
                    <ul className="flex space-x-10">
                        <li className="hover:text-gray-300">
                            <Link to="/" className="hover:text-gray-300">Home</Link>
                        </li>
                        <li className="hover:text-gray-300">
                            <Link to="/library" className="hover:text-gray-300">Library</Link>
                        </li>
                        <li className="hover:text-gray-300">
                            <Link to='/profile' className="hover:text-gray-300">Profile</Link>
                        </li>
                        <li className="hover:text-gray-300">
                            <Link to='/LogOut' className="hover:text-gray-300">Log Out</Link>
                        </li>
                    </ul>
                </nav>
            </section>
        )
    }
    else{
        return(
            <section className={`${loading ? 'opacity-100 transition-opacity duration-[1500ms]' : 'opacity-0'} bg-gray-950 text-white `}>
                <nav className="container mx-auto flex items-center justify-between py-4">
                    <img src="./../../src/Images/logo.png" className='max-w-[15rem]' onClick={handleClick} style={{cursor:'pointer'}}/>
                    <ul className="flex space-x-10">
                        <li className="hover:text-gray-300">
                            <Link to="/" className="hover:text-gray-300">Home</Link>
                        </li>
                        <li className="hover:text-gray-300">
                            <Link to='/signin' className="hover:text-gray-300">Sign In</Link>
                        </li>
                        <li className="hover:text-gray-300">
                            <Link to='/signup' className="hover:text-gray-300">Sign Up</Link>
                        </li>
                    </ul>
                </nav>
            </section>
        )
    }
}
export default Navbar;