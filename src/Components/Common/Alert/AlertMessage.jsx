import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import AlertTitle from '@mui/material/AlertTitle';
import PropTypes from 'prop-types';
import {useState} from 'react';
import {createPortal} from 'react-dom';

export const AlertMessage = ({text, error = true, dir = 'down'}) => {
  const [open, setOpen] = useState(true);
  let textMessage;

  switch (text) {
    case 'No such user':
      textMessage = 'Пользователя с таким логином не существует';
      break;
    case 'Invalid password':
      textMessage = 'Неверный пароль';
      break;
    case 'Invalid route':
      textMessage = 'Неверный URL-адрес запроса';
      break;
    case 'Invalid account to':
      textMessage = 'Неверно указан номер счета получателя';
      break;
    case 'Overdraft prevented':
      textMessage = 'Сумма перевода превышает остаток по счету';
      break;
    case 'Transfer success':
      textMessage = 'Перевод осуществлен успешно';
      break;
    case 'Invalid account from':
      textMessage = 'Перевод с данного счета невозможен';
      break;
    case 'Open new account success':
      textMessage = 'Новый счет открыт!';
      break;
    case 'Invalid request':
      textMessage = 'Неверный запрос, проверьте выбранные валюты для обмена';
      break;
    case 'Not enough currency':
      textMessage = 'Недостаточно валюты на счете списания';
      break;
    case 'Exchange success':
      textMessage = 'Конверсия осуществлена успешно';
      break;
    default:
      textMessage = 'Ошибка, пожалуйста, попробуйте снова';
      break;
  }

  return createPortal(
    <Box sx={{
      width: '580px',
      position: 'absolute',
      top: dir === 'down' ? '70px' : 'unset',
      bottom: dir === 'up' ? '50px' : 'unset',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 10,
      fontFamily: 'Nunito'
    }}>
      <Slide
        direction={dir}
        in={open}
        mountOnEnter
        unmountOnExit
        timeout={{enter: 200, exit: 300}}
        addEndListener={() => {
          setTimeout(() => {
            setOpen(false);
          }, 3000);
        }}
      >
        <Alert
          severity={error ? 'error' : 'success'}
          variant='filled'
          sx={{mb: 2, fontFamily: 'Nunito'}}
        >
          <AlertTitle>{error ? 'Ошибка' : 'Успешно!'}</AlertTitle>
          {textMessage}
        </Alert>
      </Slide>
    </Box>,
    document.getElementById('root')
  );
};

AlertMessage.propTypes = {
  text: PropTypes.string,
  error: PropTypes.bool,
  dir: PropTypes.string,
};
