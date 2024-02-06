import style from './History.module.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {nanoid} from '@reduxjs/toolkit';
import {formatDate} from '../../../utils/formatData';
import {Preloader} from '../../Common/Preloader/Preloader';
import {useSortTransactions} from '../../../hooks/useSortTransactions';

export const History = ({status, history, id}) => {
  const sortedTransactions = useSortTransactions(history);

  return (
    <div className={style.history}>
      <h3 className={style.title}>История переводов</h3>

      <div className={style.container}>
        {status === 'success' && (
          <table className={style.table}>
            <thead className={style.thead}>
              <tr>
                <th className={style.th}>Счет</th>
                <th className={style.th}>Сумма</th>
                <th className={style.th}>Дата</th>
              </tr>
            </thead>
            <tbody className={style.tbody}>

              {sortedTransactions.map(item => (
                <tr key={nanoid()} className={style.trow}>
                  <td className={style.td}>
                    {item.to === id ? item.from : item.to}
                  </td>
                  <td className={
                    classNames(
                      style.td,
                      style.tdMiddle,
                      item.to !== id && style.sumMinus
                    )
                  }>
                    {item.to === id ? '+' : '-'}
                    {item.amount}
                  </td>
                  <td className={classNames(style.td, style.tdDate)}>
                    {formatDate(item.date)}
                  </td>
                </tr>
              ))
              }
            </tbody>
          </table>
        )}
        {status === 'loading' && (
          <Preloader
            size={80}
            wrapperStyle={{
              width: '100%',
              justifyContent: 'center',
              paddingTop: '20px'
            }}
          />
        )}

      </div>
    </div>
  );
};

History.propTypes = {
  status: PropTypes.string,
  history: PropTypes.array,
  id: PropTypes.string,
};
