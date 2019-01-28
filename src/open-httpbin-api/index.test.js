import test from 'ava';
import request from 'supertest';

import migration from './index';

// Kong gateway
const app = request('http://localhost:8000');

test.before(async () => {
  return migration.commit();
});

test.after.always(async () => {
  return migration.revert();
});

test('When I call /bin/uuid, it should call httpbin.org/uuid', async t => {
  return app.get('/bin/uuid')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(res => {
      t.is(typeof res.body.uuid, 'string');
    });
});
