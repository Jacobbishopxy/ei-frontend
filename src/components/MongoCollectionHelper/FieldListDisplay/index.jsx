/**
 * Created by Jacob Xie on 4/13/2020.
 */

import React from 'react';
import { Button, Card, Space, Tooltip, Modal } from 'antd';
import { ToolOutlined, DeleteOutlined } from '@ant-design/icons';


const onRemoveConfirm = (onRemove) => Modal.confirm({
  title: '确认删除该字段？',
  okType: 'danger',
  onOk: onRemove,
})


const CardExtra = ({canModify, onEdit, onRemove}) => (
  <Space size='small'>
    <Tooltip title='修改'>
      <Button
        shape='circle'
        size='small'
        icon={<ToolOutlined/>}
        onClick={onEdit}
        disabled={!canModify}
      />
    </Tooltip>
    <Tooltip title='删除'>
      <Button
        shape='circle'
        size='small'
        icon={<DeleteOutlined/>}
        onClick={() => onRemoveConfirm(onRemove)}
        disabled={!canModify}
      />
    </Tooltip>
  </Space>
)


const FieldDisplay = ({ifCreate, field, index, onEdit, onRemove}) => {
  const title = `字段序号 ${index + 1}`
  const style = field.indexOption ? {backgroundColor: 'rgba(114, 46, 209, 0.2)'} : {}
  let canModify = true;
  if (!ifCreate) canModify = !field.indexOption

  return (
    <Card
      title={title}
      style={{width: 200, height: 175, ...style}}
      size='small'
      extra={<CardExtra canModify={canModify} onEdit={onEdit} onRemove={onRemove}/>}
    >
      <div>英文字段: {field.fieldName}</div>
      <div>中文别名: {field.nameAlias}</div>
      <div>数据类型: {field.fieldType}</div>
      <div>关键字段: {field.indexOption}</div>
      <div>字段描述: {field.description}</div>
    </Card>
  )
};

export default ({ifCreate, fieldList, onEditField, onRemoveField}) => {
  if (fieldList.length) {
    return (
      <Space>
        {fieldList.map((field, index) => (
          <div key={field.fieldName}>
            <FieldDisplay
              ifCreate={ifCreate}
              field={field}
              index={index}
              onEdit={() => onEditField(index)}
              onRemove={() => onRemoveField(index)}
            />
          </div>
        ))}
      </Space>
    )
  }
  return <div style={{height: 190}}/>
}
