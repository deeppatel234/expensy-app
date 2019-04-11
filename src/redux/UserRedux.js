import BaseRedux from './BaseRedux';

class UserRedux extends BaseRedux {
  getConstants() {
    return {
      USER_LOADING_ERROR: 'USER_LOADING_ERROR',
      USER_FETCH_DATA_SUCCESS: 'USER_FETCH_DATA_SUCCESS',
      USER_UPDATE_DATA: 'USER_UPDATE_DATA',
    };
  }

  getActions() {
    const self = this;
    return {
      loadingError() {
        return {
          type: self.constants.USER_LOADING_ERROR,
        };
      },
      fetchDataSuccess(user) {
        return {
          type: self.constants.USER_FETCH_DATA_SUCCESS,
          user,
        };
      },
      update(user) {
        return {
          type: self.constants.USER_UPDATE_DATA,
          user,
        };
      },
      fetch() {
        return (dispatch) => {
          return self.request.api({ model: 'user', method: 'myinfo' }).then((user) => {
            self.models.get('user').replaceOrCreate(user)
              .then(() => dispatch(self.actions.fetchDataSuccess(user)))
              .catch(() => dispatch(self.actions.loadingError()));
          }).catch(() => {
            self.models.get('user').getUser()
              .then((user) => dispatch(self.actions.fetchDataSuccess(user)))
              .catch(() => dispatch(self.actions.loadingError()));
          });
        };
      },
    };
  }

  getReducers() {
    const self = this;
    return {
      userLoadingStatus(state = 'IN_PROGRESS', action) {
        switch (action.type) {
          case self.constants.USER_LOADING_ERROR:
            return 'ERROR';
          case self.constants.USER_FETCH_DATA_SUCCESS:
            return 'SUCCESS';
          default:
            return state;
        }
      },
      user(state = {}, action) {
        switch (action.type) {
          case self.constants.USER_FETCH_DATA_SUCCESS:
            return action.user;
          case self.constants.USER_UPDATE_DATA:
            return { ...state, ...action.user };
          default:
            return state;
        }
      },
    };
  }
}

export default UserRedux;