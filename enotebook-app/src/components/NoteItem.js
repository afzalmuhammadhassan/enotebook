import React, { useContext } from "react";
import NoteContext from "../contexts/noteContext";

export default function NoteItem(props) {
  const { deleteNote } = useContext(NoteContext);
  const removeNote = (id) => {
    deleteNote(id);
  };
  const modaldisplay = (note) => {
    const data = props.modal(note);
    console.log("data: ", data);
  };
  return (
    <div className="col-md-4 my-2">
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <div className="d-flex justify-content-end">
            <i
              className="fa-solid fa-pen-to-square mx-1"
              onClick={() => modaldisplay(props)}
            ></i>
            <i
              className="fa-solid fa-trash mx-1"
              onClick={() => removeNote(props.id)}
            ></i>
          </div>
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">{props.description}</p>
          <h6 className="card-title">{props.tag}</h6>
        </div>
      </div>
    </div>
  );
}
