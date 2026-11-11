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

test('POST /explain returns JSON 400 for malformed JSON bodies', async () => {
  await withServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/explain`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{"expression":',
    });
    assert.equal(response.status, 400);
    assert.match(response.headers.get('content-type') ?? '', /application\/json/);
    const body = await response.json();
    assert.equal(typeof body.error, 'string');
    assert.ok(body.error.length > 0);
    assert.equal(body.stack, undefined);
    assert.ok(!JSON.stringify(body).includes('{"expression":'));
  });
});

test('POST /explain returns JSON 413 for oversized JSON bodies', async () => {
  await withServer(async (baseUrl) => {
    // Express's default JSON limit is about 100kb.
    const huge = JSON.stringify({ expression: '* * * * *', padding: 'x'.repeat(120_000) });
    const response = await fetch(`${baseUrl}/explain`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: huge,
    });
    assert.equal(response.status, 413);
    assert.match(response.headers.get('content-type') ?? '', /application\/json/);
    const body = await response.json();
    assert.equal(typeof body.error, 'string');
    assert.ok(body.error.length > 0);
    assert.equal(body.stack, undefined);
  });
});

test('POST /explain still accepts a valid JSON body', async () => {
  await withServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/explain`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ expression: '0 0 * * *', count: 2 }),
    });
    assert.equal(response.status, 200);
    const body = await response.json();
    assert.equal(body.expression, '0 0 * * *');
    assert.equal(body.nextRuns.length, 2);
  });
});
