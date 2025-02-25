import React, { useEffect, useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { BsPlusLg } from "react-icons/bs";
import NoteItem from '../components/NoteItem';
import { MdClose } from "react-icons/md";
import logo from "../assets/logo.png";

import { DndContext, TouchSensor, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useSensor, useSensors, PointerSensor, KeyboardSensor } from "@dnd-kit/core";


const Notes = ({ notes, setNotes }) => {
    const [showSearch, setShowSearch] = useState(false);
    const [text, setText] = useState('');
    const [filteredNotes, setFilteredNotes] = useState(notes);
    const [activeNoteId, setActiveNoteId] = useState(null);

    const handleSearch = () => {
        setFilteredNotes(notes.filter(note => {
            if (note.title.toLowerCase().match(text.toLocaleLowerCase())) {
                return note;
            }
        }))
    }

    useEffect(handleSearch, [text]);


    // DRAG N DROP FUNCTIONNALITY //
    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { delay: 300, tolerance: 5 } }),
        useSensor(TouchSensor, { activationConstraint: { delay: 300, tolerance: 5 } }),
        useSensor(KeyboardSensor, {coordinateGetter: sortableKeyboardCoordinates})
    );

    const handleDragStart = (event) => {
        setActiveNoteId(event.active.id);
        document.body.style.overflow = 'hidden';
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (!over || active.id === over.id) {
            setActiveNoteId(null);
            document.body.style.overflow = 'hidden';
            return;
        }
        const oldIndex = notes.findIndex(note => note.id === active.id);
        const newIndex = notes.findIndex(note => note.id === over.id);
        const newNotes = arrayMove(notes, oldIndex, newIndex);

        setNotes(newNotes);
        setFilteredNotes(newNotes);
        setActiveNoteId(null);
        document.body.style.overflow = '';
    };

    const handleDragMove = (event) => {
        const { clientY } = event.activatorEvent.touches ? event.activatorEvent.touches[0] : event.activatorEvent;
        const scrollThreshold = 50;
        const scrollSpeed = 10;

        if (clientY < scrollThreshold) {
            window.scrollBy({ top: -scrollSpeed, behavior: "smooth" });
        } else if (window.innerHeight - clientY < scrollThreshold) {
            window.scrollBy({ top: scrollSpeed, behavior: "smooth" });
        }
    };

    // -------------------- //

    return (
        <section>
            <header className="notes__header">
                {!showSearch && <img src={logo} className='logo' />}
                {showSearch && <input type="text" value={text} onChange={(e) => setText(e.target.value)} autoFocus placeholder="Keyword..." />}
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

            {/* Drag and Drop Context */}
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragMove={handleDragMove}
                onDragEnd={handleDragEnd}
            >
                <SortableContext items={filteredNotes.map(note => note.id)} strategy={verticalListSortingStrategy}>
                    <div className="notes__container">
                        {filteredNotes.length === 0 && <p className='empty__notes'>No notes found</p>}
                        {filteredNotes.map((note, index) => (
                            <NoteItem key={note.id} note={note} index={index} isActive={note.id === activeNoteId} />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>

            <Link to={'/create-note'} className='btn add__btn'><BsPlusLg /></Link>
        </section>
    );
};

export default Notes;