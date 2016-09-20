import {
  UPDATE_PROJECTION_ITERATION_LENGTH,
  UPDATE_PROJECTION_START_DATE,
  SET_HAS_PROJECTION,
  SET_MESSAGE,
} from './actions';
import errorHelper from '../helpers/errorHelper';

/* eslint-disable import/no-unresolved */
const defaultConfig = require('./default.json');
/* eslint-enable import/no-unresolved */
const apiBaseUrl = defaultConfig.parameters.api.baseUrl;
const fetch = require('./fetch');

const fetchStatusSuccess = status => ({
  type: 'FETCH_STATUS_SUCCESS',
  status,
});

const handleProjectionData = (projection, dispatch) => {
  dispatch({
    type: 'UPDATE_PROJECTION_BACKLOG_SIZE',
    value: projection.backlogSize,
  });
  dispatch({
    type: 'UPDATE_PROJECTION_VELOCITY_START',
    value: projection.startVelocity,
  });
  dispatch({
    type: 'UPDATE_PROJECTION_VELOCITY_MIDDLE',
    value: projection.targetVelocity,
  });
  dispatch({
    type: 'UPDATE_PROJECTION_VELOCITY_END',
    value: projection.endVelocity,
  });
  dispatch({
    type: 'UPDATE_PROJECTION_PERIOD_START',
    value: projection.startIterations,
  });
  dispatch({
    type: 'UPDATE_PROJECTION_PERIOD_END',
    value: projection.endIterations,
  });
  dispatch({
    type: 'UPDATE_PROJECTION_DARK_MATTER',
    value: projection.darkMatterPercentage,
  });
  dispatch({
    type: UPDATE_PROJECTION_ITERATION_LENGTH,
    value: projection.iterationLength,
  });
  dispatch({
    type: UPDATE_PROJECTION_START_DATE,
    value: projection.startDate,
  });
  dispatch({
    type: SET_HAS_PROJECTION,
    value: true,
  });
};

const handleStatusData = (data, dispatch) => {
  const demand = JSON.parse(data[0]);
  const defect = JSON.parse(data[1]);
  const effort = JSON.parse(data[2]);
  const project = JSON.parse(data[3]);

  dispatch(fetchStatusSuccess({
    demand,
    defect,
    effort,
  }));

  if (project.projection) {
    handleProjectionData(project.projection, dispatch);
  }

  dispatch({
    type: 'FETCH_PROJECT_SUCCESS',
    project,
  });

  dispatch({
    type: 'FETCH_END',
  });
};

export const fetchAllStatusData = name => dispatch => {
  dispatch({ type: 'FETCH_START' });

  return Promise.all([
    fetch(`${apiBaseUrl}v1/project/${name}/demand/summary`),
    fetch(`${apiBaseUrl}v1/project/${name}/defect/summary`),
    fetch(`${apiBaseUrl}v1/project/${name}/effort/summary`),
    fetch(`${apiBaseUrl}v1/project/${name}`),
  ]).then(data => handleStatusData(data, dispatch))
    .catch(response => {
      const message = errorHelper(response);
      dispatch({
        type: SET_MESSAGE,
        message,
      });
      dispatch({
        type: 'FETCH_END',
      });
    });
};
