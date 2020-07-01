/**
 * Created by Jacob Xie on 4/27/2020.
 */

import React, { forwardRef, useImperativeHandle, useState } from 'react';
import ReactQuill from 'react-quill';
import { Button } from 'antd';

import 'react-quill/dist/quill.snow.css'

const modules = {
  toolbar: [
    [{'header': [1, 2, 3, 4, 5, 6, false]}],

    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],

    [{'list': 'ordered'}, {'list': 'bullet'}],
    // [{'script': 'sub'}, {'script': 'super'}],
    [{'indent': '-1'}, {'indent': '+1'}],

    [{'color': []}, {'background': []}],
    // [{'align': []}],
    ['link', 'image'],
    ['clean']
  ],
}


const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
  'color', 'background',
  'align',
  'list', 'bullet', 'indent',
  'link', 'image',
];


export const TextEditorContent = forwardRef(({initContent, saveContent, contentStyles}, ref) => {

  const [editable, setEditable] = useState(false);
  const [content, setContent] = useState(initContent.hyperLink);

  const onSave = () => {
    saveContent({hyperLink: content});
    setEditable(false);
  };

  useImperativeHandle(ref, () => ({
    edit: () => setEditable(!editable)
  }));

  return (
    <>
      {
        editable || initContent.hyperLink === '' ?
          <div className="text-editor">
            <ReactQuill
              theme="snow"
              modules={modules}
              formats={formats}
              value={content}
              onChange={setContent}
            />
            <Button
              onClick={onSave}
              size='small'
            >
              保存
            </Button>
          </div> :
          <div className={contentStyles} dangerouslySetInnerHTML={{__html: content}}/>
      }
    </>
  )
});

export default TextEditorContent;
