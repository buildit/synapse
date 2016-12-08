import React, { PropTypes } from 'react';
import moment from 'moment';

const EventHistory = ({ events = [] }) => {
  if (events.length > 0) {
    return (
      <div className="event-history">
        <h2>Project event history</h2>
        <table className="table">
          <thead>
            <tr className="tableHeaderRow">
              <th className="tableHeaderCell">Date</th>
              <th className="tableHeaderCell">Type</th>
              <th className="tableHeaderCell">Status</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr key={`key-${index}`}>
                <td key={'date'}><span
                  className="row"
                >{moment(event.startTime).format('MMM DD, YYYY HH:mm')}</span></td>
                <td key={'event'}><span className="row">{event.type}</span></td>
                <td key={'status'}><span className="row">{event.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return <div className="event-history"></div>;
};

export default EventHistory;

EventHistory.propTypes = {
  events: PropTypes.array,
};
