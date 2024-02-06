import {
  useNavigate,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import {Root} from './routes/Root';
import {Login} from './Components/Login/Login';
import {AccountsList} from './Components/AccountsList/AccountsList';
import {Account} from './Components/Account/Account';
import {Exchange} from './Components/Exchange/Exchange';
import {useSelector} from 'react-redux';
import {useEffect} from 'react';
import {ErrorPage} from './routes/ErrorPage';

const App = () => {
  const {token} = useSelector(state => state.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  return (
    <Routes>
      <Route path='/' element={<Root />} >
        <Route index element={<AccountsList />} />
        <Route path='/login' element={<Login />} />
        <Route path='/account/:id' element={<Account />} />
        <Route path='/exchange' element={<Exchange />} />
        <Route path='*' element={<Navigate to='/error' />} />
        <Route path='/error' element={<ErrorPage />} />
      </Route>
    </Routes>
  );
};

export default App;
