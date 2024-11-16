import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const [items, setItems] = useState([]);
  const getUser = async () => {
    const email = "hassan@gmail.com";
    const password = "H@1234";
    const url = "http://localhost:5000/api/auth/login/";
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      console.log("Data is not received yet");

      const json = await res.json();
      console.log(json);
    } catch (error) {}
  };
  const getNote = async () => {
    try {
      console.log("GET NOTE");
      const url = "http://localhost:5000/api/note/67305bfd880445e1f3364064";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3Mzc0NjkwODVjNWI4MmFiMjdkMGI5YyIsImlhdCI6MTczMTY3NTc5Mn0.GXLMwP-Mj4AgJgn3WT8YI9FpsEVITesFqj7P6Jx47wA",
        },
      });
      const json = await response.json();
      console.log(json);
      setItems(json);
    } catch (error) {
      console.log("Eroor: ", error);
    }
  };
  const getNotes = async () => {
    try {
      const url = "http://localhost:5000/api/note/allnotes/";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3Mzc0NjkwODVjNWI4MmFiMjdkMGI5YyIsImlhdCI6MTczMTY3NTc5Mn0.GXLMwP-Mj4AgJgn3WT8YI9FpsEVITesFqj7P6Jx47wA",
        },
      });
      const json = await response.json();
      setItems(json);
    } catch (error) {
      console.log("Eroor: ", error);
    }
  };
  const deleteNote = async (id) => {
    const url = `http://localhost:5000/api/note/deletenote/${id}`;
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3Mzc0NjkwODVjNWI4MmFiMjdkMGI5YyIsImlhdCI6MTczMTY3NTc5Mn0.GXLMwP-Mj4AgJgn3WT8YI9FpsEVITesFqj7P6Jx47wA",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const addNote = async (title, description, tag) => {
    const url = "http://localhost:5000/api/note/createnote";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3Mzc0NjkwODVjNWI4MmFiMjdkMGI5YyIsImlhdCI6MTczMTY3NTc5Mn0.GXLMwP-Mj4AgJgn3WT8YI9FpsEVITesFqj7P6Jx47wA",
        },
        body: JSON.stringify({ title, description, tag }),
      });
      const json = response.json();
    } catch (error) {
      console.log(error);
    }
  };
  const editNote = async (id, title, description, tag) => {
    const url = `http://localhost:5000/api/note/updatenote/${id}`;
    console.log("id: ", id);
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3Mzc0NjkwODVjNWI4MmFiMjdkMGI5YyIsImlhdCI6MTczMTY3NTc5Mn0.GXLMwP-Mj4AgJgn3WT8YI9FpsEVITesFqj7P6Jx47wA",
        },
        body: JSON.stringify({ title, description, tag }),
      });
      const json = response.json();
      for (let index = 0; index < items.length; index++) {
        let element = items[index];
        if (element.id === id) {
          element.title = title;
          element.description = description;
          element.tag = tag;
          break;
        }
      }
      setItems(items);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <NoteContext.Provider
      value={{
        items,
        setItems,
        getNotes,
        getNote,
        getUser,
        deleteNote,
        addNote,
        editNote,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
