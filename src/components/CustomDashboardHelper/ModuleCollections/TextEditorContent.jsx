/**
 * Created by Jacob Xie on 4/27/2020.
 */

import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import { Button } from 'antd';
import ContentGenerator from '@/components/CustomDashboardHelper/ModuleCollections/ContentGenerator';
import TextEditorContentDisplayField from './TextEditorContentDisplayField';

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


const InputField = ({onSet, contentData}) => {

  const [contentD, setContentD] = useState(contentData);

  return (
    <div>
      <ReactQuill
        className="text-editor"
        theme="snow"
        modules={modules}
        formats={formats}
        value={contentD}
        onChange={setContentD}
      />
      <Button
        onClick={() => onSet(contentD)}
        size='small'
        type='primary'
      >
        保存
      </Button>
    </div>
  )
};

export const TextEditorContent = ContentGenerator(InputField, TextEditorContentDisplayField);

export default TextEditorContent;
