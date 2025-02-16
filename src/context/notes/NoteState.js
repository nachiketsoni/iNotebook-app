import React, { useState } from "react";
import NoteContext from "./NoteContext";


const NoteState = (props) => {
  const host = "http://localhost:5000"

  const notesInitial = [ ]

  const [notes, setNotes] = useState(notesInitial)

  // Get all Notes
  const getNotes = async () => {
    // Fetch API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      // host mentione din ThCl has been declared above 
      method: 'GET', 
      mode: 'cors',
      headers: {
        // the headers we require in Fetch Notes request
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlNGZlNDEwYWNjMzYzODM4ZTY1NTdjIn0sImlhdCI6MTY3Njg4MzU0MH0.iZuS9gtRpJTGZAGSUQhDdv1WXdWjJ6RBuqqUE1Bn8ek"
        // Here, hardcoding auth-token - of the user whose notes to be fetched as login hasn't been implemented yet        
      }          
    });
    const json = await response.json();
    console.log(json) 
    setNotes(json)
  }

  // Add a Note
  const addNote = async (title, description, tag) => {
    //  API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      // host mentioned in ThCl has been declared above 
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlNGZlNDEwYWNjMzYzODM4ZTY1NTdjIn0sImlhdCI6MTY3Njg4MzU0MH0.iZuS9gtRpJTGZAGSUQhDdv1WXdWjJ6RBuqqUE1Bn8ek"
        // the headers we require in Add Note request
      },    
      body: JSON.stringify({title, description, tag}) 
    });

    console.log("adding a new note")
    const note = await response.json(); 
      // setNotes(notes.push(note))
      setNotes(notes.concat(note))
      console.log("new note : ", note ) 
    }    
    
  

  // Delete a Note
  const deleteNote = async (id) => {

    // Fetch API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      // host mentione din ThCl has been declared above 
      method: 'DELETE', 
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlNGZlNDEwYWNjMzYzODM4ZTY1NTdjIn0sImlhdCI6MTY3Njg4MzU0MH0.iZuS9gtRpJTGZAGSUQhDdv1WXdWjJ6RBuqqUE1Bn8ek"
        // the headers we require in Update Note request
      }
    });
    const json = response.json(); 
    console.log(json)

    console.log("Deleting the note with id " + id);
    const newNotes = notes.filter((note)=> {return note._id!==id})
    setNotes(newNotes)
  }

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // Fetch API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      // host mentione din ThCl has been declared above 
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlNGZlNDEwYWNjMzYzODM4ZTY1NTdjIn0sImlhdCI6MTY3Njg4MzU0MH0.iZuS9gtRpJTGZAGSUQhDdv1WXdWjJ6RBuqqUE1Bn8ek"
        // the headers we require in Update Note request
      },    
      body: JSON.stringify({title, description, tag}) 
    });
    const json = await response.json(); 
    console.log(json);

    // console.log(JSON.stringify(notes))
    // Logic to edit on client side (UI)
    let newNotes = JSON.parse(JSON.stringify(notes))

    for (let index = 0; index < newNotes.length; index++ ){
      const element = newNotes[index];
      if(element._id === id){
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
        
  }

  return (
    
    <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
      {props.children}
    </NoteContext.Provider>
  );
}

export default NoteState;
