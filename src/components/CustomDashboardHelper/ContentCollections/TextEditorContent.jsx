/**
 * Created by Jacob Xie on 4/27/2020.
 */

import React, { useState } from 'react';
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css'

const modules = {
  toolbar: [
    [{'header': [1, 2, 3, 4, 5, 6, false]}],

    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],

    [{'list': 'ordered'}, {'list': 'bullet'}],
    [{'script': 'sub'}, {'script': 'super'}],
    [{'indent': '-1'}, {'indent': '+1'}],

    [{'color': []}, {'background': []}],
    [{'align': []}],
    ['link', 'image'],
    ['clean']
  ],
}


const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote', 'align', 'color', 'background',
  'list', 'bullet', 'indent',
  'link', 'image',
];


export const TextEditorContent = () => {

  const [content, setContent] = useState('');

  return (
    <div className="text-editor">
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        value={content}
        onChange={setContent}
      />
    </div>
  )
};

export default TextEditorContent;
