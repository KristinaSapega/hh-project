import {
  LeaveStandAction,
  Stand,
  StandsAction,
  StandsState,
  TakeStandAction,
} from '../types';

const initialStandsState: StandsState = {
  stands: [],
};

const GIVE_STANDS = 'SETSTANDS';
const TAKE_STAND = 'TAKESTAND';
const LEAVE_STAND = 'LEAVESTAND';

const giveStands = (stands: Stand[]): StandsAction => ({
  type: GIVE_STANDS,
  payload: stands,
});

const takeStand = (user: string, id: number): TakeStandAction => ({
  type: TAKE_STAND,
  payload: {
    user,
    id,
  },
});

const leaveStand = (id: number): LeaveStandAction => ({
  type: LEAVE_STAND,
  payload: id,
});

const standsReducer = (
  state: StandsState = initialStandsState,
  action: StandsAction | TakeStandAction | LeaveStandAction,
) => {
  switch (action.type) {
    case GIVE_STANDS:
      return {
        ...state,
        stands: action.payload,
      };
    case TAKE_STAND: {
      const { user, id } = action.payload as { user: string; id: number };
      const stand = state.stands.find((stand) => stand.id === id);
      if (stand) {
        stand.takenBy = user;
      }
      return state;
    }
    case LEAVE_STAND: {
      const id = action.payload;
      const stand = state.stands.find((stand) => stand.id === id);
      if (stand) {
        stand.takenBy = '';
      }
      return state;
    }
    default:
      return state;
  }
};

export { giveStands, takeStand, leaveStand, standsReducer };
