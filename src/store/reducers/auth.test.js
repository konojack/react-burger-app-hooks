import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
    const initialState = {
        token: null,
        userId: null,
        error: null,
        loading: false,
        authRedirectPath: '/'
    }

    it('should return the inital state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    })

    it('should store the token upon login', () => {
        expect(reducer(initialState, {
            type: actionTypes.AUTH_SUCCESS,
            idToken: 'some-token',
            userId: 'someUserid'
        })).toEqual({
            token: 'some-token',
            userId: 'someUserid',
            error: null,
            loading: false,
            authRedirectPath: '/'
        })
    })
});