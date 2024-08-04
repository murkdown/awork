/// <reference lib="webworker" />

import { User } from "./models/user.model";
import _ from 'lodash';

addEventListener('message', ({ data }) => {
  const users = data as User[];
  const groupByLetter = _(users).groupBy(user => (user.lastname || '')[0].toUpperCase()).map((users, letter) => ({ letter, users })).orderBy(user => user.letter, 'asc').value();
  postMessage(groupByLetter);
});
