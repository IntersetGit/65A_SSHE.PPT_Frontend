import axios from 'axios';
import { Cookies } from 'react-cookie';

const API_PATH = {
  DEVELOPMENT: 'http://localhost:8000/api/',
  PRODUCTION: 'http://nonpemdsshe-ai.pttplc.com/api/',
};

export default class JWT {
  private Cookies = new Cookies();

  public getAccess(): string {
    return this.Cookies.get('access');
  }

  public setAccess(access: string): void {
    this.Cookies.set('access', access, { path: '/' });
  }

  public removeAccess(): void {
    this.Cookies.remove('access', { path: '/' });
  }

  public getRefresh(): string {
    return this.Cookies.get('refresh_token');
  }

  public setRefresh(refresh: string): void {
    this.Cookies.set('refresh_token', refresh, { path: '/' });
  }

  public removeRefresh(): void {
    this.Cookies.remove('refresh_token', { path: '/' });
  }

  public removeAllJWT(): void {
    this.removeAccess();
    this.removeRefresh();
  }

  public refreshAccessToken() {
    return axios({
      url: `${
        process.env.NODE_ENV === 'development'
          ? API_PATH.DEVELOPMENT
          : API_PATH.PRODUCTION
      }provider/refreshToken`,
      method: 'get',
      headers: { Authorization: 'Bearer ' + this.getRefresh() },
    });

    // request.get('provider/refreshToken', {
    //     prefix: process.env.NODE_ENV === 'development' ? API_PATH.DEVELOPMENT : API_PATH.PRODUCTION,
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${this.getRefresh()}`
    //     }
    // })
  }
}
