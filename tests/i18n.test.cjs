const { test } = require('node:test');
const assert = require('node:assert/strict');
const { existsSync } = require('node:fs');
const path = require('node:path');
const file = path.join(__dirname, '..', 'i18n.js');
function api() {
  assert.ok(existsSync(file), 'The bilingual module must exist');
  return require(file);
}
test('uses English by default and accepts only supported saved languages', () => {
  assert.equal(api().resolveLanguage(null), 'en');
  assert.equal(api().resolveLanguage('vi'), 'vi');
  assert.equal(api().resolveLanguage('fr'), 'en');
});
test('translates visible content while preserving English and proper names', () => {
  assert.equal(api().translate('Experience', 'vi'), 'Kinh nghiệm');
  assert.equal(api().translate('Experience', 'en'), 'Experience');
  assert.equal(api().translate('BlueXHome', 'vi'), 'BlueXHome');
  assert.equal(api().translate('Graduated · Very Good classification', 'vi'), 'Đã tốt nghiệp · Xếp loại Giỏi');
});
test('interpolates dynamic review messages without evaluating user input', () => {
  assert.equal(api().translate('{count} pending', 'vi', { count: 2 }), '2 chờ duyệt');
  assert.equal(api().translate('Remove preview from {name}', 'vi', { name: '<img src=x>' }), 'Xóa đánh giá thử của <img src=x>');
});
