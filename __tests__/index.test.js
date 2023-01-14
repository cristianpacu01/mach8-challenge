const app = require('../app');

describe('App', () => {
  beforeAll(() => {
    jest.spyOn(console, 'log')
      .mockImplementation(jest.fn());
  });

  describe('On happy path', () => {
    let results;

    beforeAll(() => {
      const nums = [1, 9, 5, 0, 20, -4, 12, 16, 7];
      const target = 12;
      results = app(nums, target);
    });

    test('should console log the right values', () => {
      expect(console.log).toHaveBeenCalledTimes(3);
      expect(console.log).toHaveBeenCalledWith('[First num]: 5 [Second num]: 7');
      expect(console.log).toHaveBeenCalledWith('[First num]: 0 [Second num]: 12');
      expect(console.log).toHaveBeenCalledWith('[First num]: -4 [Second num]: 16');
    });

    test('should return the right values', () => {
      expect(results.toString()).toBe([[5, 7], [0, 12], [-4, 16]].toString());
    });
  })

  describe('When the target is not valid', () => {
    let nums;
    let target;

    beforeAll(() => {
      nums = [1, 9, 5, 0, 20, -4, 12, 16, 7];
      target = 'John Doe';
    });

    test('should throw an error', () => {
      try {
        app(nums, target);
      } catch(err) {
        expect(err.message).toBe('Target is not valid');
      }
    })
  })

  describe('When one of the values is not valid', () => {
    let nums;
    let target;

    beforeAll(() => {
      nums = [1, 'John Doe', 5, 0, 20, -4, 12, 16, 7];
      target = 12;
    });

    test('should throw an error', () => {
      try {
        app(nums, target);
      } catch(err) {
        expect(err.message).toBe(`Value: "John Doe" is not valid`);
      }
    })
  })

  describe('When no values add up to the target', () => {
    let target;

    beforeAll(() => {
      console.log.mockClear();
      const nums = [1, 9, 5, 0, 20, -4, 12, 16, 7];
      target = 1000;
      app(nums, target);
    });

    test('should log the expected message', () => {
      expect(console.log).toHaveBeenCalledTimes(1);
      expect(console.log).toHaveBeenCalledWith(`No values add up to ${target}`);
    })
  });

  describe('When the first argument is not an array', () => {
    let nums;
    let target;

    beforeAll(() => {
      nums = 1;
      target = 1;
    });

    test('should throw an error', () => {
      try {
        app(nums, target);
      } catch(err) {
        expect(err.message).toBe('First argument should be an array');
      }
    })
  });

  describe('When not enough values are passed', () => {
    let nums;
    let target;

    beforeAll(() => {
      nums = [1];
      target = 1;
    });

    test('should throw an error', () => {
      try {
        app(nums, target);
      } catch(err) {
        expect(err.message).toBe('Not enough values provided to continue');
      }
    })
  })
})