// Testsuit for Jest
// Run: npm test

/* global test, expect: true */

test('PASS. 1 + 1 = 2', () => {
  expect(1 + 1).toBe(2);
});
test('FAIL. 1 + 1 = 3', () => {
  expect(1 + 1).toBe(3);
});
