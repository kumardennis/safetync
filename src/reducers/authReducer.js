import { IS_SIGNED_IN } from '../actions/types';

const initialState = {
    isSignedIn: false
};
function authReducer(state = initialState, action) {
    if (action.type === IS_SIGNED_IN) {
        return {
            isSignedIn: action.payload
        };
    }
    return state;
}

export default authReducer;
