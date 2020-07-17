/* --- STATE --- */
export interface ProfileState {
  user: any;
  loading: boolean;
  error?: string | null;
}

export type ContainerState = ProfileState;

export interface User {}
//   admin: boolean;
//   _id: string;
//   businessPhones: string;
//   displayName: string;
//   givenName: string;
//   jobTitle: string;
//   mail: string;
//   mobilePhone: string | null;
//   officeLocation: string;
//   preferredLanguage: string | null;
//   surname: string;
//   userPrincipalName: string;
//   providerId: string;
//   authProvider: string;
//   manager: string;
//   __v: number;
// }
