import {useDispatch, useSelector} from 'react-redux';
import {Button} from '../Common/Button/Button';
import style from './AccountsList.module.scss';
import {useEffect, useState} from 'react';
import {fetchAccountsList} from '../../features/accountsListSlice';
import {Card} from '../Card/Card';
import {Preloader} from '../Common/Preloader/Preloader';
import {
  clearNewAccountData,
  createAccount
} from '../../features/newAccountSlice';
import {AlertMessage} from '../Common/Alert/AlertMessage';
import Select from 'react-select';
import {sortAccounts} from '../../utils/sortAccounts';

export const AccountsList = () => {
  const {token, user} = useSelector(state => state.token);
  const {accountsList, status} = useSelector(state => state.accountsList);
  const {status: newAccountStatus} = useSelector(state => state.newAccount);
  const dispatch = useDispatch();
  const [sortValue, setSortValue] =
    useState({value: 'date', label: 'Дата открытия'});
  const sortedAccounts = sortAccounts(sortValue.value, accountsList);

  useEffect(() => {
    if (token) {
      dispatch(fetchAccountsList());
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (newAccountStatus === 'success') {
      dispatch(fetchAccountsList());

      setTimeout(() => {
        dispatch(clearNewAccountData());
      }, 5000);
    }
  }, [newAccountStatus, dispatch]);

  const handleClick = () => {
    dispatch(createAccount());
  };

  const options = [
    {value: 'date', label: 'Дата открытия'},
    {value: 'account', label: 'Номер счёта'},
    {value: 'balance', label: 'Баланс'},
    {value: 'last', label: 'Дата последней трансзакции'},
  ];

  const customStyles = {
    option: (defaultStyles, state) => ({
      ...defaultStyles,
      padding: '5px 5px 5px 10px',
      color: state.isSelected ? '#C6B6D7' : '#210B36',
      backgroundColor: state.isSelected ? '#9C19CA' : '#C6B6D7',
      transition: '0.2s ease-out',
      minWidth: '150px',
      cursor: 'pointer',
    }),

    control: (defaultStyles) => ({
      ...defaultStyles,
      backgroundColor: '#210B36',
      color: '#C6B6D7',
      padding: '10px',
      border: 'none',
      boxShadow: 'none',
      minWidth: '150px',
    }),

    menuList: (defaultStyles) => ({
      ...defaultStyles,
      borderRadius: '5px',
    }),
  };

  return (
    token && (
      <>
        <div className={style.container}>
          <h2 className={style.title}>Здравствуйте, {user}!</h2>
          <Button
            classname={style.button}
            type='button'
            text='Открыть новый счет'
            onClick={handleClick}
          />
          <div className={style.currencies}>
            <h3 className={style.currenciesTitle}>Мои счета</h3>
            <div className={style.sorting}>
              <span className={style.sortTitle}>
                Сортировка:
              </span>
              <div className={style.selectWrapper}>

                <Select
                  className={style.select}
                  options={options}
                  value={sortValue}
                  onChange={setSortValue}
                  unstyled
                  styles={customStyles}
                />

              </div>
            </div>

            {status === 'loading' && (
              <div className={style.preloaderContainer}>
                <Preloader size={80} />
              </div>
            )}

            <ul className={style.list}>
              {accountsList.length !== 0 && (
                sortedAccounts.map(account => (
                  <Card key={account.account} accountData={account} />
                ))
              )}
            </ul>
          </div>
        </div>

        {newAccountStatus === 'success' &&
          <AlertMessage text='Open new account success' error={false} />}
      </>
    )
  );
};
