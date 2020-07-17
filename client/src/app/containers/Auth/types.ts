/* --- STATE --- */
import * as Msal from 'msal';
export interface AuthState {
  loading: boolean;
  error?: string | null | any;
  isAuthenticated: boolean;
  authResponse: any | null;
  token: string | null;
}

export type ContainerState = AuthState;
