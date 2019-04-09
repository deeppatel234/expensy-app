import Registry from '../../base/Registry';

import UserModel from './UserModel';
import CategoryModel from './CategoryModel';
import PaymentMethodModel from './PaymentMethodModel';
import TransactionModel from './TransactionModel';

class ModelRegistry extends Registry {
  initTables() {
    return Promise.all(Object.values(this.data).map(d => d.initTable()));
  }
}

const modelRegistry = new ModelRegistry();

modelRegistry.set('user', new UserModel());
modelRegistry.set('category', new CategoryModel());
modelRegistry.set('paymentmethod', new PaymentMethodModel());
modelRegistry.set('transaction', new TransactionModel());

export default modelRegistry;
