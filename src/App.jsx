import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Notes from './pages/Notes';
import CreateNote from './pages/CreateNote';
import EditNote from './pages/EditNote';


const App = () => {
    const [notes, setNotes] = useState(() => {
        const storedNotes = localStorage.getItem('notes');
        return storedNotes ? JSON.parse(storedNotes) : [];
    });

    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes));
    }, [notes])
    console.log(notes);

    return (
        <main id="app">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Notes notes={notes} setNotes={setNotes}/>} />
                    <Route path="/create-note" element={<CreateNote setNotes={setNotes} />} />
                    <Route path="/edit-note/:id" element={<EditNote notes={notes} setNotes={setNotes} />} />
                </Routes>
            </BrowserRouter>
        </main>
    )
}

export default App