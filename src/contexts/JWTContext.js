/* eslint-disable no-const-assign */
import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
// utils
import axios from 'axios';
import { isValidToken, setSession } from '../utils/jwt';
// ----------------------------------------------------------------------

const baseUrl = 'http://localhost:3010/api';

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  }
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const AuthContext = createContext({
  ...initialState,
  method: 'jwt',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve()
});

AuthProvider.propTypes = {
  children: PropTypes.node
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const token = window.localStorage.getItem('token');
        if (token && isValidToken(token)) {
          setSession(token);
          const headers = { Authorization: `Bearer ${token}` };
          const response = await axios.get(`${baseUrl}/Dashboard`, {
            headers
          });
          // console.log(response.data.data);
          const { data } = response.data;

          const user = {
            id: data.member_user_id,
            member_name: data.member_name,
            email: data.email,
            photoURL: '/static/mock-images/avatars/avatar_default.jpg',
            phoneNumber: data.contact,
            country: 'United States',
            address: '90210 Broadway Blvd',
            state: 'California',
            city: 'San Francisco',
            zipCode: '94116',
            about: 'Praesent turpis. Phasellus viverra nulla ut metus varius laoreet. Phasellus tempus.',
            role: 'admin',
            isPublic: true
          };

          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user
            }
          });
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null
            }
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null
          }
        });
      }
    };

    initialize();
  }, []);

  const login = async (userId, password) => {
    const response = await axios.post(`${baseUrl}/auth/login`, {
      email: userId,
      password
    });
    console.log(response.data);
    const { data } = response;
    const { token } = data;

    const user = {
      id: data.user.member_user_id,
      member_name: data.user.member_name,
      email: data.user.email,
      photoURL: '/static/mock-images/avatars/avatar_default.jpg',
      phoneNumber: data.user.contact,
      country: 'United States',
      address: '90210 Broadway Blvd',
      state: 'California',
      city: 'San Francisco',
      zipCode: '94116',
      about: 'Praesent turpis. Phasellus viverra nulla ut metus varius laoreet. Phasellus tempus.',
      role: 'admin',
      isPublic: true
    };

    setSession(token);
    dispatch({
      type: 'LOGIN',
      payload: {
        user
      }
    });
  };

  const changePassword = async (values) => {
    const token = window.localStorage.getItem('token');
    const response = await axios({
      method: 'put',
      url: `${baseUrl}/login`,
      headers: { authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      data: values
    });
    return response.data;
  };

  // const register = async (memberName, contactNo, password, cpassword, email) => {
  //   const response = await axios.post(`${baseUrl}/register`, {
  //     member_name: memberName,
  //     contactNo,
  //     password,
  //     cpassword,
  //     email
  //   });
  //   const { userId } = response.data;

  //   window.localStorage.setItem('accessToken', accessToken);
  //   dispatch({
  //     type: 'REGISTER',
  //     payload: {
  //       user
  //     }
  //   });
  // };

  const logout = async () => {
    setSession(null);
    dispatch({ type: 'LOGOUT' });
  };

  const resetPassword = () => {};

  const updateProfile = async (values) => {
    const token = window.localStorage.getItem('token');
    console.log(values, 'values from jwt comtext');
    try {
      const responseUpdateProfile = await axios({
        method: 'put',
        url: `${baseUrl}/Account/EditProfile`,
        headers: { authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        data: values
      });
      return responseUpdateProfile.data;
      // const responseUpdateProfile = await axios.post('http://localhost:3000/api/Account/EditProfile', values, config);
    } catch (error) {
      console.error(error.response.data); // Log the error response data to the console
      return error.response.data;
    }
  };
  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout,
        resetPassword,
        changePassword,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
