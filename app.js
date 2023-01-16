// 2*O(n) --> O(n)
const app = (nums, target) => {
  if (!Number.isInteger(target)) throw new Error('Target is not valid');
  if (!Array.isArray(nums)) throw new Error('First argument should be an array');
  if (nums.length < 2) throw new Error('Not enough values provided to continue');
  const numsMap = nums.reduce((accum, num) => ({ ...accum, [num]: true }));
  const pairs = nums.reduce((accum, num) => {
    if (!Number.isInteger(num)) throw new Error(`Value: "${num}" is not valid`);
    const candidate = target - num;
    if (numsMap[candidate]) {
      numsMap[num] = false;
      console.log(`[First num]: ${num} [Second num]: ${candidate}`);
      return [...accum, [num, candidate]];
    }
    return accum;
  }, []);
  if (!pairs.length) console.log(`No values add up to ${target}`);
  return pairs;
}

// Simplified version without validations:
const simpleApp = (nums, target) => {
  const numsMap = nums.reduce((accum, num) => ({ ...accum, [num]: true }));
  nums.forEach(num => {
    const candidate = target - num;
    if (numsMap[candidate]) {
      numsMap[num] = false;
      console.log(`[First num]: ${num} [Second num]: ${candidate}`);
    }
  });
}

// Another solution (faster and uses less space as well)
const betterApp = (nums, target) => {
  const numsMap = {};
  nums.forEach(num => {
    const candidate = target-num;
    if (numsMap[candidate]) {
      console.log(`[First num]: ${num} [Second num]: ${candidate}`);
    }
    else {
      numsMap[num] = true;
    }
  })
}

module.exports = app;
