import style from './Card.module.scss';
import {NavLink} from 'react-router-dom';
import {formatDate} from '../../utils/formatData';
import PropTypes from 'prop-types';

export const Card = ({accountData}) => {
  const {
    account,
    balance,
    date: accountOpenDate,
    transactions,
  } = accountData;

  return (
    <li className={style.card}>
      <NavLink to={`/account/${account}`}>
        <p className={style.id}>{account}</p>
        <p className={style.balance}>{balance.toLocaleString('ru')}</p>
        <div className={style.info}>
          <div>
            {accountOpenDate && (
              <>
                <p>открыт</p>
                <p>{formatDate(accountOpenDate)}</p>
              </>
            )}
          </div>
          <div>
            <p>последняя операция</p>
            <time dateTime={transactions[0]?.date || ''}>
              {transactions[0]?.date ?
                formatDate(transactions[0]?.date) : 'операций не было'}
            </time>
          </div>
        </div>
      </NavLink>
    </li>
  );
};


Card.propTypes = {
  accountData: PropTypes.object,
};
