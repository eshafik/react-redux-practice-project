import {combineReducers} from "redux";
import {reducer as formReducer} from "redux-form";

import postReducer from "./postReducer";
import userReducer from "./userReducer";
import authReducer from "./authReducer";
import streamReducer from "./streamReducer";

export default combineReducers({
    posts: postReducer,
    users: userReducer,
    auth: authReducer,
    form: formReducer,
    streams: streamReducer
});