import { useNavigate } from 'react-router-dom';

function logOut() {
  const navigate = useNavigate();
  localStorage.clear();
  navigate('/login');
}

export default logOut;
