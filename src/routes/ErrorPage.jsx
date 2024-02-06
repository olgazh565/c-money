import {useEffect, useState} from 'react';
import {useRef} from 'react';
import {useNavigate} from 'react-router-dom';

export const ErrorPage = () => {
  const navigate = useNavigate();
  const timerIdRef = useRef(null);
  const timerIdRef2 = useRef(null);
  const [timer, setTimer] = useState(5);

  useEffect(() => {
    timerIdRef.current = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => {
      clearInterval(timerIdRef.current);
    };
  }, [navigate]);

  useEffect(() => {
    timerIdRef2.current = setInterval(() => {
      setTimer(timer => timer - 1);
    }, 1000);

    return () => {
      clearInterval(timerIdRef.current);
    };
  }, []);

  return (
    <h3 style={{paddingTop: '30px', textAlign: 'center'}}>
      Такой страницы не существует. <br></br>
      Через {timer} секунд вы будете переправлены на главную страницу
    </h3>
  );
};
