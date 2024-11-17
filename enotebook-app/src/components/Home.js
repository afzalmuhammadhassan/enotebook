import React, { useContext, useEffect, useRef, useState } from "react";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import NoteContext from "../contexts/noteContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const modal_ref = useRef(null);
  const showModal = (eNote) => {
    const { id, title, description, tag } = eNote;
    setNote({ ...note, id, title, description, tag });
    modal_ref.current.click();
  };
  const { items, getNotes, setItems } = useContext(NoteContext);
  useEffect(() => {
    if (!localStorage.getItem("auth-token")) {
      console.log(localStorage.getItem("auth-token"));
      navigate("/login");
    }
    getNotes();
  }, []);
  const [note, setNote] = useState({
    id: "",
    title: "",
    description: "",
    tag: "",
  });
  const { editNote } = useContext(NoteContext);
  const updateNote = (e) => {
    const { id, title, description, tag } = note;
    e.preventDefault();
    editNote(id, title, description, tag);
    console.log("note: ", note);
    return note;
  };
  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={modal_ref}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={updateNote}>
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
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="submit"
                data-bs-dismiss="modal"
                className="btn btn-primary"
                onClick={updateNote}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
      <h1>Add new Item</h1>
      <AddNote />
      <h1 className="my-2">All Notes</h1>
      {items.length === 0 && <h3>No Notes Found</h3>}
      <div className="row">
        {items.map((item) => {
          return (
            <NoteItem
              key={item._id}
              id={item._id}
              tag={item.tag}
              title={item.title}
              modal={showModal}
              description={item.description}
            />
          );
        })}
      </div>
    </>
  );
}
