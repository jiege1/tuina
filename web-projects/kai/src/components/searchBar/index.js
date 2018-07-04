import React from 'react';
import PropTypes from 'prop-types';
import css from './index.less';
import { Input, Button, Form, Select, Icon, Dropdown, Menu, Popconfirm } from 'antd';
const {Item: FormItem, create: createForm} = Form;
const {Option} = Select;
const {Item: MenuItem} = Menu;

@createForm()
export default class SearchBar extends React.Component {

  static propTypes = {
    defaultValues: PropTypes.object,
    showAdd: PropTypes.bool,
    addTitle: PropTypes.string,
    lotOperations: PropTypes.array,
    searchList: PropTypes.array,
    onSearch: PropTypes.func,
    onAdd: PropTypes.func,
  };

  static defaultProps = {
    lotOperations: [],
    searchList: [],
    showAdd: true,
    addTitle: '添加',
    onSearch: () => {},
    onAdd: () => {},
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {defaultValues} = this.props;
    if (defaultValues) {
      this.fromValues = defaultValues;
    }
  }

  get fromValues() {
    let data = null;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        data = values;
      }
    });
    return data;
  }

  set fromValues(values) {
    if (this.props.form) {
      this.props.form.setFieldsValue(values);
    }
  }

  onSearch(e) {
    e.preventDefault();
    const values = this.fromValues;
    if (values) {
      this.props.onSearch(values);
    }
  }

  renderFormItem(formItem) {
    const {getFieldDecorator} = this.props.form;
    const {key, label, placeholder = '', type, list = []} = formItem;
    switch (type) {
      case 'input': {
        return (
          <FormItem label={label} key={key}>
            {
              getFieldDecorator(key, {})(<Input placeholder={placeholder} />)
            }
          </FormItem>
        );
      }
      case 'select': {
        return (
          <FormItem label={label} key={key}>
            {
              getFieldDecorator(key, {})(
                <Select style={{ width: 120 }}>
                  {
                    list.map(item => {
                      return (
                        <Option key={item.id} value={item.id}>{item.label}</Option>
                      );
                    })
                  }
                </Select>
              )
            }
          </FormItem>
        );
      }
    }

    return null;
  }

  render() {
    const { lotOperations, showAdd, searchList, addTitle } = this.props;

    const operaMenu = lotOperations.length ? (
      <Menu>
        {
          lotOperations.map((item, index) => {
            const onClickFunc = () => {
              if (!item.disabled) {
                item.onClick();
              }
            };

            if (item.isConfirm && !item.disabled) {
              return (
                <MenuItem key={`menu_${index}`} disabled={item.disabled}>
                  <Popconfirm title={item.confirmTitle || '您确认执行该操作么？'} onConfirm={onClickFunc}>
                    <div >
                      {item.title}
                    </div>
                  </Popconfirm>

                </MenuItem>
              );
            }

            return (
              <MenuItem key={`menu_${index}`} disabled={item.disabled}>
                <div onClick={onClickFunc}>
                  {item.title}
                </div>
              </MenuItem>
            );
          })
        }
      </Menu>
    ) : null;

    return (
      <div>
        <div className={css.row}>
          <Form layout="inline" onSubmit={this.onSearch.bind(this)}>
            {
              searchList.map(item => this.renderFormItem(item))
            }
            <FormItem>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
            </FormItem>
          </Form>
        </div>
        <div className={css.row}>
          {
            showAdd && <Button type="primary" icon="plus" onClick={this.props.onAdd}>{addTitle}</Button>
          }
          {
            !!lotOperations.length && (
              <Dropdown overlay={operaMenu}>
                <Button>批量操作<Icon type="down" /></Button>
              </Dropdown>
            )
          }
        </div>
      </div>
    );
  }
}
