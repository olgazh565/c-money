import {useMemo, useState} from 'react';
import {useSortTransactions} from '../../../hooks/useSortTransactions';
import style from './Statistic.module.scss';
import PropTypes from 'prop-types';
import {getValuesPerMonth} from '../../../utils/countTransactions';
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {Doughnut} from 'react-chartjs-2';
import {useSelector} from 'react-redux';
import {
  countIncomeSpendingPerYear,
  countIncomeSpendingPerMonth
} from '../../../utils/countIncomeSpending';

export const Statistic = ({history, id, balance}) => {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const [selectedVal, setSelectedVal] = useState('year');
  const {value: year} = useSelector(state => state.year.year);
  const sortedTransactions = useSortTransactions(history);

  const incomeSpendArr = useMemo(() => (
    countIncomeSpendingPerMonth(
      getValuesPerMonth(sortedTransactions), id
    )), [sortedTransactions, id]);

  const [income, spending] =
    countIncomeSpendingPerYear(selectedVal, incomeSpendArr, year);

  const handleClick = (e) => {
    if (e.target.dataset.id) {
      setSelectedVal(e.target.dataset.id);
    }
  };

  const data = {
    labels: ['Доходы', 'Расходы'],
    datasets: [
      {
        label: '',
        data: [income, spending],
        backgroundColor: ['#4B00CA', '#B865D6'],
        borderColor: ['#4B00CA', '#B865D6'],
        borderWidth: 1,
        cutout: '80%',
        borderRadius: 20,
        offset: 10,
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: false,
      },
      tooltip: {
        titleFont: {
          size: 14
        },
        boxPadding: 10,
        bodySpacing: 15,
        padding: 15,
        footerMarginTop: 10,
        backgroundColor: '#210B36',
        callbacks: {
          label: (context) => context.formattedValue += ' ₽'
        }
      }
    },
  };

  return (
    <div className={style.statistic}>
      <h3 className={style.title}>Статистика</h3>
      <div className={style.dognutWrapper}>

        <div
          className={style.doughnutLabel}
          onClick={handleClick}
        >
          <p
            className={selectedVal === 'week' ? style.active : ''}
            data-id='week'>
            Неделя
          </p>
          <p
            className={selectedVal === 'month' ? style.active : ''}
            data-id='month'>
            Месяц
          </p>
          <p
            className={selectedVal === 'year' ? style.active : ''}
            data-id='year'>
            Год
          </p>
        </div>

        <div className={style.doughnutElement}>
          <Doughnut
            options={options}
            data={data}
            redraw={true}
          />
        </div>

        <div className={style.doughnutLegend}>
          <div className={style.heading}>
            <p>Баланс</p>
            <p className={style.doughnutLegendUp}>Доходы</p>
            <p className={style.doughnutLegendDown}>Расходы</p>
          </div>

          <div className={style.text}>
            <p>{balance.toLocaleString('ru')} ₽</p>
            <p>
              {Number(income?.toFixed(2)).toLocaleString('ru')} ₽
            </p>
            <p>
              {Number(spending?.toFixed(2)).toLocaleString('ru')} ₽
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

Statistic.propTypes = {
  history: PropTypes.array,
  status: PropTypes.string,
  id: PropTypes.string,
  balance: PropTypes.number,
};
