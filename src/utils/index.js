// 排列算法
export function permutationGenerateArray(arr, r) {
  const result = [];

  function permute(current, remaining) {
      if (current.length === r) {
          result.push(current);
      } else {
          for (let i = 0; i < remaining.length; i++) {
              let next = current.concat(remaining[i]);
              let newRemaining = remaining.slice(0, i).concat(remaining.slice(i + 1));
              permute(next, newRemaining);
          }
      }
  }

  permute([], arr);
  return result;
}

// 组合算法
export function combinationGenerateArray(arr, r) {
  const result = [];

  function combine(current, start) {
      if (current.length === r) {
          result.push(current);
      } else {
          for (let i = start; i < arr.length; i++) {
              let next = current.concat(arr[i]);
              combine(next, i + 1);
          }
      }
  }

  combine([], 0);
  return result;
}



// 组合算法，计算组合数
/**
 * C(n, r) = n! / r!(n - r)! 
 * @param {*} n 
 * @param {*} r 
 * @returns 
 * 示例：从3个数字里选择2个数字的组合数，combination(3, 2) = 3
 */
export function combination(n, r) {
  if (r > n) return 0
  let numerator = 1
  for (let i = 0; i < r; i++) {
    numerator *= n - i
  }
  let denominator = 1
  for (let i = 1; i <= r; i++) {
    denominator *= i
  }
  return numerator / denominator
}


// 双色球复式票金额计算
 export function calculateSSQCost(redBallCount, blueBallCount) {
  if (redBallCount < 6 || redBallCount > 33 || blueBallCount < 1 || blueBallCount > 16) {
      throw new Error("无效的红球或蓝球数量");
  }

  const redCombos = combination(redBallCount, 6);
  const totalCombinations = redCombos * blueBallCount;
  const totalCost = totalCombinations * 2; // 每注2元

  return totalCost;
}

// 大乐透复式票金额计算
export function calculateDLTCost(frontBallCount, backBallCount) {

  if (frontBallCount < 5 || frontBallCount > 35 || backBallCount < 2 || backBallCount > 12) {
      throw new Error("无效的前区或后区号码数量");
  }

  const frontCombos = combination(frontBallCount, 5);
  const backCombos = combination(backBallCount, 2);
  const totalCombinations = frontCombos * backCombos;
  const totalCost = totalCombinations * 3; // 每注3元

  return totalCost;
}


// 给定金额，计算彩票类型
export function calculateLotteryType(cost) {
  if (cost>=5000)return 'large'
  if (cost>=2500 && cost<5000)return 'medium'
  if (cost>=0 && cost<2500)return 'small'
}


// 计算一个号码在数组中出现的次数
export function countOccurrences(arr, num) {
  return arr.reduce((acc, cur) => cur === num ? acc + 1 : acc, 0)
}

