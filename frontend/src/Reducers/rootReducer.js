import { combineReducers } from 'redux';
import fromReducer from '../features/formSlice/formSlice'
// Combine all the reducers into a rootReducer
const rootReducer = combineReducers({
    form: fromReducer
    // other reducers can be added here
});

export default rootReducer;
