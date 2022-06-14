import { Cookies } from 'react-cookie';
import request from 'umi-request';

export default class JWT {
  private Cookies = new Cookies();

  public getAccess(): string {
    return this.Cookies.get('access');
  }

  public setAccess(access: string): void {
    this.Cookies.set('access', access);
  }

  public removeAccess(): void {
    this.Cookies.remove('access');
  }

  public getRefresh(): string {
    return this.Cookies.get('refresh');
  }

  public setRefresh(refresh: string): void {
    this.Cookies.set('refresh_token', refresh);
  }

  public removeRefresh(): void {
    this.Cookies.remove('refresh_token');
  }

  public removeAllJWT(): void {
    this.removeAccess();
    this.removeRefresh();
  }

  public refreshAccessToken(token: string) {
    console.log('sdsd');
    return request.get('provider/refreshToken', {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}
