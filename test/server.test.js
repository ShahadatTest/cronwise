import test from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from '../src/app.js';

async function withServer(run) {
  const server = createApp().listen(0);
  await new Promise((resolve) => server.once('listening', resolve));
  const baseUrl = `http://localhost:${server.address().port}`;
  try {
    await run(baseUrl);
  } finally {
    server.close();
  }
}

test('GET /health reports the service is up', async () => {
  await withServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/health`);
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { status: 'ok', service: 'cronwise' });
  });
});

test('GET /explain rejects a missing expression', async () => {
  await withServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/explain`);
    assert.equal(response.status, 400);
  });
});

test('GET /explain expands @macros', async () => {
  await withServer(async (baseUrl) => {
    const params = new URLSearchParams({ expression: '@daily' });
    const response = await fetch(`${baseUrl}/explain?${params}`);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.expression, '@daily');
    assert.equal(body.normalized, '0 0 * * *');
  });
});

test('GET /explain accepts comma-separated lists', async () => {
  await withServer(async (baseUrl) => {
    const params = new URLSearchParams({ expression: '0,15,30,45 * * * *' });
    const response = await fetch(`${baseUrl}/explain?${params}`);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.normalized, '0,15,30,45 * * * *');
  });
});

test('GET /explain rejects inverted ranges', async () => {
  await withServer(async (baseUrl) => {
    const params = new URLSearchParams({ expression: '30-10 * * * *' });
    const response = await fetch(`${baseUrl}/explain?${params}`);
    const body = await response.json();

    assert.equal(response.status, 400);
    assert.equal(body.field, 'minute');
    assert.match(body.error, /inverted/);
  });
});

test('GET /explain resolves month name aliases', async () => {
  await withServer(async (baseUrl) => {
    const params = new URLSearchParams({ expression: '0 9 1 jan,mar,dec *' });
    const response = await fetch(`${baseUrl}/explain?${params}`);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.match(body.description, /in January, March, and December/);
  });
});
