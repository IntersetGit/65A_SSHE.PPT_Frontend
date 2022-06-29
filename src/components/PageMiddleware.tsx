import { useEffect } from 'react';
import { history, useModel } from 'umi';
const PageMiddleware: React.FC = ({ children }) => {
  const { initialState } = useModel('@@initialState');
  useEffect(() => {
    const { location } = history;
    console.log(location, initialState?.userInfo);
    if (!initialState?.userInfo && location.pathname !== '/login') {
      history.push('/login');
    }
  }, []);
  console.log('PageMiddleware');
  return <>{children}</>;
};

export default PageMiddleware;
