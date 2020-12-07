import _ from "lodash";

import history from "../history";
import streams from "../api/streams";
import jsonPlaceHolder from "../api/jsonPlaceHolder";
import * as actionTypes from './types';

// export const fetchPosts = () => {
//     return async function (dispatch, getState) {
//         const response = await jsonPlaceHolder.get('/posts');
//         dispatch({type: 'FETCH_POST', payload: response});
//     };
// }

export const fetchPosts = () =>
     async (dispatch) => {
        const response = await jsonPlaceHolder.get('/posts');
        dispatch({type: 'FETCH_POSTS', payload: response.data});
    };


export const fetchUser = (id) => async dispatch => {
    const response = await jsonPlaceHolder.get(`/users/${id}`);
    dispatch({type: 'FETCH_USER', payload: response.data});
}

// // Memoization Example Start ---------!
// export const fetchUser = (id) => dispatch => {
//     _fetchUser(id, dispatch);
// }
//
// const _fetchUser = _.memoize(async (id, dispatch) => {
//     const response = await jsonPlaceHolder.get(`/users/${id}`);
//     console.log("user: ", response.data)
//     dispatch({type: 'FETCH_USER', payload: response.data});
// });
// // Memoization Example End -----!

// Another Approach for removing over fetching ----- !
// combine two actions
export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    // wait until fetching posts
    await dispatch(fetchPosts());
    // // take all userID by using lodash map function
    // const allIds = _.map(getState().posts, "userId");
    // take only unique userID by using lodash uniq function
    const userIds = _.uniq(_.map(getState().posts, "userId"));

    // for each id call fetch user action creator
    userIds.forEach(id => dispatch(fetchUser(id)));
}

export const signIn = (userId) => {
    return {
        type: actionTypes.SIGN_IN,
        payload: userId
    };
};

export const signOut = () => {
    return {
        type: actionTypes.SIGN_OUT
    };
};

export const createStream = formValues => async (dispatch, getState) => {
    const {userId} = getState().auth;
    const response = await streams.post('/streams', {...formValues, userId});
    dispatch({type: actionTypes.CREATE_STREAM, payload: response.data});
    history.push("/");
};

export const fetchStreams = () => async dispatch => {
    const response = await streams.get('/streams');
    dispatch({type: actionTypes.FETCH_STREAMS, payload: response.data});
};

export const fetchStream = (id) => async dispatch => {
    console.log("id.....: ", id);
    const response = await streams.get(`/streams/${id}`);
    dispatch({type: actionTypes.FETCH_STREAM, payload: response.data});
};

export const editStream = (id, formValues) => async dispatch => {
    const response = await streams.patch(`/streams/${id}`, formValues);
    dispatch({type: actionTypes.EDIT_STREAM, payload: response.data});
    history.push("/");
};

export const deleteStream = (id) => async dispatch => {
    await streams.delete(`/streams/${id}`);
    dispatch({type: actionTypes.DELETE_STREAM, payload: id});
    history.push("/");
};