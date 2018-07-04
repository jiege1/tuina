import Mock, { Random } from 'mockjs';
import {output, queryString} from '../utils';

function makeUser() {
  return {
    id: Random.increment(),
    username: Random.word(5, 10),
    nickname: Random.name(),
    realname: Random.cname(),
  };
}

Mock.mock(/mock.userQueryList/, request => {

  const params = queryString(request.url);
  const { pageSize = 10 } = params;
  let list = [];

  for (let i = 0; i < pageSize; i++) {
    list.push(makeUser());
  }

  return output({
    list,
    total: Random.integer(50, 140),
  });
});
