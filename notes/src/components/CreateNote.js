import React from 'react'
import LinearProgress from '@mui/material/LinearProgress';

export default function CreateNote({handleText,addNote,inputText}) {
  const charLimit=100;
  const charLeft=charLimit - inputText.length;
  return (
    <div className='note'>
        <textarea cols={10} rows={5} value={inputText} placeholder='Type...' maxLength={charLimit}
        onChange={handleText}></textarea>
        <div className='note__footer'>
            <span className='label'>{charLeft}</span>
            <button className='note__save' onClick={addNote}>Save</button>
        </div>
        <LinearProgress 
        className='char_progress'
        variant='determinate'
        value={charLeft}/>
    </div>
  )
}

