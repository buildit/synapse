import React, { PropTypes } from 'react';
import Link from '../1-atoms/Link';

const EditableRoleTableRow = React.createClass({
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
    let actions;
    switch (index) {
    case 0:
      if (itemsSize > 1) {
        actions = (
          <td>
            <Link
              label="Remove"
              onClick={this.removeItemOnClick}
            />
            <Link
              label="Move Down"
              onClick={this.moveItemDownOnClick}
            />
          </td>
        );
      } else {
        actions = (
          <td>
            <Link
              label="Remove"
              onClick={this.removeItemOnClick}
            />
          </td>
        );
      }
      break;
    case itemsSize - 1:
      actions = (
        <td>
          <Link
            label="Remove"
            onClick={this.removeItemOnClick}
          />
          <Link
            label="Move Up"
            onClick={this.moveItemUpOnClick}
          />
        </td>
      );
      break;
    default:
      actions = (
        <td>
          <Link
            label="Remove"
            onClick={this.removeItemOnClick}
          />
          <Link
            label="Move Up"
            onClick={this.moveItemUpOnClick}
          />
          <Link
            label="Move Down"
            onClick={this.moveItemDownOnClick}
          />
        </td>
      );
    }

    return (
      <tr>
        <td>
          <span>{item.name}</span>
        </td>
        <td>
          <span>{item.groupWith}</span>
        </td>
        {actions}
      </tr>
    );
  },
});

export default EditableRoleTableRow;
