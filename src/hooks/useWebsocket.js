import {useEffect, useState} from 'react';
import {WS_URL} from '../api/const';

export const useWebsocket = () => {
  const [rates, setRates] = useState([]);

  const handleMessage = (e) => {
    setRates(rates => [JSON.parse(e.data), ...rates].slice(0, 7));
  };

  const handleError = (error) => {
    console.log('error: ', error);
  };

  useEffect(() => {
    const websocket = new WebSocket(WS_URL);

    websocket.addEventListener('message', handleMessage);
    websocket.addEventListener('error', handleError);

    return () => {
      websocket.removeEventListener('message', handleMessage);
      websocket.removeEventListener('error', handleError);
      websocket.close();
    };
  }, []);

  return rates;
};
