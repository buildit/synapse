import { SET_IS_NEW_PROJECT } from 'actions/actions';

const initialValue = false;

const isNewProject = (state = initialValue, action) => {
  switch (action.type) {
  case SET_IS_NEW_PROJECT: return action.value;
  default: return state;
  }
};

export default isNewProject;
