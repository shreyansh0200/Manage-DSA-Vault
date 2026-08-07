function NotesEditor({

    notes,

    setNotes

}){

    return(

        <textarea

            className="notes"

            value={notes}

            onChange={(e)=>setNotes(e.target.value)}

            placeholder="Write your observations..."

        />

    )

}

export default NotesEditor;