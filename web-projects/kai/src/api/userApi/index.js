import Ajax from 'common/utils/ajax';

/**
 * @api {post} /login 登陆
 * @apiName login
 * @apiGroup user
 *
 * @apiParam {String} username 用户名.
 * @apiParam {String} password 密码.
 *
 * @apiSuccess {String} token  用户登录成功过后的token.
 *
 * @apiSuccessExample 成功返回示例
 * {
 *  code: 0,
 *  msg: '',
 *  data: {
 *      token: 'sadfasdfasdfsadf',
 *    },
 * }
 */
const login = async (params) => await Ajax.query({url: 'user.login', params, method: 'post'});

/**
 * @api {get} /queryList 获取用户列表
 * @apiName queryList
 * @apiGroup user
 *
 * @apiParam {Number} pageNum 当前页码.
 * @apiParam {Number} pageSize 每页条数.
 * @apiParam {String} query 按照名字或昵称查询.
 *
 * @apiSuccess {Number} total  数据总条数.
 * @apiSuccess {Object[]} list  用户列表.
 * @apiSuccess {Any} list.id  用户ID.
 * @apiSuccess {String} list.username  用户名.
 * @apiSuccess {String} list.nickname  用户昵称.
 * @apiSuccess {String} list.realname  用户真实姓名.
 *
 * @apiSuccessExample 成功返回示例
 * {
 *  code: 0,
 *  msg: '',
 *  data: {
 *      total: 100,
 *      list: [
 *        {
 *           id: 1,
 *           username: 'username',
 *           nickname: '我是一个nick',
 *           realname: '张三',
 *        },
 *        {
 *           id: 2,
 *           username: '123123',
 *           nickname: '123123',
 *           realname: '王五',
 *        },
 *      ]
 *    },
 * }
 */
const queryList = async (params) => await Ajax.query({url: 'user.queryList', params});

/**
 * @api {post} /addUser 添加用户
 * @apiName addUser
 * @apiGroup user
 *
 * @apiParam {String} username  用户名.
 * @apiParam {String} nickname  用户昵称.
 * @apiParam {String} realname  用户真实姓名.
 *
 * @apiSuccess {Boolean} success  成功或失败.
 *
 * @apiSuccessExample 成功返回示例
 * {
 *  code: 0,
 *  msg: '',
 *  data: {
 *    success: true,
 * }
 */
const addUser = async (params) => await Ajax.query({url: 'user.addUser', params, method: 'post', successLabel: '添加用户'});

/**
 * @api {post} /deleteUser 删除用户
 * @apiName deleteUser
 * @apiGroup user
 *
 * @apiParam {String} id  用户ID.
 *
 * @apiSuccess {Boolean} success  成功或失败.
 *
 * @apiSuccessExample 成功返回示例
 * {
 *  code: 0,
 *  msg: '',
 *  data: {
 *    success: true,
 * }
 */
const deleteUser = async (params) => await Ajax.query({url: 'user.deleteUser', params, method: 'post', successLabel: '删除用户'});

export default {
  login,
  queryList,
  addUser,
  deleteUser,
};