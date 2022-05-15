import { makeAutoObservable } from 'mobx';
import axios from 'axios';
import { loginGoogle, logout } from '../containers/auth/api/crud';
import { parseJwt } from '../services/parseJwt';
import config from '../config/app.config';

export default class Store {
  user = {};

  isLogged = false;

  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setLoading(bool) {
    this.isLoading = bool;
  }

  setIsLogged(bool) {
    this.isLogged = bool;
  }

  setUser(user) {
    this.user = user;
  }

  async login(data) {
    try {
      const res = await loginGoogle(data);
      localStorage.setItem('token', res.data.accessToken);
      this.setIsLogged(true);
      this.setUser(parseJwt(res.data.accessToken));
    } catch (e) {
      console.log(e.res?.data?.message);
    }
  }

  async logout() {
    try {
      await logout();
      localStorage.removeItem('token');
      this.setIsLogged(false);
      this.setUser({});
    } catch (e) {
      console.log(e.res?.data?.message);
    }
  }

  async checkAuth() {
    this.setLoading(true);
    try {
      const res = await axios.get(`${config.apiURL}/auth/refresh`, { withCredentials: true });
      localStorage.setItem('token', res.data.accessToken);
      this.setIsLogged(true);
      this.setUser(res.data.user);
    } catch (e) {
      console.log(e.res?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }
}
