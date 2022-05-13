import { createContext } from 'react';

const authContext = createContext({
  isLogged: false,
  id: 0,
});

export default authContext;
