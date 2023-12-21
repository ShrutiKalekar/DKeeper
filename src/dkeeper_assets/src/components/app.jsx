import React, { useEffect, useState } from "react";
import Header from "./header";
import Footer from "./footer";
import Note from "./note";
import CreateArea from "./createArea";
import { dkeeper } from "../../../declarations/dkeeper";

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes(prevNotes => {
      dkeeper.createNote(newNote.title, newNote.content)
      return [newNote, ...prevNotes];
    });
  }

  useEffect(() => {
    fetchData();
  },[]);

  async function fetchData() {
    const notesArray = await dkeeper.readNotes();
    setNotes(notesArray);
  }

  function deleteNote(id) {
    dkeeper.deleteNote(id);
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
