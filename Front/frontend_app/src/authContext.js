import { createContext } from 'react';

const authContext = createContext({
  isLogged: false,
});

export default authContext;
