async function GetPhoto200x300(){
    try{
        return await fetch('https://picsum.photos/200/300').then(response => response.url);
    }catch(error){
        console.error(error);
        throw error;
    }
}
export default GetPhoto200x300;