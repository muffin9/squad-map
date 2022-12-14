import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useLogin } from '@/hooks/useLogin';
import { getErrorMessage } from '@/utils/util';

const Callback = () => {
  const location = useLocation();
  const SNSLogin = useLogin();

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');
      const state = params.get('state');
      const locationsArr = location.pathname.split('/');
      SNSLogin(code || '', state || '', locationsArr[2]);
    } catch (err) {
      reportError({ message: getErrorMessage(err) });
    }
  }, [SNSLogin, location.pathname]);

  return <LoadingSpinner size="large" />;
};

export default Callback;
