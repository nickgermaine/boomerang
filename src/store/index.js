import {createStore} from 'redux';
import { createMigrate, persistReducer, persistStore} from 'redux-persist';
import storage from "redux-persist/lib/storage";
import createEncryptor from 'redux-persist-transform-encrypt';
import {defaultState} from './reducers/appReducer';
import Reducers from './reducers';
import Middleware from './middleware';
import * as AppActions from './actions/appActions';

const encryptor = createEncryptor({
    secretKey: 'a7d329d37fac06686a3f306e7be7c716b3411d3a'
});

const migrations = {
    0: (state) => {
        return {
            ...state,
            app: defaultState
        }
    },
    1: (state) => {
        return {
            app: state.app
        }
    }
};
const persistedReducer = persistReducer({
    key: 'store',
    storage: storage,
    transforms: [encryptor],
    // whitelist: ['auth']
    version: 0,
    migrate: createMigrate(migrations, {debug: false})
}, Reducers);

export default () => {
    const store = createStore(
        persistedReducer,
        undefined,
        Middleware
    );

    const persistor = persistStore(store, null, () => {
        store.dispatch(AppActions.setRehydrationComplete());
    });

    return {store, persistor};
};