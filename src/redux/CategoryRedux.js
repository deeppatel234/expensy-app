import _keyBy from 'lodash/keyBy';
import BaseRedux from './BaseRedux';


class CategoriesRedux extends BaseRedux {

  syncComplete(categories) {
    this.dispatch(this.actions.fetchDataSuccess(categories));
  }

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
          return self.models.get('category').create(category, true)
            .then((dbRes) => dispatch(self.actions.createSuccess(dbRes)));
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
          return self.models.get('category').readAll().then((categories) => {
            dispatch(self.actions.fetchDataSuccess(categories));
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
            return _keyBy(action.categories, '_id');
          case self.constants.CATEGORIES_CREATE_DATA:
            return { ...state, [action.category._id] : action.category };
          case self.constants.CATEGORIES_UPDATE_DATA:
            // TODO: handle this;
            return state;
          default:
            return state;
        }
      },
    };
  }
}

export default CategoriesRedux;
