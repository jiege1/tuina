import Ajax from 'common/utils/ajax';

/**
 * @api {get} /queryList 获取客户列表
 * @apiName queryList
 * @apiGroup customer
 *
 * @apiParam {Number} pageNum  用户ID.
 * @apiParam {Number} pageSize  用户ID.
 * @apiParam {String} name  用户ID.
 * @apiParam {Number} sex  性别 oneOf([0, 1]) 0:男，1:女.
 *
 * @apiSuccess {Number} total  查询到的总条数.
 * @apiSuccess {Object[]} list  客户列表.
 * @apiSuccess {Number} list.id  ID.
 * @apiSuccess {String} list.address  住址.
 * @apiSuccess {String} list.name  姓名.
 * @apiSuccess {Number} list.age  年龄.
 * @apiSuccess {Timestamp} list.loggedTime  注册时间.
 * @apiSuccess {Number} list.sex  性别.
 * @apiSuccess {String} list.tel  电话.
 *
 * @apiSuccessExample 成功返回示例
 * {
 *  code: 0,
 *  msg: '',
 *  data: {
 *    total: 100,
 *    list: [
 *      id: 1,
 *      address: '成都武侯',
 *      name: '张三',
 *      age: 18,
 *      loggedTime: 15242342352,
 *      sex: 1,
 *      tel: '13541231233',
 *    ]
 * }
 */
const queryList = async (params) => await Ajax.query({url: 'customer.queryList', params});

/**
 * @api {post} /addCustomer 添加
 * @apiName addCustomer
 * @apiGroup customer
 *
 * @apiSuccess {String} address  住址.
 * @apiSuccess {String} name  姓名.
 * @apiSuccess {Number} age  年龄.
 * @apiSuccess {Number} sex  性别.
 * @apiSuccess {String} tel  电话.
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
const addCustomer = async (params) => await Ajax.query({url: 'user.addUser', params, method: 'post', successLabel: '添加'});


/**
 * @api {post} /deleteCustomer 删除
 * @apiName deleteCustomer
 * @apiGroup customer
 *
 * @apiSuccess {Number} id  用户ID.
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
const deleteCustomer = async (params) => await Ajax.query({url: 'user.deleteCustomer', params, method: 'post', successLabel: '添加'});

export default {
  queryList,
  addCustomer,
  deleteCustomer,
};