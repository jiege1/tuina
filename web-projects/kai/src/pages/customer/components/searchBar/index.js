import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {Input, Button, Select, DatePicker} from 'antd';
import css from './index.less';
const Search = Input.Search;
const Option = Select.Option;
const {RangePicker} = DatePicker;

export default class SearchBar extends PureComponent {

  static propTypes = {
    onSearch: PropTypes.func,
    onAdd: PropTypes.func,
  };

  static defaultProps = {
    onSearch: () => {},
    onAdd: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      sex: '',
      name: '',
      dateRange: {
        startLogTime: null,
        endLogTime: null,
      }
    };
  }

  render() {
    const { onSearch, onAdd } = this.props;
    const { sex, dateRange, name } = this.state;

    const searchProps = {
      className: css.search,
      onSearch: (value) => {
        onSearch({
          sex,
          name: value,
          dateRange,
        });
        this.setState({
          name: value,
        });
      }
    };
    const btnProps = {
      type: 'primary',
      icon: 'plus',
      onClick: () => {
        onAdd();
      },
    };
    const sexProps = {
      style: {width: 120},
      placeholder: '性别',
      value: sex,
      onChange: (value) => {
        onSearch({
          sex, value,
          name,
          dateRange,
        });
        this.setState({
          sex: value,
        });
      },
    };
    const dateProps = {
      onChange: (data) => {
        let start = data[0] ? `${moment(data[0]).format('YYYY-MM-DD')} 00:00:00` : null;
        let end = data[1] ? `${moment(data[1]).format('YYYY-MM-DD')} 23:59:59` : null;
        const date = {
          startLogTime: start ? moment(start).format('X') : null,
          endLogTime: end ? moment(end).format('X') : null,
        };
        onSearch({
          sex,
          name,
          dateRange: date,
        });
        this.setState({
          dateRange: date,
        });
        return date;
      }
    };

    return (
      <div className={css.box}>
        <Button {...btnProps}>添加</Button>
        <Select {...sexProps}>
          <Option value="" >全部</Option>
          <Option value="0">男</Option>
          <Option value="1">女</Option>
        </Select>
        <RangePicker {...dateProps}/>
        <Search {...searchProps}/>
      </div>
    );
  }
}
