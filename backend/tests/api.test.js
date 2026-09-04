const test = require('node:test');
const assert = require('node:assert/strict');
const app = require('../server');

test('Server API Base Endpoint', async () => {
  // Test server export
  assert.ok(app);
});
