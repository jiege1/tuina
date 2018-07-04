import Mock, { Random } from 'mockjs';
import {output, queryString} from '../utils';

function makeCustomer() {
  let tel = '1354';
  for (let i = 0; i < 7; i++) {
    tel += Random.integer(0, 9);
  }
  return {
    id: Random.increment(),
    address: Random.county(true),
    name: Random.cname(),
    age: Random.integer(2, 60),
    loggedTime: Random.date('T'),
    sex: Random.pick([0, 1]),
    tel,
  };
}

Mock.mock(/mock.queryCustomerList/, request => {

  const params = queryString(request.url);
  const { pageSize = 10 } = params;
  let list = [];

  for (let i = 0; i < pageSize; i++) {
    list.push(makeCustomer());
  }

  console.log({
    list,
    total: Random.integer(50, 140),
  });

  return output({
    list,
    total: Random.integer(50, 140),
  });
});

