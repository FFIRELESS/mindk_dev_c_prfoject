import { createContext } from 'react';
import Store from './store/store';

const store = new Store();

const Context = createContext({ store });

export default Context;
