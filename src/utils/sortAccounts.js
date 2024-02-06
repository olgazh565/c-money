export const sortAccounts = (criteria, accountsArr) => {
  const accountsToSort = [...accountsArr];

  if (accountsArr.length && criteria === 'last') {
    const arrHasLastDate =
      accountsToSort.filter(item => item.transactions.length);
    const arrHasNoLastDate =
      accountsToSort.filter(item => !item.transactions.length);

    arrHasLastDate.sort((a, b) =>
      (new Date(a.transactions[0].date).getTime() -
        new Date(b.transactions[0].date).getTime()));

    return [...arrHasLastDate, ...arrHasNoLastDate];
  }

  if (accountsArr.length) {
    return accountsToSort.sort((a, b) => {
      if (criteria === 'date') {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
      return +a[criteria] - +b[criteria];
    });
  }
};
