import { combineReducers } from 'redux';
import backlogSize from './backlogSize';
import darkMatter from './darkMatter';
import iterationLength from './iterationLength';
import periodStart from './periodStart';
import periodEnd from './periodEnd';
import startDate from './startDate';
import velocityEnd from './velocityEnd';
import velocityMiddle from './velocityMiddle';
import velocityStart from './velocityStart';

const reducers = {
  backlogSize,
  darkMatter,
  iterationLength,
  periodStart,
  periodEnd,
  startDate,
  velocityStart,
  velocityMiddle,
  velocityEnd,
};

const combinedReducers = combineReducers(reducers);
export default combinedReducers;
