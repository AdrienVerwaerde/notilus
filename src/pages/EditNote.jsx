import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import useCreateDate from '../components/useCreateDate';

const EditNote = ({ notes, setNotes }) => {
    const { id } = useParams();
    const note = notes.find((item) => item.id === id);
    const navigate = useNavigate();
    const [title, setTitle] = useState(note?.title || '');
    const [details, setDetails] = useState(note?.details || '');
    const date = useCreateDate();

    //redirect to homepage if note doesn't exist
    useEffect(() => {
        if (!note) {
            navigate('/');
        }
    }, [note, navigate]);

    const handleForm = (e) => {
        e.preventDefault();

        if (title && details) {
            const newNote = { ...note, title, details, date };
            const newNotes = notes.map(item =>
                item.id === id ? newNote : item
            );
            setNotes(newNotes);
            navigate("/");
        }
    };

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this note?")) {

            const newNotes = notes.filter(item => item.id !== id);
            setNotes(newNotes);
            navigate("/");
        }
    };

    if (!note) return null;

    return (
        <section>
            <header className="create-note__header">
                <Link to="/" className='btn'><IoIosArrowBack /></Link>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="btn danger" onClick={handleDelete}><RiDeleteBin6Line /></button>
                    <button className="btn lg primary" onClick={handleForm}>Save</button>
                </div>
            </header>
            <form className="create-note__form">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    autoFocus
                />
                <textarea
                    rows="28"
                    placeholder="Note details..."
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                />
            </form>
        </section>
    );
};

export default EditNote;
