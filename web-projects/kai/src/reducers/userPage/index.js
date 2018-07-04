import userApi from 'api/userApi';

const type = {
  userQueryList: 'userQueryList',
};

/**
 * @reducer userReducers
 *
 * @param state
 * @param action
 * @returns {*}
 */
const userReducers = (state, action) => {
  const { type: actionType, ...other } = action;

  switch (actionType) {

    case type.userQueryList: {
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
        query: '',
        list: [],
      };
    }
  }
};

export default userReducers;

/**
 * @action 请求用户列表
 *
 * @param pageNum
 * @param pageSize
 * @param query
 * @returns {Function}
 */
export const queryList = ({pageNum, pageSize, query}) => {
  return async (dispatch) => {
    const data = await userApi.queryList({pageNum, pageSize, query});

    let res = {
      type: type.userQueryList,
      pageNum,
      pageSize,
      ...data,
    };

    if (query !== undefined) {
      res.query = query;
    }

    dispatch(res);
  };
};

/**
 * 添加用户
 *
 * @param nickname
 * @param realname
 * @param username
 * @returns {Promise<*>}
 */
export const addUser = async ({nickname, realname, username}) => {
  const data = await userApi.addUser({nickname, realname, username});
  return data.success;
};

/**
 * 删除用户
 *
 * @param id
 * @returns {Promise<*>}
 */
export const deleteUser = async ({id}) => {
  const data = await userApi.deleteUser({id});
  return data.success;
};

