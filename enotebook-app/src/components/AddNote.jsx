import React, { useContext, useState } from "react";
import NoteContext from "../contexts/noteContext";

export default function AddNote() {
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const { addNote } = useContext(NoteContext);
  const newNote = (e) => {
    const { title, description, tag } = note;
    e.preventDefault();
    addNote(title, description, tag);
    setNote({ title: "", description: "", tag: "" });
  };
  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={note.title}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={note.description}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            value={note.tag}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={newNote}>
          Submit
        </button>
      </form>
    </div>
  );
}
