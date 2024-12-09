import React from 'react'
import { Link } from 'react-router-dom'

const NoteItem = ({note, index}) => {
    const colors = ['#4d238d', '#234f8d', '#238d61'];
    const backgroundColor = colors[index % colors.length];

    return (
        <Link to={`/edit-note/${note.id}`} className="note" style={{backgroundColor}}>
            <h4>{note.title.length > 50 ? (note.title.substr(0, 50)) + '...' : note.title}</h4>
            <p>{note.date}</p>
        </Link>
    )
}

export default NoteItem