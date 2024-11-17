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

    it('expects to throw when two object references are not the same', () => {
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

    it('expects to throw when undefined is to be defined', () => {
      expect(() => expects(undefined).toBeDefined()).toThrowError(
        'Expected: <not> undefined. Actual: undefined',
      );
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

  describe('toBeUndefined', () => {
    it('expects undefined to be undefined', () => {
      expects(undefined).toBeUndefined();
    });

    it('expects a number to not be undefined', () => {
      expects(2).not.toBeUndefined();
    });

    it('expects to throw when a number is to be undefined', () => {
      expect(() => expects(2).toBeUndefined()).toThrowError('Expected: undefined. Actual: 2');
    });
  });

  describe('toBeTruthy', () => {
    it('expects truthy values to be truthy', () => {
      expects(true).toBeTruthy();
      expects({}).toBeTruthy();
      expects([]).toBeTruthy();
      expects(1).toBeTruthy();
      expects(42).toBeTruthy();
      expects('0').toBeTruthy();
      expects('false').toBeTruthy();
      expects(new Date()).toBeTruthy();
      expects(-42).toBeTruthy();
      expects(12n).toBeTruthy();
      expects(3.14).toBeTruthy();
      expects(-3.14).toBeTruthy();
      expects(Infinity).toBeTruthy();
      expects(-Infinity).toBeTruthy();
    });

    it('expects falsey values to not be truthy', () => {
      expects(null).not.toBeTruthy();
      expects(undefined).not.toBeTruthy();
      expects(false).not.toBeTruthy();
      expects(NaN).not.toBeTruthy();
      expects(0).not.toBeTruthy();
      expects(-0).not.toBeTruthy();
      expects(0n).not.toBeTruthy();
      expects('').not.toBeTruthy();
    });

    it('expects to throw when a falsy value is to be truthy', () => {
      expect(() => expects(false).toBeTruthy()).toThrowError('Expected: true. Actual: false');
    });
  });

  describe('toBeFalsy', () => {
    it('expects falsey values to be falsy', () => {
      expects(null).toBeFalsy();
      expects(undefined).toBeFalsy();
      expects(false).toBeFalsy();
      expects(NaN).toBeFalsy();
      expects(0).toBeFalsy();
      expects(-0).toBeFalsy();
      expects(0n).toBeFalsy();
      expects('').toBeFalsy();
    });

    it('expects truthy values to not be falsy', () => {
      expects(true).not.toBeFalsy();
      expects({}).not.toBeFalsy();
      expects([]).not.toBeFalsy();
      expects(1).not.toBeFalsy();
      expects(42).not.toBeFalsy();
      expects('0').not.toBeFalsy();
      expects('false').not.toBeFalsy();
      expects(new Date()).not.toBeFalsy();
      expects(-42).not.toBeFalsy();
      expects(12n).not.toBeFalsy();
      expects(3.14).not.toBeFalsy();
      expects(-3.14).not.toBeFalsy();
      expects(Infinity).not.toBeFalsy();
      expects(-Infinity).not.toBeFalsy();
    });

    it('expects to throw when a truthy value is to be falsy', () => {
      expect(() => expects(true).toBeFalsy()).toThrowError('Expected: false. Actual: true');
    });
  });

  describe('toBeNull', () => {
    it('expects null to be null', () => {
      expects(null).toBeNull();
    });

    it('expects a number to not be null', () => {
      expects(2).not.toBeNull();
    });

    it('expects to throw when a number is to be null', () => {
      expect(() => expects(2).toBeNull()).toThrowError('Expected: null. Actual: 2');
    });
  });

  describe('toBeNaN', () => {
    it('expects NaN to be NaN', () => {
      expects(NaN).toBeNaN();
    });

    it('expects a number to not be NaN', () => {
      expects(2).not.toBeNaN();
    });

    it('expects to throw when a number is to be NaN', () => {
      expect(() => expects(2).toBeNaN()).toThrowError('Expected: NaN. Actual: 2');
    });
  });

  describe('toSatisfy', () => {
    const isOdd = (value: number) => value % 2 !== 0;

    it('expects 3 to be odd', () => {
      expects(3).toSatisfy(isOdd);
    });

    it('expects 4 to not be odd', () => {
      expects(4).not.toSatisfy(isOdd);
    });
  });

  describe('resolves', () => {
    describe('toBe', () => {
      it('expects two numbers to be the same', async () => {
        await expects(Promise.resolve(2)).resolves.toBe(2);
      });

      it('does not require the value to be a promise', async () => {
        await expects(2).resolves.toBe(2);
      });
    });

    describe('toBeDefined', () => {
      it('expects a number to be defined', async () => {
        await expects(Promise.resolve(2)).resolves.toBeDefined();
      });

      it('expects undefined to not be defined', async () => {
        await expects(Promise.resolve(undefined)).resolves.not.toBeDefined();
      });

      it('expects inversion state is restored', async () => {
        await expects(Promise.resolve(2)).resolves.toBeDefined();
        await expects(Promise.resolve(2)).resolves.toBe(2);
        await expects(Promise.resolve(2)).resolves.toBeDefined();
        await expects(Promise.resolve(2)).resolves.not.toBe(3);
      });
    });

    describe('toBeUndefined', () => {
      it('expects undefined to be undefined', async () => {
        await expects(Promise.resolve(undefined)).resolves.toBeUndefined();
      });

      it('expects a number to not be undefined', async () => {
        await expects(Promise.resolve(2)).resolves.not.toBeUndefined();
      });
    });

    describe('toBeTruthy', () => {
      it('expects truthy values to be truthy', async () => {
        await expects(Promise.resolve(true)).resolves.toBeTruthy();
        await expects(Promise.resolve({})).resolves.toBeTruthy();
        await expects(Promise.resolve([])).resolves.toBeTruthy();
        await expects(Promise.resolve(1)).resolves.toBeTruthy();
        await expects(Promise.resolve(42)).resolves.toBeTruthy();
        await expects(Promise.resolve('0')).resolves.toBeTruthy();
        await expects(Promise.resolve('false')).resolves.toBeTruthy();
        await expects(Promise.resolve(new Date())).resolves.toBeTruthy();
        await expects(Promise.resolve(-42)).resolves.toBeTruthy();
        await expects(Promise.resolve(12n)).resolves.toBeTruthy();
        await expects(Promise.resolve(3.14)).resolves.toBeTruthy();
        await expects(Promise.resolve(-3.14)).resolves.toBeTruthy();
        await expects(Promise.resolve(Infinity)).resolves.toBeTruthy();
        await expects(Promise.resolve(-Infinity)).resolves.toBeTruthy();
      });

      it('expects falsey values to not be truthy', async () => {
        await expects(Promise.resolve(null)).resolves.not.toBeTruthy();
        await expects(Promise.resolve(undefined)).resolves.not.toBeTruthy();
        await expects(Promise.resolve(false)).resolves.not.toBeTruthy();
        await expects(Promise.resolve(NaN)).resolves.not.toBeTruthy();
        await expects(Promise.resolve(0)).resolves.not.toBeTruthy();
        await expects(Promise.resolve(-0)).resolves.not.toBeTruthy();
        await expects(Promise.resolve(0n)).resolves.not.toBeTruthy();
        await expects(Promise.resolve('')).resolves.not.toBeTruthy();
      });
    });

    describe('toBeFalsy', () => {
      it('expects falsey values to be falsy', async () => {
        await expects(Promise.resolve(null)).resolves.toBeFalsy();
        await expects(Promise.resolve(undefined)).resolves.toBeFalsy();
        await expects(Promise.resolve(false)).resolves.toBeFalsy();
        await expects(Promise.resolve(NaN)).resolves.toBeFalsy();
        await expects(Promise.resolve(0)).resolves.toBeFalsy();
        await expects(Promise.resolve(-0)).resolves.toBeFalsy();
        await expects(Promise.resolve(0n)).resolves.toBeFalsy();
        await expects(Promise.resolve('')).resolves.toBeFalsy();
      });

      it('expects truthy values to not be falsy', async () => {
        await expects(Promise.resolve(true)).resolves.not.toBeFalsy();
        await expects(Promise.resolve({})).resolves.not.toBeFalsy();
        await expects(Promise.resolve([])).resolves.not.toBeFalsy();
        await expects(Promise.resolve(1)).resolves.not.toBeFalsy();
        await expects(Promise.resolve(42)).resolves.not.toBeFalsy();
        await expects(Promise.resolve('0')).resolves.not.toBeFalsy();
        await expects(Promise.resolve('false')).resolves.not.toBeFalsy();
        await expects(Promise.resolve(new Date())).resolves.not.toBeFalsy();
        await expects(Promise.resolve(-42)).resolves.not.toBeFalsy();
        await expects(Promise.resolve(12n)).resolves.not.toBeFalsy();
        await expects(Promise.resolve(3.14)).resolves.not.toBeFalsy();
        await expects(Promise.resolve(-3.14)).resolves.not.toBeFalsy();
        await expects(Promise.resolve(Infinity)).resolves.not.toBeFalsy();
        await expects(Promise.resolve(-Infinity)).resolves.not.toBeFalsy();
      });
    });

    describe('toBeNull', async () => {
      it('expects null to be null', async () => {
        await expects(Promise.resolve(null)).resolves.toBeNull();
      });

      it('expects a number to not be null', async () => {
        await expects(Promise.resolve(2)).resolves.not.toBeNull();
      });
    });

    describe('toBeNaN', async () => {
      it('expects NaN to be NaN', async () => {
        await expects(Promise.resolve(NaN)).resolves.toBeNaN();
      });

      it('expects a number to not be NaN', async () => {
        await expects(Promise.resolve(2)).resolves.not.toBeNaN();
      });
    });

    describe('toSatisfy', () => {
      const isOdd = (value: number) => value % 2 !== 0;

      it('expects 3 to be odd', async () => {
        await expects(Promise.resolve(3)).resolves.toSatisfy(isOdd);
      });

      it('expects 4 to not be odd', async () => {
        await expects(Promise.resolve(4)).resolves.not.toSatisfy(isOdd);
      });
    });
  });
});
