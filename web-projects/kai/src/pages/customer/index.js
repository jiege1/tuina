import React from 'react';
import { Card, Table, Divider, Select, InputNumber, Popconfirm, Modal, Form, Input, DatePicker, message } from 'antd';
import {connect} from 'react-redux';
import {queryList, addCustomer} from 'reducers/customerPage';
import moment from 'moment';
import SearchBar from 'components/searchBar';
import css from './index.less';
const {Item: FormItem, create: createForm} = Form;
const {Option} = Select;

const mapStateToProps = (state) => {
  const { customerPage } = state;
  return {customerPage};
};

@createForm()
@connect(mapStateToProps, {queryList})
export default class Customer extends React.Component {

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      editId: null,
    };
  }

  componentDidMount() {
    const {list} = this.props.customerPage;
    if (!list.length) {
      this.queryList({});
    }

  }

  get formValues() {
    let result = null;
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        result = values;
      }
    });

    return result;
  }

  set formValues(values) {
    this.props.form.setFieldsValue(values);
  }

  queryList({pageNum, pageSize, name, sex}) {
    const {customerPage} = this.props;
    this.props.queryList({
      pageNum: pageNum || customerPage.pageNum,
      pageSize: pageSize || customerPage.pageSize,
      name: name || customerPage.name,
      sex: sex || customerPage.sex,
    });
  }

  closeModal() {
    this.setState({
      visible: false,
    });
    this.formValues = {
      name: '',
      sex: 0,
      age: 20,
      tel: '',
      address: '',
    };
  }

  renderForm() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 19 },
      },
    };

    return (
      <Form >
        <FormItem label="姓名" {...formItemLayout}>
          {
            getFieldDecorator('name', {
              rules: [{ required: true, message: '姓名不能为空!' }],
            })(
              <Input placeholder="请输入姓名！" />
            )
          }
        </FormItem>
        <FormItem label="性别" {...formItemLayout}>
          {
            getFieldDecorator('sex', {
              rules: [],
            })(
              <Select
                onChange={(value) => {
                  console.log(value);
                  this.props.form.setFieldsValue({
                    sex: value,
                  });
                }}
              >
                <Option value="1">女</Option>
                <Option value="0">男</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem label="年龄" {...formItemLayout}>
          {
            getFieldDecorator('age', {
              initialValue: 20,
            })(
              <InputNumber min={0} max={100} />
            )
          }
        </FormItem>
        <FormItem label="电话" {...formItemLayout}>
          {
            getFieldDecorator('tel', {
              rules: [
                { required: true, message: '电话不能为空!' },
                { pattern: /^[1][3,4,5,7,8][0-9]{9}$/, message: '请输入正确的手机号格式!' },
              ],
            })(
              <Input placeholder="请输入电话号码！" />
            )
          }
        </FormItem>
        <FormItem label="地址" {...formItemLayout}>
          {
            getFieldDecorator('address', {
              rules: [],
            })(
              <Input placeholder="请输入家庭住址！" />
            )
          }
        </FormItem>
      </Form>
    );
  }

  renderTable() {
    const { list, pageNum, pageSize, total } = this.props.customerPage;
    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
      },
      {
        title: '年龄',
        dataIndex: 'age',
      },
      {
        title: '性别',
        dataIndex: 'sex',
        render: val => <span>{val ? '男' : '女'}</span>,
      },
      {
        title: '电话',
        dataIndex: 'tel',
        key: 'tel',
      },
      {
        title: '住址',
        dataIndex: 'address',
      },
      {
        title: '注册时间',
        dataIndex: 'loggedTime',
        sorter: (a, b) => moment(parseInt(a.loggedTime)).format('x') - moment(parseInt(b.loggedTime)).format('x'),
        render: val => <span>{moment(parseInt(val)).format('YYYY-MM-DD hh:mm:ss')}</span>
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
          <Popconfirm title="您确认要删除这个用户么？">
            <a href="javascript:;" >删除</a>
          </Popconfirm>
        </span>
        ),
      }
    ];

    const props = {
      rowKey: 'id',
      dataSource: list,
      columns,
      pagination: {
        current: pageNum,
        pageSize,
        total,
        showSizeChanger: true,
        // onChange: this.changeSize.bind(this),
        // onShowSizeChange: this.changeSize.bind(this),
      },
    };

    return (
      <Table {...props}/>
    );
  }

  render() {
    const {name, sex} = this.props.customerPage;
    const {visible} = this.state;
    const searchProps = {
      searchList: [
        {
          key: 'name',
          label: '姓名：',
          placeholder: '请输入姓名',
          type: 'input',
        },
        {
          key: 'sex',
          label: '性别：',
          placeholder: '',
          type: 'select',
          list: [
            {
              id: 2,
              label: '全部',
            },
            {
              id: 0,
              label: '男',
            },
            {
              id: 1,
              label: '女',
            },
          ]
        },
      ],
      defaultValues: {name, sex},
      onSearch: (value) => {
        this.queryList(value);
      },
      onAdd: () => {
        this.setState({
          visible: true,
        });
      },
    };

    const modalProps = {
      visible,
      title: '添加客户',
      okText: '确定',
      cancelText: '取消',
      onCancel: this.closeModal.bind(this),
      onOk: async () => {
        const {editId} = this.state;
        const values = this.formValues;
        if (values) {
          this.closeModal();
          if (editId) {
            console.log('修改');
          } else {
            const data = addCustomer(values);
            if (data) {
              this.queryList({});
            }
          }
        }
      }
    };

    return (
      <div>
        <Card className={css.card}>
          <SearchBar {...searchProps}/>
          {this.renderTable()}
        </Card>
        <Modal {...modalProps}>
          {this.renderForm()}
        </Modal>
      </div>
    );
  }
}