import {
  addBalance,
  getTotalValuePerMonth,
  getValuesPerMonth
} from '../../../utils/countTransactions';
import {useSortTransactions} from '../../../hooks/useSortTransactions';
import style from './Dynamic.module.scss';
import PropTypes from 'prop-types';
import {Line} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import {useEffect, useMemo} from 'react';
import Select from 'react-select';
import {useDispatch, useSelector} from 'react-redux';
import {setYear} from '../../../features/yearSlice';

export const Dynamic = ({history, id, balance}) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  const dispatch = useDispatch();
  const {year} = useSelector(state => state.year);
  const sortedTransactions = useSortTransactions(history);
  const transactionsWithBalance = useMemo(() => addBalance(
    getTotalValuePerMonth(getValuesPerMonth(sortedTransactions), id),
    balance
  ), [sortedTransactions, balance, id]);

  const getYearsArr = () => {
    const years = new Set();
    transactionsWithBalance.forEach(item => {
      years.add(item.date.substring(0, 4));
    });
    return [...years];
  };

  const yearsArr = getYearsArr();

  useEffect(() => {
    if (!year.value) {
      dispatch(setYear({value: yearsArr[0], label: yearsArr[0]}));
    }
  }, [year.value, dispatch, yearsArr]);

  const filterYearToDisplay = (year) => transactionsWithBalance
    .filter(item => +item.date.substring(0, 4) === +year);

  const yearToDisplay = filterYearToDisplay(year.value);

  const data = {
    labels: yearToDisplay.map((item) => {
      const month = new Date(item.date).toLocaleString('ru', {
        month: 'short'
      });
      return month;
    }),
    datasets: [
      {
        label: '',
        data: yearToDisplay.map((item) => item.balance),
        backgroundColor: [
          '#392350',
        ],
        borderColor: '#B865D6',
        borderWidth: 5,
        color: '#C6B6D7',
      }
    ]
  };

  const selectCustomStyles = {
    option: (defaultStyles, state) => ({
      ...defaultStyles,
      padding: '5px',
      color: state.isSelected ? '#C6B6D7' : '#210B36',
      backgroundColor: state.isSelected ? '#9C19CA' : '#C6B6D7',
      transition: '0.2s ease-out',
      cursor: 'pointer',
    }),

    control: (defaultStyles) => ({
      ...defaultStyles,
      backgroundColor: '#392350',
      color: '#C6B6D7',
      padding: '15px',
      border: 'none',
      boxShadow: 'none',
    }),

    menuList: (defaultStyles) => ({
      ...defaultStyles,
      borderRadius: '5px',
    })
  };

  return (
    <div className={style.dinamicWrapper}>
      <div className={style.dynamic}>
        <div className={style.header}>
          <h3 className={style.title}>Динамика</h3>
          <span className={style.year}>{year.value}</span>

          <Select
            className={style.select}
            value={year}
            defaultValue={year}
            placeholder='Год'
            unstyled
            options={yearsArr.map(item => (
              {value: item, label: item}
            ))}
            onChange={(e) => dispatch(setYear(e))}
            styles={selectCustomStyles}
          />
        </div>

        <Line
          data={data}
          options={{
            plugins: {
              title: {
                display: false,
              },
              legend: {
                display: false
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
            scales: {
              y: {
                ticks: {
                  color: '#C6B6D7',
                  callback: (value) => value + ' ₽',
                  font: {
                    size: '15px',
                  },
                }
              },
              x: {
                ticks: {
                  color: '#C6B6D7',
                  font: {
                    size: '15px',
                  },
                },
                reverse: true
              }
            },
          }}
        />

      </div>
    </div>
  );
};

Dynamic.propTypes = {
  status: PropTypes.string,
  history: PropTypes.array,
  id: PropTypes.string,
  balance: PropTypes.number,
};
