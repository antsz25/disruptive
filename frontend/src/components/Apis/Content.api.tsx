async function GetContents(){
    const response = await fetch('http://localhost:3000/contents/',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token') || ''
        },
        credentials: 'include'
    });
    const data = await response.json();
    return data;
}
async function GetContentByUser(){
    try{
        const response = await fetch('http://localhost:3000/contents/me',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token') || ''
            },
            credentials: 'include'
        });
        const data = await response.json();
        return data;
    }catch(err:any){
        return JSON.stringify({error: err.message});
    }
}
export {
    GetContents,
    GetContentByUser
}