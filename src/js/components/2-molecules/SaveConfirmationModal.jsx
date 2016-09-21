import React from 'react';
import { Modal } from 'react-bootstrap';
import Button from '../1-atoms/Button';

const SaveConfirmationModal = () => ({
  render() {
    const goHome = this.props.goHome;
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
              cssClasses="button btn btn-primary"
              onClick={goHome}
            />
          </Modal.Footer>

        </Modal.Dialog>
      </div>
    );
  },
});


export default SaveConfirmationModal;

SaveConfirmationModal.propTypes = {
  goHome: React.PropTypes.func.isRequired,
};
