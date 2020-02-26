import React from 'react';
import { Table, Input, Button, Popconfirm, Form, Tag, DatePicker } from 'antd';
import styles from './index.less';

const { RangePicker } = DatePicker;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  state = {
    editing: false,
  };

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState(
      {
        editing,
      },
      () => {
        if (editing) {
          this.input.focus();
        }
      },
    );
  };

  save = e => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }

      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  };

  renderCell = form => {
    this.form = form;
    const { children, dataIndex, record, title } = this.props;
    const { editing } = this.state;
    return editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
      >
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: `${title} is required.`,
            },
          ],
          initialValue: record[dataIndex],
        })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={this.toggleEdit}
      >
        {children}
      </div>
    );
  };

  render() {
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
          children
        )}
      </td>
    );
  }
}

class EditableTable extends React.Component {
  constructor(props) {
    super(props);

    this.columns = [
      {
        title: '日期',
        dataIndex: 'date',
        width: '10%',
        editable: true,
      },
      {
        title: '地区',
        dataIndex: 'region',
        editable: true,
      },
      {
        title: '水泥价格',
        dataIndex: 'price',
        editable: true,
      },
      {
        title: '水泥库存',
        dataIndex: 'stock',
        editable: true,
      },
      {
        title: '水泥出货',
        dataIndex: 'shipment',
        editable: true,
      },
      {
        title: '水泥产量',
        dataIndex: 'production',
        editable: true,
      },
      {
        title: '熟料价格',
        dataIndex: 'clinkerPrice',
        editable: true,
      },
      {
        title: '熟料库存',
        dataIndex: 'clinkerStock',
        editable: true,
      },
      {
        title: '熟料产量',
        dataIndex: 'clinkerProduction',
        editable: true,
      },
      {
        title: '粉磨开工率',
        dataIndex: 'grindingCapacity',
        editable: true,
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        render: (text, record) =>
          this.state.dataSource.length >= 1 ? (
            <div>
              <Tag color="red">
                <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                  Delete
                </Popconfirm>
              </Tag>
            </div>
          ) : null,
      },
    ];
    this.state = {
      dataSource: [
        {
          key: '0',
          date: '20190101',
          region: '华南',
          price: 5,
          stock: 2,
          shipment: 3,
          production: 3,
          clinkerPrice: 10,
          clinkerStock: 1000,
          clinkerProduction: 2,
          grindingCapacity: 0.5,
        },
        {
          key: '1',
          date: '20190101',
          region: '华北',
          price: 5,
          stock: 2,
          shipment: 3,
          production: 3,
          clinkerPrice: 10,
          clinkerStock: 1000,
          clinkerProduction: 2,
          grindingCapacity: 0.5,
        },
      ],
      count: 2,
    };
  }

  handleDelete = key => {
    const dataSource = [...this.state.dataSource];
    this.setState({
      dataSource: dataSource.filter(item => item.key !== key),
    });
  };

  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      name: `Edward King ${count}`,
      age: 32,
      address: `London, Park Lane no. ${count}`,
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  };

  handleSave = row => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    this.setState({
      dataSource: newData,
    });
  };

  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div>
        <RangePicker size="small" />
        <Button
          onClick={this.handleAdd}
          type="primary"
          size="small"
          style={{
            marginLeft: 8,
            marginBottom: 16,
          }}
        >
          新增数据
        </Button>
        <Button
          onClick={e => console.log(e)}
          type="primary"
          size="small"
          style={{
            marginLeft: 8,
            marginBottom: 16,
          }}
        >
          确认上传
        </Button>
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          size="small"
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    );
  }
}

export default () => (
  <div className={styles.container}>
    <div id="components-table-demo-edit-cell">
      <EditableTable />
    </div>
  </div>
);
