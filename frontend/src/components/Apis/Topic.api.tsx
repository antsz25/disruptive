interface Topic {
    name: string;
    formatPermissions: {
        video: boolean;
        text: boolean;
        image: boolean;
    };
    thumbnail: File | string;
}
const AddTopic = async (topic: Topic) => {
    try{
        const response = await fetch('http://localhost:3000/topics/topic', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token') || ''
            },
            credentials: 'include',
            body: JSON.stringify(topic)
        });
        const data = await response.json();
        return data;
    }catch(err:any){
        return JSON.stringify({error: err.message});
    }
}
const RemoveTopic = async(topicId: string) => {
    try{
        const response = await fetch(`http://localhost:3000/topics/topic/${topicId}`, {
            method: 'DELETE',
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
const GetTopics = async() => {
    try{
        const response = await fetch('http://localhost:3000/topics/', {
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
    AddTopic,
    RemoveTopic,
    GetTopics
}