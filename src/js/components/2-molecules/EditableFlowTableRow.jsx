import React, { PropTypes } from 'react';
import Badge from '../1-atoms/Badge';
import Link from '../1-atoms/Link';

const EditableFlowTableRow = React.createClass({
  propTypes: {
    item: PropTypes.object.isRequired,
    actions: PropTypes.array.isRequired,
    index: PropTypes.number.isRequired,
  },

  onClick() {
    this.props.actions[0].onClick(this.props.index);
  },

  render() {
    const item = this.props.item;
    const actions = this.props.actions;
    return (
      <tr>
        <td>
          <Badge label={(this.props.index + 1).toString()} />
        </td>
        <td>
          <span>{item.name}</span>
        </td>
        <td>
          {
            actions.map((action, actionIndex) => (
              <Link
                label={action.label}
                key={actionIndex}
                onClick={this.onClick}
                id={actionIndex + action.label}
              />
            ))
          }
        </td>
      </tr>
    );
  },
});

export default EditableFlowTableRow;
