import Mock, { Random } from 'mockjs';
import {output} from '../utils';

Mock.mock(/mock.bool/, () => {
  return output({
    success: Random.boolean(9, 1, true)
  });
});
