import React, { useState, useEffect } from 'react';

interface UserData {
    username: string;
    role: string;
}

interface ProfileProps {
    data: UserData;
    setShowContent: React.Dispatch<React.SetStateAction<boolean>>;
}

const Profile: React.FC<ProfileProps> = ({ data, setShowContent}) => {
    const [formData, setFormData] = useState({
        username: data.username,
        areCreator: data.role === 'creator',
    });
    useEffect(() => {
        // Update form data when props change
        setFormData({
            username: data.username,
            areCreator: data.role === 'creator' ? true : false,
        });
    }, [data]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let role:string = '';
        if (formData.areCreator) {
            role = 'creator';
        } else {
            role = 'user';
        }
        // Send form data to the server
        const request = await fetch('http://localhost:3000/users/user/'+formData.username,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token') || ''
            },
            credentials: 'include',
            body: JSON.stringify({role: role})
        });
        const response = await request.json();
        if(response){
            setShowContent(formData.areCreator);
        }
    };


    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === 'areCreator' ? checked : value,
        }));
    };

    return (
        <div className="bg-mine-shaft justify-center m-auto min-h-[500px] min-w-[720px] order-2">
            <h1 className="text-3xl text-center text-cornflower font-semibold leading-loose">Profile</h1>
            <div className="flex flex-col space-y-4 p-4">
                <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                    <div className = "space-y-32">
                        <label htmlFor="areCreator" className="text-lg">Are you a creator?</label>
                        <input
                            type="checkbox"
                            id="areCreator"
                            className="mx-4 p-2 border-2 text-tundora border-mine-shaft rounded-md"
                            checked={formData.areCreator}
                            onChange={handleOnChange}
                            name="areCreator"
                        />
                    </div>
                    <button type="submit" className="bg-mine-shaft border-2 border-white text-white p-2 rounded-md transition-colors hover:bg-white hover:text-mine-shaft active:bg-boulder active:text-scorpion">Update</button>
                </form>
            </div>
        </div>
    );
};

export default Profile;
