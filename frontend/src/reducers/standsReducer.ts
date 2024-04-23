import { fetchReleaseStand } from '../api/fetchReleaseStand';
import {
  LeaveStandInitAction,
  LeaveStandErrorAction,
  LeaveStandSuccessAction,
  //Stand,
  StandsAction,
  StandsState,
  TakeStandAction,
} from '../types';

const leaveStandSuccess = (standId: string): LeaveStandSuccessAction => ({
  type: 'LEAVESTAND_SUCCESS',
  payload: parseInt(standId),
});


const leaveStandError = (errorMessage: string): LeaveStandErrorAction => ({
  type: 'LEAVESTAND_ERROR',
  payload: errorMessage,
});

const initialStandsState: StandsState = {
  stands: [],
};

export const standsReducer = (
  state: StandsState = initialStandsState,
  action: StandsAction | TakeStandAction | LeaveStandInitAction | LeaveStandSuccessAction | LeaveStandErrorAction,
  asyncDispatch: any 
) => {
  switch (action.type) {
    case 'SETSTANDS':
      return {
        ...state,
        stands: action.payload,
      };
    case 'TAKESTAND': {
      const { user, id } = action.payload;
      const standIdx = state.stands.findIndex((stand) => stand.id === id);
      const newStands = [...state.stands];
      newStands[standIdx] = {
        ...newStands[standIdx],
        takenBy: user,
      };
      return {
        ...state,
        stands: newStands,
      };
    }
    case 'LEAVESTAND_INIT': {
      const id = action.payload;
      const user = localStorage.getItem('user');
      if (user !== null) {
      fetchReleaseStand(id, user)
      .then((standId: string) => asyncDispatch(leaveStandSuccess(standId)))
      .catch((e: any) => asyncDispatch(leaveStandError(e.message)));
    } else {
      console.error();
    }
      return state;
    }

    case 'LEAVESTAND_SUCCESS': {
      const id = action.payload;
      return {
        ...state,
        stands: state.stands.map(stand => {
          if (stand.id === id) {
            return { ...stand, takenBy: null };
          }
          return stand;
        }),
      };
    }
    default:
      return state;
  }
};

