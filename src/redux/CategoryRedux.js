import _keyBy from 'lodash/keyBy';
import BaseRedux from './BaseRedux';


class CategoriesRedux extends BaseRedux {

  syncComplete(categories) {
    this.dispatch(this.actions.fetchDataSuccess(categories));
  }

  getConstants() {
    return {
      CATEGORIES_FETCH_DATA_SUCCESS: 'CATEGORIES_FETCH_DATA_SUCCESS',
      CATEGORIES_CREATE_DATA: 'CATEGORIES_CREATE_DATA',
      CATEGORIES_UPDATE_DATA: 'CATEGORIES_UPDATE_DATA',
      CATEGORIES_DELETE_DATA: 'CATEGORIES_DELETE_DATA',
    };
  }

  getActions() {
    const self = this;
    return {
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
        return self.models.get('category').readAll().then((categories) => {
          self.dispatch(self.actions.fetchDataSuccess(categories));
        });
      },
    };
  }

  getReducers() {
    const self = this;
    return {
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
