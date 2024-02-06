export const getValuesPerMonth = (transactions) => {
  const result = {};

  transactions.forEach(transaction => {
    const date = transaction.date.substring(0, 7);

    result[date] ?
      result[date].push(transaction) :
      result[date] = [transaction];
  }
  );

  return result;
};

const getTotalMonthValue = (transactions, id) => (
  transactions.reduce((acc, item) => {
    if (+item.to === +id) {
      return Math.round(acc + item.amount);
    }
    return Math.round(acc - item.amount);
  }, 0)
);

export const getTotalValuePerMonth = (datedTransactions, id) => {
  const result = [];
  const dates = Object.keys(datedTransactions);

  dates.forEach((date) => {
    const datedValue = {
      date,
      amount: getTotalMonthValue(datedTransactions[date], id),
    };
    result.push(datedValue);
  });

  return result;
};

export const addBalance = (arr, balance) => {
  let balanceValue = balance;
  const arrCopy = [...arr];

  arrCopy.forEach((item, i, arr) => {
    const index = i - 1;
    balanceValue = i === 0 ? balance : balanceValue - arr[index].amount;

    item.balance = Math.round(balanceValue);
  });

  return arrCopy;
};


