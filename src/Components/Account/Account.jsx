import style from './Account.module.scss';
import BackSvg from '../../assets/back.svg?react';
import {Button} from '../Common/Button/Button';
import {useNavigate, useParams} from 'react-router-dom';
import {Dynamic} from './Dynamic/Dynamic';
import {History} from './History/History';
import {Transaction} from './Transaction/Transaction';
import {Statistic} from './Statistic/Statistic';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {fetchAccount} from '../../features/accountSlice';
import {Preloader} from '../Common/Preloader/Preloader';
import {clearTransferData} from '../../features/transferFundsSlice';
import {clearYear} from '../../features/yearSlice';

export const Account = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {id} = useParams();
  const {account, status} = useSelector(state => state.account);
  const {
    transferData,
    status: transferStatus
  } = useSelector(state => state.transferFunds);
  const {year} = useSelector(state => state.year);
  const transactions = transferData?.transactions?.length ?
    transferData.transactions : account.transactions;
  const balance = transferData?.balance ?
    transferData.balance : account.balance;

  useEffect(() => {
    if (id) {
      dispatch(fetchAccount(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (account.account !== id && transferStatus === 'success') {
      dispatch(clearTransferData());
    }
  }, [account.account, dispatch, id, transferStatus]);

  useEffect(() => {
    if (year.value && account.account !== id) {
      dispatch(clearYear());
    }
  }, [account.account, dispatch, id, year]);

  return (
    <>
      <div className={style.container}>
        {status === 'success' && (
          <>
            <div className={style.header}>
              <div>
                <h2 className={style.title}>{id}</h2>
                <p className={style.text}>
                  Баланс: {balance.toLocaleString('ru')} ₽
                </p>
              </div>
              <Button
                classname={style.button}
                type='button'
                text='Вернуться'
                onClick={() => navigate(-1)}
              >
                <BackSvg />
              </Button>
            </div>

            {account.transactions.length !== 0 ? (
              <>
                <Dynamic
                  history={transactions}
                  id={id}
                  balance={balance}
                />
                <History
                  status={status}
                  history={transactions}
                  id={id}
                />
                <Statistic
                  history={transactions}
                  id={id}
                  balance={balance}
                />
                <Transaction id={id} />
              </>
            ) : <p>По счету отсутствует движение средств</p>}
          </>
        )}
      </div>

      {status === 'loading' &&
        <Preloader size={100}
          wrapperStyle={{
            width: '100%',
            justifyContent: 'center',
            paddingTop: '50px',
          }}
        />
      }
    </>
  );
};

