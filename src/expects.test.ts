import { expects } from './index.js';

describe('expects', () => {
  describe('toBe', () => {
    it('expects two numbers to be the same', () => {
      expects(2).toBe(2);
    });

    it('expects two properties to be the same', () => {
      const user = {
        name: 'Andy',
        age: 42,
      };

      expects(user.name).toBe('Andy');
      expects(user.age).toBe(42);
    });

    it('expects two object references to be the same', () => {
      const user = {
        name: 'Andy',
        age: 42,
      };

      const userRef = user;

      expects(user).toBe(userRef);
      expects(userRef).toBe(user);
    });
  });
});
