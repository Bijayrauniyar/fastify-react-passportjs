import { AuthState } from 'app/containers/Auth/types';
import { ProfileState } from 'app/containers/Profile/types';
import { SettingState } from 'app/containers/Setting/types';
import { ReportState } from 'app/containers/Report/types';
import { ClientState } from 'app/containers/Client/types';
import { ProjectState } from 'app/containers/Project/types';
import { UserState } from 'app/containers/User/types';
import { LayoutState } from 'app/containers/Layout/types';
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  auth?: AuthState;
  profile?: ProfileState;
  setting?: SettingState;
  report?: ReportState;
  client?: ClientState;
  project?: ProjectState;
  user?: UserState;
  layout?: LayoutState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
