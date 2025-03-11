import React, { useState, useEffect } from "react";
import AboutSession from "./AboutSession";
import Correlations from "./Correlations";

export default function Session({ session, tot, onNotesUpdate }) {
  const [edit, setEdit] = useState(false);
  const [notes, setNotes] = useState({});

  // Function to handle notes updates and forward them to parent component
  const handleNotesChange = (updatedNotes) => {
    setNotes(updatedNotes);
    
    // Forward the updated notes to parent component if callback exists
    if (onNotesUpdate) {
      onNotesUpdate(updatedNotes);
    }
  };

  // Handle edit save
  const handleEditSave = (editStatus) => {
    setEdit(editStatus);
    
    // Make sure to send the latest notes when editing is complete
    if (!editStatus && onNotesUpdate) {
      onNotesUpdate(notes);
    }
  };

  return(
    <div>
      <div className="w-11/12 border mx-auto my-5 p-5">
        {!edit && (
          <AboutSession 
            onEdit={handleEditSave} 
            session={session} 
            notes={notes} 
            onNotes={handleNotesChange} 
            tot={tot} 
          />
        )}
        {edit && (
          <Correlations 
            onEdit={handleEditSave} 
            session={session} 
            notes={notes} 
            onNotes={handleNotesChange} 
            tot={tot} 
          />
        )}
      </div>
    </div>
  );
}