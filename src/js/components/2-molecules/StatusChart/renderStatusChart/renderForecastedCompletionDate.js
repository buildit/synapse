import moment from 'moment';
import { FORECAST_UPPER_BOUND } from './config';

module.exports = (containerElement, date, xOffset, yOffset) => {
  const message = date ?
  `Forecasted completion date: ${date.format('MMM DD, YYYY')}` :
  `Forecasted completion is beyond
  ${moment(FORECAST_UPPER_BOUND, 'DD-MM-YYYY').format('MMM DD, YYYY')}`;

  return (
    containerElement
    .append('g')
    .attr('class', 'forecasted-completion-date')
    .attr('transform', `translate(0, ${yOffset - 20})`)
    .append('text')
    .attr('text-anchor', 'start')
    .text(message)
  );
};
