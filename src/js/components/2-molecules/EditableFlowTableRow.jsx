import React, { PropTypes } from 'react';
import Badge from '../1-atoms/Badge';
import Link from '../1-atoms/Link';

const EditableFlowTableRow = React.createClass({
  propTypes: {
    item: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    itemsSize: PropTypes.number.isRequired,
    removeItem: PropTypes.func.isRequired,
    moveItemUp: PropTypes.func.isRequired,
    moveItemDown: PropTypes.func.isRequired,
  },

  removeItemOnClick() {
    this.props.removeItem(this.props.index);
  },

  moveItemUpOnClick() {
    this.props.moveItemUp(this.props.index);
  },

  moveItemDownOnClick() {
    this.props.moveItemDown(this.props.index);
  },

  render() {
    const item = this.props.item;
    const index = this.props.index;
    const itemsSize = this.props.itemsSize;
    let actions = [];
    switch (index) {
    case 0:
      if (itemsSize > 1) {
        actions.push(<Link
          label="Remove"
          onClick={this.removeItemOnClick}
        />);
        actions.push(<div></div>);
        actions.push(<Link
          label="Down"
          onClick={this.moveItemDownOnClick}
        />);
      } else {
        actions.push(<Link
          label="Remove"
          onClick={this.removeItemOnClick}
        />);
      }
      break;
    case itemsSize - 1:
      actions.push(<Link
        label="Remove"
        onClick={this.removeItemOnClick}
      />);
      actions.push(<Link
        label="Up"
        onClick={this.moveItemUpOnClick}
      />);
      break;
    default:
      actions.push(<Link
        label="Remove"
        onClick={this.removeItemOnClick}
      />);
      actions.push(<Link
        label="Up"
        onClick={this.moveItemUpOnClick}
      />);
      actions.push(<Link
        label="Down"
        onClick={this.moveItemDownOnClick}
      />);
    }

    return (
      <tr className="editable-table-row">
        <td>
          <Badge label={(this.props.index + 1).toString()} />
        </td>
        <td>
          <span>{item.name}</span>
        </td>
        <td className="actions">
          {actions}
        </td>
      </tr>
    );
  },
});

export default EditableFlowTableRow;
