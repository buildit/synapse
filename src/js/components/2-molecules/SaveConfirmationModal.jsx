import React from 'react';
import { Modal } from 'react-bootstrap';
import Button from '../1-atoms/Button';

const SaveConfirmationModal = () => ({
  render() {
    const onSwitchView = this.props.onSwitchView;
    return (
      <div className="static-modal">
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Project Info Saved</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            Project has been saved!
          </Modal.Body>

          <Modal.Footer>
            <Button
              label="Close"
              onClick={(event) => {
                event.preventDefault();
                onSwitchView('listView');
              }}
            />
          </Modal.Footer>

        </Modal.Dialog>
      </div>
    );
  },
});


export default SaveConfirmationModal;

SaveConfirmationModal.propTypes = {
  onSwitchView: React.PropTypes.func.isRequired,
};
