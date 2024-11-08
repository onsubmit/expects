import { expects } from './index.js';

describe('expects', () => {
  describe('toBe', () => {
    it('expects two numbers to be the same', () => {
      expects(2).toBe(2);
    });

    it('expects to throw when two numbers are not the same', () => {
      expect(() => expects(2).toBe(3)).toThrowError('Expected: 3. Actual: 2');
    });

    it('expects two numbers to not be the same', () => {
      expects(2).not.toBe(3);
      expects(3).not.toBe(2);
    });

    it('expects multiple inversion to work', () => {
      expects(2).not.not.toBe(2);
      expects(2).not.not.not.not.not.not.not.not.not.not.not.not.toBe(2);
    });

    it('expects two properties to be the same', () => {
      const user = {
        name: 'Andy',
        age: 42,
      };

      expects(user.name).toBe('Andy');
      expects(user.age).toBe(42);
    });

    it('expects two properties to not be the same', () => {
      const user = {
        name: 'Andy',
        age: 42,
      };

      expects(user.name).not.toBe('John');
      expects(user.age).not.toBe(37);
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

    it('expects to throw when two object references to be the same', () => {
      const user1 = {
        name: 'Andy',
        age: 42,
      };

      const user2 = {
        name: 'Andy',
        age: 42,
      };

      expect(() => expects(user1).toBe(user2)).toThrowError(
        'Expected: [object Object]. Actual: [object Object]',
      );
      expect(() => expects(user2).toBe(user1)).toThrowError(
        'Expected: [object Object]. Actual: [object Object]',
      );
    });

    it('expects two object references to not be the same', () => {
      const user1 = {
        name: 'Andy',
        age: 42,
      };

      const user2 = {
        name: 'Andy',
        age: 42,
      };

      const user3 = structuredClone(user1);
      const user4 = JSON.parse(JSON.stringify(user2));

      for (const u1 of [user1, user2, user3, user4]) {
        for (const u2 of [user1, user2, user3, user4]) {
          if (u1 === u2) {
            expects(u1).toBe(u2);
          } else {
            expects(u1).not.toBe(u2);
          }
        }
      }
    });
  });

  describe('toBeDefined', () => {
    it('expects a number to be defined', () => {
      expects(2).toBeDefined();
    });

    it('expects undefined to not be defined', () => {
      expects(undefined).not.toBeDefined();
    });

    it('expects inversion state is restored', () => {
      expects(2).toBeDefined();
      expects(2).toBe(2);
      expects(2).toBeDefined();
      expects(2).not.toBe(3);
    });

    it('expects inversion state when an error is thrown', () => {
      let caught = false;
      try {
        expects(undefined).toBeDefined();
      } catch {
        caught = true;
        expects(2).toBe(2);
        expects(2).toBeDefined();
        expects(2).not.toBe(3);
      }

      expects(caught).toBe(true);
    });
  });
});
