import React, { PropTypes } from 'react';
import Link from '../1-atoms/Link';

const EditableRoleTableRow = React.createClass({
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
          <span>{item.name}</span>
        </td>
        <td>
          <span>{item.groupWith}</span>
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

export default EditableRoleTableRow;
