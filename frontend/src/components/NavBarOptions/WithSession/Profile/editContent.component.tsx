import React, { useState } from 'react';
import { useEffect } from 'react';
import { getMe } from '../../../Apis/User.api';
import {RemoveTopic,AddTopic,GetTopics} from '../../../Apis/Topic.api'

interface Content {
    title: string;
    author: string;
    topic: string;
    url: string;
    createdAt: Date;
    type: string;
}

interface Topic {
    name: string;
    formatPermissions: {
        video: boolean;
        text: boolean;
        image: boolean;
    };
    thumbnail: File | string;
}
const AdminPanel: React.FC = () => {
    const [topics, setTopics] = useState<Topic[]>([]);
    const [contents, setContents] = useState<Content[]>([]);
    const [newTopic, setNewTopic] = useState<Topic>({
        name: '',
        formatPermissions: {
            video: false,
            image: false,
            text: false,
        },
        thumbnail: '',
    });
    const AddTopicAsync:any = async (topic: Topic) => {
        try{
            const request = await AddTopic(topic);
            return request.json();
        }catch(err:any){
            console.error(err.message); 
        }
    }
    const DeleteTopicAsync:any = async(name: string) => {
        try{
            const request = await RemoveTopic(name);
            return request.json();
        }catch(err:any){
            console.error(err.message);
        }
    }
    const FetchTopicsAsync:any = async() => {
        try{
            const request = await GetTopics();
            setTopics(request);
        }catch(err:any){
            console.error(err.message);
        }
    }
    const [errors, setErrors] = useState<{error:string,message:string}>({error:'', message:''});
    const [newContent, setNewContent] = useState<Content>({
        title: '',
        author: '',
        topic: '',
        url: '',
        createdAt: new Date(),
        type: '',
    });

    const handleAddTopic = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const newTopicObj: Topic = {
                name: newTopic.name,
                formatPermissions: {
                    video: newTopic.formatPermissions.video,
                    image: newTopic.formatPermissions.image,
                    text: newTopic.formatPermissions.text,
                },
                thumbnail: newTopic.thumbnail instanceof File ? URL.createObjectURL(newTopic.thumbnail) : newTopic.thumbnail,
            };
            if (!newTopic.name.trim()) {
                setErrors({ error: 'No name', message: 'Please enter a name for the topic' });
                return;
            }
            if (!newTopic.thumbnail) {
                setErrors({ error: 'No thumbnail', message: 'Please upload a thumbnail' });
                return;
            }
            AddTopicAsync(newTopicObj);
            setTopics([...topics, newTopicObj]);
            setNewTopic({
                name: '',
                formatPermissions: {
                    video: false,
                    image: false,
                    text: false,
                },
                thumbnail: '',
            });
        } catch (err:any) {
            console.error(err.message);
        }
    };

    const handleDeleteTopic = (index: number) => {
        DeleteTopicAsync(topics[index].name);
        const updatedTopics = [...topics];
        updatedTopics.splice(index, 1);
        setTopics(updatedTopics);
    };

    const handleAddContent = () => {
        if (newContent.title.trim() !== '' && newContent.topic.trim() !== '') {
            setContents([...contents, newContent]);
            setNewContent({
                title: '',
                author: '',
                topic: '',
                url: '',
                createdAt: new Date(),
                type: '',
            });
        }
    };

    const handleDeleteContent = (index: number) => {
        const updatedContents = [...contents];
        updatedContents.splice(index, 1);
        setContents(updatedContents);
    };
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        FetchTopicsAsync();
        setLoading(true);
    }, []);
    return (
        <div className="flex flex-col md:flex-row gap-8 my-10">
            <div className="w-full md:w-1/3 bg-mine-shaft p-4 rounded-md">
                <h2 className="text-lg text-royal-blue font-bold mb-4">Topics</h2>
                <form onSubmit={handleAddTopic}>
                    <input
                        type="text"
                        value={newTopic.name}
                        onChange={(e) => setNewTopic({ ...newTopic, name: e.target.value })}
                        placeholder="Enter new topic name"
                        className="border text-tundora border-gray-400 p-2 mb-2 rounded-md w-full"
                    />
                    <label htmlFor="thumbnail" className="text-grayprop">Thumbnail</label>
                    <input
                        type="file"
                        id="thumbnail"
                        accept="image/*"
                        onChange={(e) => setNewTopic({ ...newTopic, thumbnail: e.target.files?.[0] || '' })}
                        className="border text-grayprop border-gray-400 p-2 mb-2 rounded-md w-full"
                    />
                    <label className="text-grayprop">Format Permissions</label>
                    <div className="flex justify-between items-center">
                        <label htmlFor="video" className="text-grayprop">Video</label>
                        <label htmlFor="image" className="text-grayprop">Image</label>
                        <label htmlFor="text" className="text-grayprop">Text</label>
                    </div>
                    <div className="flex justify-between items-center">
                        <input
                            type="checkbox"
                            id="video"
                            checked={newTopic.formatPermissions.video}
                            onChange={(e) => setNewTopic({ ...newTopic, formatPermissions: { ...newTopic.formatPermissions, video: e.target.checked } })}
                            className="border text-tundora border-gray-400 p-2 mb-2 rounded-md"
                        />
                        <input
                            type="checkbox"
                            id="image"
                            checked={newTopic.formatPermissions.image}
                            onChange={(e) => setNewTopic({ ...newTopic, formatPermissions: { ...newTopic.formatPermissions, image: e.target.checked } })}
                            className="border text-tundora border-gray-400 p-2 mb-2 rounded-md"
                        />
                        <input
                            type="checkbox"
                            id="text"
                            checked={newTopic.formatPermissions.text}
                            onChange={(e) => setNewTopic({ ...newTopic, formatPermissions: { ...newTopic.formatPermissions, text: e.target.checked } })}
                            className="border text-tundora border-gray-400 p-2 mb-2 rounded-md"
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md mb-2">
                        Add Topic
                    </button>
                    {errors && <p className="text-red-500">{errors.message}</p>}
                </form>
                <ul>
                    {topics.map((topic, index) => (
                        <li key={topic.name} className="flex justify-between items-center border border-gray-400 p-2 rounded-md mb-2">
                            <span>{topic.name} - Permissions - {`${topic.formatPermissions.video ? 'Video' : ''} ${topic.formatPermissions.image ? 'Image' : ''} ${topic.formatPermissions.text ? 'Text' : ''}`}</span>
                            {topic.thumbnail && (
                                <img src={topic.thumbnail} alt="Thumbnail" className="max-w-[50px] max-h-[50px]" />
                            )}
                            <button onClick={() => handleDeleteTopic(index)} className="text-red-500">Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="w-full md:w-2/3 bg-mine-shaft p-4 rounded-md">
                <h2 className="text-lg font-semibold mb-4">Contents</h2>
                <input
                    type="text"
                    value={newContent.title}
                    onChange={(e) => setNewContent({ ...newContent, title: e.target.value })}
                    placeholder="Title"
                    className="border text-tundora border-gray-400 p-2 mb-2 rounded-md w-full"
                />
                <input
                    type="text"
                    value={newContent.author}
                    onChange={(e) => setNewContent({ ...newContent, author: e.target.value })}
                    placeholder="Author"
                    className="border text-tundora border-gray-400 p-2 mb-2 rounded-md w-full"
                />
                <input
                    type="text"
                    value={newContent.topic}
                    onChange={(e) => setNewContent({ ...newContent, topic: e.target.value })}
                    placeholder="Topic"
                    className="border text-tundora border-gray-400 p-2 mb-2 rounded-md w-full"
                />
                <input
                    type="text"
                    value={newContent.url}
                    onChange={(e) => setNewContent({ ...newContent, url: e.target.value })}
                    placeholder="URL"
                    className="border text-tundora border-gray-400 p-2 mb-2 rounded-md w-full"
                />
                <input
                    type="text"
                    value={newContent.type}
                    onChange={(e) => setNewContent({ ...newContent, type: e.target.value })}
                    placeholder="Type"
                    className="border text-tundora border-gray-400 p-2 mb-2 rounded-md w-full"
                />
                <button onClick={handleAddContent} className="bg-blue-500 text-white py-2 px-4 rounded-md mb-2">
                    Add Content
                </button>
                <ul>
                    {contents.map((content, index) => (
                        <li key={index} className="flex justify-between items-center border border-gray-400 p-2 rounded-md mb-2">
                            <span>Title: {content.title} - Topic: {content.topic} - Author: {content.author} - Content: {content.type} - Created At: {content.createdAt.toDateString()}</span>
                            <button onClick={() => handleDeleteContent(index)} className="text-red-500">Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AdminPanel;
