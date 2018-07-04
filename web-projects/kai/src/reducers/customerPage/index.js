import customerApi from 'api/customerApi';

const type = {
  customerQueryList: 'customerQueryList',
};

const customerReducers = (state, action) => {
  const { type: actionType, ...other } = action;

  switch (actionType) {

    case type.customerQueryList: {
      return {
        ...state,
        ...other,
      };
    }

    default: {
      return state ? state : {
        pageNum: 0,
        pageSize: 20,
        total: 0,
        name: '',
        sex: 2,
        list: [],
      };
    }
  }
};

export default customerReducers;

export const queryList = ({pageNum, pageSize, name, sex}) => {
  return async (dispatch) => {
    let fields = {pageNum, pageSize};

    if (name) {
      fields.name = name;
    }
    if (sex === 0 || sex === 1) {
      fields.sex = sex;
    }

    const data = await customerApi.queryList(fields);

    let res = {
      type: type.customerQueryList,
      pageNum,
      pageSize,
      name,
      sex,
      ...data,
    };

    dispatch(res);
  };
};

export const addCustomer = async ({address, age, name, sex, tel}) => {
  const data = await customerApi.addCustomer({address, age, name, sex, tel});
  return data.success;
};

export const deleteUser = async ({id}) => {
  const data = await customerApi.deleteCustomer({id});
  return data.success;
};

