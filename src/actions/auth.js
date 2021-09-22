import *  as  api from '../api/index.js';
import {AUTH} from '../constants/actiontypes';

export const signin = (formdata,history) => async (dispatch) => {
try {
    //login page
    const {data} = await api.signIn(formdata);
    console.log(data);
    dispatch({type: AUTH,data});
    history.push('/');
} catch (error) {
    console.log(error);
}
}
export const signup = (formdata,history) => async (dispatch) => {
try {
    //signup page
    const {data} = await api.signUp(formdata);
    dispatch({type: AUTH,data});
    history.push('/');
} catch (error) {
    console.log(error);
}
}