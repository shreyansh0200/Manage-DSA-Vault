import Editor from "@monaco-editor/react";

function CodeEditor({

    code,

    setCode,

    language

}){

    return(

        <Editor

            height="500px"

            language={language}

            theme="vs-dark"

            value={code}

            onChange={(value)=>setCode(value)}

            options={{

                fontSize:16,

                minimap:{
                    enabled:false
                },

                automaticLayout:true,

                wordWrap:"on"

            }}

        />

    )

}

export default CodeEditor;