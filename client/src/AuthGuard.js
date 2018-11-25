import store from './store';

export default (to, from, next) => {
  if (!store.getters.user) {
    next({
      path: '/registreren'
    });
  } else {
    next();
  }
};
