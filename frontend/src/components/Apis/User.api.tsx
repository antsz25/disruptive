async function RegisterUser(user:{email:string, password:string, username:string, areCreator:boolean}) {
    try{
        let role = 'user';
        if(user.areCreator){
            role = 'creator'
        }
        const response = await fetch('http://localhost:3000/users/create',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: user.username,
                email: user.email,
                password: user.password,
                role: role
            })
        });
        if (response.headers.get('content-type')?.includes('application/json')) {
            if(response.ok){
                const data = await response.json();
                return data; // Return the JSON data if successful
            }else{
                const text = await response.text(); // Get the response as text
                return { error: text }; // Return an object with the error message
            }
        } else {
            const text = await response.text(); // Get the response as text
            return { error: text }; // Return an object with the error message
        }
    }catch(err){
        return err;
    }
}
async function LoginUser(user:{data:string, password:string}) {
    try{
        const response = await fetch('http://localhost:3000/users/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data: user.data,
                password: user.password,
            }),
            credentials: 'include'
        });
        if(response.ok){
            return response; // Return the JSON data if successful
        }
        else{
            const text = await response.text(); // Get the response as text
            return { error: text }; // Return an object with the error message
        }
    }catch(err){
        return err;
    }
}
async function Logout(set:boolean) {
    const handleLogout = async () => {
        try{
            const response = await fetch('http://localhost:3000/users/logout',{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token') || ''
                },
                credentials: 'include'
            });
            if(response.ok){
                localStorage.removeItem('token');
                document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                return response;
            }
            else{
                console.error(await response.text());
            }
        }catch(err){
            console.error(err);
        }
    }
    if(set){
        try{
           await handleLogout();
        }
        catch(err){
            console.error(err);
        }
    }
}
async function getMe() {
    try {
        const response = await fetch('http://localhost:3000/users/me', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token') || ''
            },
            credentials: 'include'
        });

        if (!response.ok) {
            let text = await response.text();
            if (text === 'Token expired') {
                const refreshTokenResponse:any = await refreshToken();
                if (refreshTokenResponse.ok) {
                    // Recursive call to getMe after token refresh
                    return getMe();
                } else {
                    throw new Error(await refreshTokenResponse.text());
                }
            } else {
                throw new Error(text);
            }
        }

        const result = await response.json();
        return result;
    } catch (err:any) {
        console.error(err.message);
        return null; // Return null if there's an error
    }
}
async function refreshToken(){
    try{
        fetch('http://localhost:3000/users/token',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token') || ''
            },
            credentials: 'include'
        }).then(async (response) =>{
            if(response.ok){
                let result:any = await response.json();
                localStorage.setItem('token', `Bearer: ${result.token}`);
            }
            else{
                console.error(await response.text());
            }
        })
    }catch(err:any){
        console.error(err.message);
    }
}
export { 
    RegisterUser,
    LoginUser,
    Logout,
    getMe,
    refreshToken
};