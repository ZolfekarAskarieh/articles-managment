/**
 * App Reducers
 */
import { combineReducers } from 'redux';
import authUserReducer from './AuthUserReducer';
import articlesReducer from './ArticlesReducer';

const reducers = combineReducers({
    authUser: authUserReducer,
    articlesReducer
});

export default reducers;