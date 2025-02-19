import React, { useEffect, useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { BsPlusLg } from "react-icons/bs";
import NoteItem from '../components/NoteItem';
import { MdClose } from "react-icons/md";
import logo from "../assets/logo.png";


const Notes = ({ notes }) => {
    const [showSearch, setShowSearch] = useState(false);
    const [text, setText] = useState('');
    const [filteredNotes, setFilteredNotes] = useState(notes);

    const handleSearch = () => {
        setFilteredNotes(notes.filter(note => {
            if (note.title.toLowerCase().match(text.toLocaleLowerCase())) {
                return note;
            }
        }))
    }

    useEffect(handleSearch, [text]);

    return (
        <section>
            <header className="notes__header">
                {!showSearch && <img src={logo} className='logo' />}
                {showSearch && <input type="text" value={text} onChange={(e) => { setText(e.target.value); handleSearch(); }} autoFocus placeholder="Keyword..." />}
                <button
                    className="btn"
                    onClick={() => {
                        if (showSearch) {
                            setText('');
                            setFilteredNotes(notes);
                        }
                        setShowSearch(prevState => !prevState);
                    }}
                >
                    {showSearch ? <MdClose /> : <CiSearch />}
                </button>
            </header>

            <div className="notes__container">
                {filteredNotes.length === 0 && <p className='empty__notes'>No notes found</p>}
                {
                    filteredNotes.map((note, index) => <NoteItem key={note.id} note={note} index={index} />)
                }
            </div>
            <Link to={'/create-note'} className='btn add__btn'><BsPlusLg /></Link>
        </section>
    )
}

export default Notes
