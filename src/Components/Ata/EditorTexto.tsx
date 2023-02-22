import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function EditorTexto() {





    
  return (
    <div style={{
      width:'100%', margin: 'auto'
    }}>
      <CKEditor
        editor={ClassicEditor}
        data="<p>Hello from CKEditor 5!</p>"
        onChange={(event, editor) => {
          const data = editor.getData();
          console.log({ event, editor, data });
        }}

      />

    </div>
  );
}