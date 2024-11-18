import { expects } from './index.js';

describe('expects async', () => {
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

  describe('toContain', () => {
    it('expects an array to contain a number', async () => {
      await expects(Promise.resolve([1, 2, 3])).resolves.toContain(3);
      await expect(Promise.resolve([1, 2, 3])).resolves.toContain(3);
      await expects(Promise.resolve([1, 2, 3])).resolves.not.toContain(4);
    });

    it('expects a string to contain a substring', async () => {
      await expects(Promise.resolve('andy young')).resolves.toContain('andy');
      await expects(Promise.resolve('andy young')).resolves.toContain('young');
      await expects(Promise.resolve('andy young')).resolves.not.toContain('joe');
    });

    it('expects to fail when an array does not contain a number', async () => {
      await expects(async () => {
        await expects(Promise.resolve([1, 2, 3])).resolves.toContain(4);
      }).resolves.toThrowError('4 was expected to be contained by [1, 2, 3]');
    });

    it('expects to fail when a string does not contain a substring', async () => {
      await expects(async () => {
        await expects(Promise.resolve('andy')).resolves.toContain('joe');
      }).resolves.toThrowError('joe was expected to be contained by andy');
    });

    it('expects to fail when an array contains an unexpected number', async () => {
      await expects(async () => {
        await expects(Promise.resolve([1, 2, 3])).resolves.not.toContain(3);
      }).resolves.toThrowError('3 was not expected to be contained by [1, 2, 3]');
    });

    it('expects to fail when a string contains an unexpected substring', async () => {
      await expects(async () => {
        await expects(Promise.resolve('andy')).resolves.not.toContain('a');
      }).resolves.toThrowError('a was not expected to be contained by andy');
    });

    it('expects to fail when invalid types are provided', async () => {
      await expects(async () => {
        await expects(Promise.resolve(2)).resolves.toContain('4');
      }).resolves.toThrowError('Both values must be strings or the actual value must be an array.');
    });
  });

  describe('toHaveLength', () => {
    it('expects an array to have a length', async () => {
      await expects(Promise.resolve([1, 2, 3])).resolves.toHaveLength(3);
      await expects(Promise.resolve([1, 2, 3])).resolves.not.toHaveLength(4);
    });

    it('expects a string to have a length', async () => {
      await expects(Promise.resolve('andy')).resolves.toHaveLength(4);
      await expects(Promise.resolve('andy')).resolves.not.toHaveLength(3);
    });

    it('expects an object with a length property to have a length', async () => {
      const obj = { length: 3 };
      await expects(Promise.resolve(obj)).resolves.toHaveLength(3);
      await expects(Promise.resolve(obj)).resolves.not.toHaveLength(4);
    });

    it('fails if length is unexpected', async () => {
      await expects(async () => {
        await expects(Promise.resolve([1, 2, 3])).resolves.toHaveLength(4);
      }).rejects.toThrowError(
        '[1, 2, 3] was expected to have a length of 4, but it has a length of 3',
      );

      await expects(async () => {
        await expects(Promise.resolve([1, 2, 3])).resolves.not.toHaveLength(3);
      }).rejects.toThrowError('[1, 2, 3] was not expected to have a length of 3');
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

  describe('toThrowError', () => {
    const getFruitStock = async (type: string | null | undefined) => {
      if (type === undefined || type === null) {
        throw type;
      }

      if (type === 'pineapples') {
        throw new Error('Pineapples are not in stock');
      }

      if (type === 'oranges') {
        throw 'Oranges are not in stock';
      }

      if (type === 'apples') {
        return 300;
      }
    };

    it('expects function to throw undefined', async () => {
      await expects(() => getFruitStock(undefined)).rejects.toThrowError();
      await expects(() => getFruitStock(undefined)).rejects.toThrowError(
        /Thrown error was undefined/,
      );
      await expects(() => getFruitStock(undefined)).rejects.toThrowError(
        'Thrown error was undefined',
      );
      await expects(() => getFruitStock(undefined)).rejects.toThrowError(
        /^Thrown error was undefined$/,
      );
      await expects(() => getFruitStock(undefined)).rejects.toThrowError(
        new RegExp('Thrown error was undefined'),
      );
      await expects(() => getFruitStock(undefined)).rejects.toThrowError(
        new Error('Thrown error was undefined'),
      );
    });

    it('expects function to throw null', async () => {
      await expects(() => getFruitStock(null)).rejects.toThrowError();
      await expects(() => getFruitStock(null)).rejects.toThrowError(/Thrown error was null/);
      await expects(() => getFruitStock(null)).rejects.toThrowError('Thrown error was null');
      await expects(() => getFruitStock(null)).rejects.toThrowError(/^Thrown error was null$/);
      await expects(() => getFruitStock(null)).rejects.toThrowError(
        new RegExp('Thrown error was null'),
      );
      await expects(() => getFruitStock(null)).rejects.toThrowError(
        new Error('Thrown error was null'),
      );
    });

    it('expects function to throw an error', async () => {
      await expects(() => getFruitStock('pineapples')).rejects.toThrowError();
      await expects(() => getFruitStock('pineapples')).rejects.toThrowError(/stock/);
      await expects(() => getFruitStock('pineapples')).rejects.toThrowError('stock');
      await expects(() => getFruitStock('pineapples')).rejects.toThrowError(
        /^Pineapples are not in stock$/,
      );
      await expects(() => getFruitStock('pineapples')).rejects.toThrowError(
        new RegExp('Pineapples are not in stock'),
      );
      await expects(() => getFruitStock('pineapples')).rejects.toThrowError(
        new Error('Pineapples are not in stock'),
      );
    });

    it('expects function to throw an error', async () => {
      await expects(getFruitStock('pineapples')).rejects.toThrowError();
      await expects(getFruitStock('pineapples')).rejects.toThrowError(/stock/);
      await expects(getFruitStock('pineapples')).rejects.toThrowError('stock');
      await expects(getFruitStock('pineapples')).rejects.toThrowError(
        /^Pineapples are not in stock$/,
      );
      await expects(getFruitStock('pineapples')).rejects.toThrowError(
        new RegExp('Pineapples are not in stock'),
      );
      await expects(getFruitStock('pineapples')).rejects.toThrowError(
        new Error('Pineapples are not in stock'),
      );
    });

    it('expects function to not throw an error', async () => {
      await expects(getFruitStock('apples')).rejects.not.toThrowError();
      await expects(getFruitStock('pineapples')).rejects.not.toThrowError(/foobar/);
      await expects(getFruitStock('pineapples')).rejects.not.toThrowError('foobar');
      await expects(getFruitStock('pineapples')).rejects.not.toThrowError(new RegExp('foobar'));
      await expects(getFruitStock('pineapples')).rejects.not.toThrowError(new Error('foobar'));
    });

    it('expects to fail when function unexpectedly throws', async () => {
      await expects(async () => {
        await expects(getFruitStock('pineapples')).rejects.not.toThrowError();
      }).rejects.toThrowError(
        'Function was not expected to throw, but threw: Pineapples are not in stock',
      );
    });

    it('expects to fail when function unexpectedly does not throw', async () => {
      await expects(async () => {
        await expects(await getFruitStock('apples')).rejects.toThrowError();
      }).rejects.toThrowError('Function was expected to throw, but did not.');
    });

    it('expects to fail when function throws a different error', async () => {
      await expects(async () => {
        await expects(getFruitStock('pineapples')).rejects.toThrowError(
          'Pineapples have run out of stock!',
        );
      }).rejects.toThrowError(
        'Pineapples are not in stock" to match "Pineapples have run out of stock!"',
      );
    });

    it('expects a function argument', async () => {
      await expects(Promise.resolve(4)).rejects.not.toThrowError();
      await expects(Promise.reject(4)).rejects.toThrowError('4');
    });
  });
});
