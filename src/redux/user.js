import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from 'axios';
// ----------------------------------------------------------------------

let stakingHistory = [];
let withDrawHistory = [];
let teams = [];
let refBonus = [];
let stackingBonus = [];
let myRefferal = [];
const initializer = {
  stakingHistorySucess: false,
  stakingBonusSucess: false,
  refBonusSucess: false,
  withdrawHisSuccess: false,
  teamListSucess: false,
  RefBonusSucess: false,
  myRefferalSucess: false
};

const initialState = {
  isLoading: false,
  error: false,
  users: [],
  stakingHistory
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET USERS
    getStackingSuccess(state, action) {
      state.isLoading = false;
      state.stakingHistory = action.payload;
    },

    // GET MYTEAMS
    getTeamsSuccess(state, action) {
      state.isLoading = false;
      state.output = action.payload;
    }
  }
});

const baseUrl = process.env.PORT || 'http://localhost:3010/api';

// Reducer
export default slice.reducer;

// Actions
export const { onToggleFollow, deleteUser } = slice.actions;

// ----------------------------------------------------------------------

export async function getTeams() {
  if (!initializer.teamListSucess) {
    try {
      const accessToken = window.localStorage.getItem('accessToken');
      const headers = { Authorization: `Bearer ${accessToken}` };
      const response = await axios.get(`${baseUrl}/Team/MyTeam`, {
        headers
      });
      initializer.teamListSucess = true;
      teams = response.data;
    } catch (error) {
      console.log(error);
      initializer.teamListSucess = false;
    }
  }
  return teams;
}
// ----------------------------------------------------------------------
export async function getStakingBonus() {
  if (!initializer.stakingBonusSucess) {
    try {
      const accessToken = window.localStorage.getItem('accessToken');
      const headers = { Authorization: `Bearer ${accessToken}` };
      const response = await axios.get(`${baseUrl}/Earning/StakingBonus`, {
        headers
      });
      initializer.stakingBonusSucess = true;
      stackingBonus = response.data;
    } catch (error) {
      console.log(error);
      initializer.stakingBonusSucess = false;
    }
  }
  return stackingBonus;
}
// ----------------------------------------------------------------------
export async function getMyRefferal() {
  if (!initializer.myRefferalSucess) {
    try {
      const accessToken = window.localStorage.getItem('accessToken');
      const headers = { Authorization: `Bearer ${accessToken}` };
      const response = await axios.get(`${baseUrl}/Earning/StakingBonus`, {
        headers
      });
      initializer.myRefferalSucess = true;
      myRefferal = response.data;
    } catch (error) {
      console.log(error);
      initializer.myRefferalSucess = false;
    }
  }
  return myRefferal;
}
// ----------------------------------------------------------------------
export async function getRefBonus() {
  if (!initializer.RefBonusSucess) {
    try {
      const accessToken = window.localStorage.getItem('accessToken');
      const headers = { Authorization: `Bearer ${accessToken}` };
      const response = await axios.get(`${baseUrl}/Earning/StakingBonus`, {
        headers
      });
      initializer.RefBonusSucess = true;
      refBonus = response.data;
    } catch (error) {
      console.log(error);
      initializer.RefBonusSucess = false;
    }
  }
  return refBonus;
}
// ----------------------------------------------------------------------
export async function getWithdrawHistory() {
  if (!initializer.withdrawHisSuccess) {
    try {
      const accessToken = window.localStorage.getItem('accessToken');
      const headers = { Authorization: `Bearer ${accessToken}` };
      const response = await axios.get(`${baseUrl}/Withdraw/Summary`, {
        headers
      });
      initializer.withdrawHisSuccess = true;
      withDrawHistory = response.data;
    } catch (error) {
      console.log(error);
      initializer.withdrawHisSuccess = false;
    }
  }
  return withDrawHistory;
}
// ----------------------------------------------------------------------

export async function getStacking() {
  if (!initializer.stakingHistorySucess) {
    try {
      const accessToken = window.localStorage.getItem('accessToken');
      const headers = { Authorization: `Bearer ${accessToken}` };
      const response = await axios.get(`${baseUrl}/Staking/Summary`, {
        headers
      });
      initializer.stakingHistorySucess = true;
      stakingHistory = response.data;
    } catch (error) {
      console.log(error);
      initializer.stakingHistorySucess = false;
    }
  }
  return stakingHistory;
}

// ----------------------------------------------------------------------

export function getUsers() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios1.get('/api/user/all');
      dispatch(slice.actions.getUsersSuccess(response.data.users));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
