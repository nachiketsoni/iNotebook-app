import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";

 const AddNote = (props) => {  
    const context = useContext(NoteContext);   
    const {addNote} = context;
    const [note, setNote] = useState({title: "", description: "", tag: "default"})

    const handleClick = (e) => {
        e.preventDefault();
        console.log("Add Note")
        addNote(note.title, note.description, note.tag);
    }
    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value})
    }
      
    return(
          
            <div className="container my-3">
            <br/><br/>            
            <h1>Add a Note</h1>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} minLength={2} required />
                    
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" onChange={onChange} minLength={2} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} minLength={2} required />
                </div>
                <button disabled={note.title.length < 2 || note.description.length < 2 } type="submit" className="btn btn-primary" onClick={handleClick}> Add Note</button>
                
            </form>

        </div>
        
    )
}

export default  AddNote;