import store from '../store';

export interface User {
  email: string;
  first_name?: string;
  second_name?: string;
  first_surname?: string;
  second_surname?: string;
  profile_image?: string;
  phone?: string;
}

const AuthService = {
  isLoggedIn() {
    const userState = store.getState().user;
    return userState.isLoggedIn;
  },
  saveProfile(d: User) {
    const current_email = store.getState().user.email;
    const data = { ...d };
    let profiles = JSON.parse(localStorage.getItem('profiles') as string);
    if (!profiles) profiles = {};
    if (current_email !== data.email) {
      delete profiles[current_email];
    }
    const email = data.email;
    delete (data as any).email;
    profiles[email] = data;
    localStorage.setItem('profiles', JSON.stringify(profiles));
    store.dispatch({
      type: 'user/login',
      payload: {
        email,
      },
    });
  },
  user(): User {
    const user = store.getState().user;
    const profiles = JSON.parse(localStorage.getItem('profiles') as string);
    let user_profile: any = {};
    if (profiles && profiles[user.email]) {
      user_profile = profiles[user.email];
    }
    console.log('TYPEOF', typeof user_profile.profile_image);
    if (!user_profile.profile_image || typeof user_profile.profile_image === 'object') {
      user_profile.profile_image = '/img/img_perfil.png';
    }
    const user_f = { ...user, ...user_profile };
    console.log('USER F', user_f);
    return user_f;
  },
  login({ email }: { email: string }) {
    store.dispatch({
      type: 'user/login',
      payload: {
        email,
      },
    });
  },
  logout() {
    store.dispatch({
      type: 'user/logout',
    });
  },
  setLoggedIn() {
    const email = localStorage.getItem('email');
    if (email) {
      store.dispatch({
        type: 'user/login',
        payload: {
          email,
        },
      });
    }
  },
};

export default AuthService;
