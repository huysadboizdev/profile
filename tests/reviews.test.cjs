const { test } = require('node:test');
const assert = require('node:assert/strict');
const { existsSync } = require('node:fs');
const path = require('node:path');
const file = path.join(__dirname, '..', 'reviews.js');
const sample = { name: '  Team member  ', relationship: 'Teammate', project: 'BlueXHome', rating: '4', comment: 'Clear communication and reliable delivery.', consent: true };
function api() {
  assert.ok(existsSync(file), 'The recommendations module must exist');
  return require(file);
}

test('validates feedback and trims text without treating markup as HTML', () => {
  const result = api().validateReview({ ...sample, name: ' <img src=x onerror=alert(1)> ' });
  assert.equal(result.error, undefined);
  assert.equal(result.value.name, '<img src=x onerror=alert(1)>');
  assert.equal(result.value.rating, 4);
});
test('rejects missing, out-of-range or fractional ratings', () => {
  for (const rating of ['', 0, 6, 4.5, 'five']) {
    assert.equal(api().validateReview({ ...sample, rating }).field, 'rating');
  }
});
test('rejects whitespace-only text, unsupported relationships and missing consent', () => {
  for (const [field, value] of [['name', '  '], ['comment', ' '.repeat(25)], ['relationship', 'Unknown'], ['consent', false]]) {
    assert.equal(api().validateReview({ ...sample, [field]: value }).field, field);
  }
  assert.equal(api().validateReview({ ...sample, comment: 'Short' }).field, 'comment');
  assert.equal(api().validateReview({ ...sample, comment: 'a'.repeat(801) }).field, 'comment');
});
test('counts only approved feedback and uses no made-up empty average', () => {
  assert.deepEqual(api().summarize([]), { count: 0, average: null });
  assert.deepEqual(api().summarize([{ status: 'pending', rating: 5 }]), { count: 0, average: null });
  assert.deepEqual(api().summarize([{ status: 'approved', rating: 4 }, { status: 'approved', rating: 5 }, { status: 'pending', rating: 1 }]), { count: 2, average: 4.5 });
});
test('recovers from corrupt storage and excludes malformed or duplicate entries', () => {
  const { parseStored } = api();
  assert.deepEqual(parseStored('{broken'), []);
  assert.deepEqual(parseStored('{"name":"object"}'), []);
  const valid = { ...sample, name: 'Team member', rating: 4, id: 'review-1', createdAt: '2026-10-12T00:00:00.000Z', status: 'pending' };
  assert.equal(parseStored(JSON.stringify([valid, valid, { ...valid, id: 'bad', rating: 99 }, { ...valid, id: 'bad2', status: 'verified' }])).length, 1);
});
