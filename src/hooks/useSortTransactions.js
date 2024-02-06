import {useMemo} from 'react';

export const useSortTransactions = (history) => {
  const sortedTransactions = useMemo(
    () => [...history].sort((a, b) =>
      (new Date(a.date).getTime() > new Date(b.date).getTime() ? -1 : 1)),
    [history]
  );

  return sortedTransactions;
};


