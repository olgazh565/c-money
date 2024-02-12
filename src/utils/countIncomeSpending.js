export const countIncomeSpendingPerYear = (val, arr, year) => {
  const yearToDisplay = arr.filter(item => (
    +item.date.substring(0, 4) === +year)
  );
  const months = yearToDisplay.length;
  const weeks = months * 4;

  const income = yearToDisplay
    .reduce((acc, item) => acc + item.income, 0);

  const spending = yearToDisplay
    .reduce((acc, item) => acc + item.spending, 0);

  if (val === 'year') {
    return [Math.round(income), Math.round(spending)];
  } else if (val === 'month') {
    return [Math.round(income / months), Math.round(spending / months)];
  } else if (val === 'week') {
    return [Math.round(income / weeks), Math.round(spending / weeks)];
  }
};

const countIncomeSpendValue = (transactions, id) => {
  const income = transactions.reduce((acc, item) => {
    if (+item.to === +id) {
      return Math.round(acc + item.amount);
    }
    return acc;
  }, 0);

  const spending = transactions.reduce((acc, item) => {
    if (+item.from === +id) {
      return Math.round(acc + item.amount);
    }
    return acc;
  }, 0);

  return {income, spending};
};


export const countIncomeSpendingPerMonth = (datedTransactions, id) => {
  const result = [];
  const dates = Object.keys(datedTransactions);

  dates.forEach((date) => {
    const {income, spending} =
      countIncomeSpendValue(datedTransactions[date], id);

    const datedValue = {
      date,
      income,
      spending,
    };
    result.push(datedValue);
  });

  return result;
};
