import React,{ useEffect, useState } from 'react';
import { GetContentByUser } from '../../../Apis/Content.api';
import Modal from './contentModal.component';
interface Content{
    title: string,
    author: string,
    topic: string,
    url: string,
    createdAt: Date,
    type: string
}
const ContentUploaded:React.FC =() => {
    const [error, setError] = useState('');
    const [content, setContent] = useState<Content[]>([]);
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };
    const handleSubmit = async (e:any) => {
        e.preventDefault();
    }
    const fetchContent = async () => {
        try{
            const data = await GetContentByUser();
            setContent(data);
        }catch(err:any){
            setError(err.message);
        }
    }
    useEffect(()=>{
        fetchContent();
    },[]);
    return (
        <>
            <div className="bg-mine-shaft justify-center m-auto min-h-[500px] min-w-[720px]  order-2">
                <h1 className="text-3xl text-center text-cornflower font-semibold leading-loose">Content uploaded</h1>
                <div className="flex flex-col space-y-4 p-4">
                    <form className="flex flex-col space-y-4 justify-end" onSubmit={handleSubmit}>
                    {content && content.map((item, index) => (
                        <div key={index} className="border p-4 rounded-md">
                            <h3>{item.title}</h3>
                            <p>Author: {item.author}</p>
                            <p>Topic: {item.topic}</p>
                            <p>Type: {item.type}</p>
                            <p>Created At: {item.createdAt.toString()}</p>
                            <a href={item.url} target="_blank" rel="noopener noreferrer">View Content</a>
                        </div>
                    ))}
                    <button 
                    type="submit" 
                    className="bg-mine-shaft border-2 border-white text-white p-2 rounded-md transition-colors hover:bg-white hover:text-mine-shaft active:bg-boulder active:text-scorpion"
                    onClick={handleOpenModal}
                    >
                    Update
                    </button>
                    <Modal isOpen={showModal} onClose={handleCloseModal}>
                    </Modal>
                    {error && <p className="text-red-500">{error}</p>}
                    </form>
                </div>
            </div>
        </>
    )
}
export default ContentUploaded;