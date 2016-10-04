import { FETCH_PROJECT_STATUS_DATA } from './actions';

export const fetchStatusSuccess = status => ({
  type: 'FETCH_STATUS_SUCCESS',
  status,
});

export const fetchAllStatusData = name => ({
  type: FETCH_PROJECT_STATUS_DATA,
  name,
});
