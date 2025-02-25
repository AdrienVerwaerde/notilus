import { useSortable } from '@dnd-kit/sortable';
import React from 'react'
import { Link } from 'react-router-dom'
import { CSS } from "@dnd-kit/utilities";

const NoteItem = ({note, index, isActive}) => {
    const colors = ['var(--color-primary)', 'var(--color-secondary)', 'var(--color-tertiary)', 'var(--color-quatro)'];
    const backgroundColor = colors[index % colors.length];

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: note.id });

    const style = {
        backgroundColor,
        transform: CSS.Transform.toString(transform),
        transition,
        border: isActive ? "2px dotted white" : "none",
    };

    return (
        <Link to={`/edit-note/${note.id}`} className="note" ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <h4>{note.title.length > 50 ? (note.title.substr(0, 50)) + '...' : note.title}</h4>
            <h5 className="note__details">{note.details.length > 80 ? (note.details.substr(0, 80)) + '...' : note.details}</h5>
            <p>{note.date}</p>
        </Link>
    )
}

export default NoteItem
