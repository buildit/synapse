import React, { PropTypes } from 'react';
import { Button, Modal } from 'bootstrap';

const SaveConfirmationModal = () => {
  const onSwitchView = this.props.onSwitchView;

  return (
    <div className="modal-container" style={{ height: 200 }}>
      <Modal
        container={this}
        aria-labelledby="contained-modal-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title">Save Confrmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
          Project updated!
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            label="OK"
            onClick={() => {
              onSwitchView('listView');
            }}
          />
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default SaveConfirmationModal;

SaveConfirmationModal.propTypes = {
  onSwitchView: PropTypes.func.isRequired,
};
