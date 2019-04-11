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
      createSuccess(category) {
        return {
          type: self.constants.CATEGORIES_CREATE_DATA,
          category,
        };
      },
      create(category) {
        return (dispatch) => {
          return self.request.api({
            model: 'category',
            method: 'create',
            data: { record: category }
          }).then((apires) => {
            self.models.get('category').create(apires)
              .then((dbres) => dispatch(self.actions.createSuccess(dbres)))
          }).catch(() => {
            self.models.get('category').create(category)
              .then((dbres) => dispatch(self.actions.createSuccess(dbres)));
          });
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
          return self.request.api({
            model: 'category',
            method: 'read',
            data: { own: true },
          }).then((categories) => {
            console.tron.log(categories);
            dispatch(self.actions.fetchDataSuccess(categories));
          }).catch((err) => {
            console.tron.log(err);
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
      categories(state = [], action) {
        switch (action.type) {
          case self.constants.CATEGORIES_FETCH_DATA_SUCCESS:
            return [ ...action.categories ];
          case self.constants.CATEGORIES_CREATE_DATA:
            return [ ...state, action.category ];
          case self.constants.CATEGORIES_UPDATE_DATA:
            // TODO: handle this;
            return [ ...state, action.category ];
          default:
            return state;
        }
      },
    };
  }
}

export default CategoriesRedux;