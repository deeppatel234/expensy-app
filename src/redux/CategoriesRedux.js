import BaseRedux from './BaseRedux';

class CategoriesRedux extends BaseRedux {
  getConstants() {
    return {
      CATEGORIES_LOADING_ERROR: 'CATEGORIES_LOADING_ERROR',
      CATEGORIES_FETCH_DATA_SUCCESS: 'CATEGORIES_FETCH_DATA_SUCCESS',
      CATEGORIES_CREATE_DATA: 'CATEGORIES_CREATE_DATA',
      CATEGORIES_UPDATE_DATA: 'CATEGORIES_UPDATE_DATA',
      CATEGORIES_DELETE_DATA: 'CATEGORIES_DELETE_DATA',
    };
  }

  getActions() {
    const self = this;
    return {
      loadingError() {
        return {
          type: self.constants.CATEGORIES_LOADING_ERROR,
        };
      },
      fetchDataSuccess(categories) {
        return {
          type: self.constants.CATEGORIES_FETCH_DATA_SUCCESS,
          categories,
        };
      },
      create(category) {
        return {
          type: self.constants.CATEGORIES_CREATE_DATA,
          category,
        };
      },
      update(category) {
        return {
          type: self.constants.CATEGORIES_UPDATE_DATA,
          category,
        };
      },
      delete(category) {
        return {
          type: self.constants.CATEGORIES_DELETE_DATA,
          category,
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
      categoriesLoadingStatus(state = 'IN_PROGRESS', action) {
        switch (action.type) {
          case self.constants.CATEGORIES_LOADING_ERROR:
            return 'ERROR';
          case self.constants.CATEGORIES_FETCH_DATA_SUCCESS:
            return 'SUCCESS';
          default:
            return state;
        }
      },
      categories(state = {}, action) {
        switch (action.type) {
          case self.constants.CATEGORIES_FETCH_DATA_SUCCESS:
            return action.categories;
          case self.constants.CATEGORIES_UPDATE_DATA:
            return { ...state, ...action.categories };
          default:
            return state;
        }
      },
    };
  }
}

export default CategoriesRedux;