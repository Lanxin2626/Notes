import React from 'react'
import { useState, useEffect } from 'react';
import CreateNote from './CreateNote';
import Note from './Note';
import "../style/Note.css";
import {v4 as uuid} from 'uuid';

 
 export default function Notes() {
    const [notes,setNotes]=useState([]);
    const [inputText,setInputText]=useState("");
    const [loading,setLoading]=useState(true);
    // get text and store in inputText
    const handleText=(e)=>{
        setInputText(e.target.value)
    }
    // add new note
    const addNote =() =>{
        //如果需要再更新state时参考之前的state
        //可以在调用setState时传入一个回调函数，该函数接受之前的state作为参数，返回新的state
        setNotes((preState)=>[
            ...preState,
            {
                id: uuid(),
                text:inputText
            }
        ]);
        // clear textarea
        setInputText("");
    };

    const deleteNote =(id)=>{
        const filteredNotes=notes.filter((note)=>note.id !==id);
        setNotes(filteredNotes);
    }
    useEffect(()=>{
        const data= JSON.parse(localStorage.getItem("Notes"));
        if(Array.isArray(data) && data.length>0){
            setNotes(data);
        }
        setLoading(false);
    },[])

    useEffect(() => {
        if(!loading){
            localStorage.setItem("Notes",JSON.stringify(notes));
        }  
    },[notes,loading]);
    if(loading){
        return <div>loading</div>;
    }

    return (
    <div className='notes'>
        {notes.map((note) => (
        <Note key={note.id}
            id={note.id}
            text={note.text}
            deleteNote={deleteNote}
            />
        ))}
        <CreateNote handleText={handleText} addNote={addNote} inputText={inputText}/>
    </div>
  );
 }
 

