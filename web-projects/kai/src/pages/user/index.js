import React from 'react';
import { Card, Table, Divider, Popconfirm, Modal, Form, Input, message } from 'antd';
import {connect} from 'react-redux';
import {queryList, deleteUser, addUser} from 'reducers/userPage';
import SearchBar from 'components/searchBar';
import css from './index.less';
const { Item: FormItem, create: createForm } = Form;

const mapStateToProps = (state) => {
  console.log(state);
  const { userPage } = state;
  return {userPage};
};

@createForm()
@connect(mapStateToProps, {queryList})
export default class User extends React.Component {

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  componentDidMount() {
    this.queryList({});
  }

  queryList({pageNum, pageSize, query}) {
    const {userPage} = this.props;
    this.props.queryList({
      pageNum: pageNum || userPage.pageNum,
      pageSize: pageSize || userPage.pageSize,
      query: query || userPage.query,
    });
  }

  async delUser(record) {
    const data = await deleteUser({id: record.id});
    if (data) {
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

  closeModal() {
    this.setState({
      visible: false,
    });
    this.formValues = {
      username: '',
      nickname: '',
      realname: '',
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
        <FormItem label="用户名" {...formItemLayout}>
          {
            getFieldDecorator('username', {
              rules: [{ required: true, message: '用户名不能为空!' }],
            })(
              <Input placeholder="请输入用户名！" />
            )
          }
        </FormItem>
        <FormItem label="昵称" {...formItemLayout}>
          {
            getFieldDecorator('nickname', {
              rules: [],
            })(
              <Input placeholder="请输入昵称！" />
            )
          }
        </FormItem>
        <FormItem label="真实姓名" {...formItemLayout}>
          {
            getFieldDecorator('realname', {
              rules: [
                { required: true, message: '真实姓名不能为空!' },
              ],
            })(
              <Input placeholder="请输入用户名！" />
            )
          }
        </FormItem>
      </Form>
    );
  }

  renderTable() {
    const { list, pageNum, pageSize, total } = this.props.userPage;
    const columns = [
      {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
      }, {
        title: '昵称',
        dataIndex: 'nickname',
        key: 'nickname',
      }, {
        title: '真实姓名',
        dataIndex: 'realname',
        key: 'realname',
      }, {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
          <Popconfirm title="您确认要删除这个用户么？" onConfirm={this.delUser.bind(this, record)}>
            <a>删除</a>
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
        onChange: (pageNum, pageSize) => {
          this.queryList({pageNum, pageSize});
        },
        onShowSizeChange: (pageNum, pageSize) => {
          this.queryList({pageNum, pageSize});
        },
      },
    };

    return (
      <Table {...props}/>
    );
  }

  render() {
    const searchProps = {
      addTitle: '添加用户',
      searchList: [
        {
          key: 'query',
          label: '关键字：',
          placeholder: '请输入关键字',
          type: 'input',
        }
      ],
      onSearch: ({query}) => {
        this.queryList({query});
      },
      onAdd: () => {
        this.setState({
          visible: true,
        });
      },
    };
    const modalProps = {
      visible: this.state.visible,
      title: '添加用户',
      okText: '确定',
      cancelText: '取消',
      onCancel: this.closeModal.bind(this),
      onOk: async () => {
        const values = this.formValues;
        if (values) {
          const result = await addUser(values);
          this.closeModal();
          if (result) {
            this.queryList({});
          }
        }
      }
    };
    return (
      <div className={css.layout}>
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