import BasicModel from '../BasicModel';

class CategoryModel extends BasicModel {
  tableName() {
    return 'category';
  }

  initFields() {
    return {
      sid: 'TEXT UNIQUE',
      name: 'TEXT NOT NULL',
      icon: 'TEXT NOT NULL',
    };
  }
}

export default CategoryModel;
