import React, { useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Content {
  title: string;
  author: string;
  topic: string;
  url: string;
  type: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose}) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [topic, setTopic] = useState('');
  const [url, setUrl] = useState('');
  const [type, setType] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !author || !topic || !url || !type) {
      setError('Please fill in all fields');
      return;
    }

    setTitle('');
    setAuthor('');
    setTopic('');
    setUrl('');
    setType('');
    setError('');
    onClose();
  };


  return (
    <>
      {isOpen && (
        <div className={`${isOpen ? 'display: block':'display: none'} fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-tundora p-[20px] z-[1000]`}>
          <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-mine-shaft border-2 border-white text-white p-2 rounded-md transition-colors hover:bg-white hover:text-mine-shaft active:bg-boulder active:text-scorpion"
            >
              Create Content
            </button>
            <button
                type="submit"
                className="bg-mine-shaft border-2 border-white text-white p-2 rounded-md transition-colors hover:bg-white hover:text-mine-shaft active:bg-boulder active:text-scorpion"
                onClick={onClose}
            >
              Cancel
            </button>
            {error && <p className="text-red-500">{error}</p>}
          </form>
        </div>
      )}
    </>
  );
};

export default Modal;
