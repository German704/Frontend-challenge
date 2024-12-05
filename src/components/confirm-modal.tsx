import Modal from "react-modal"

Modal.setAppElement('#root');

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-white p-6 rounded-lg shadow-xl mt-10 w-1/2 min-w-80 max-w-lg mx-auto flex flex-col items-center gap-4"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <h2>Are you sure?</h2>
      <p>This action cannot be undone.</p>
      <div className="w-full flex justify-center gap-4">
        <button onClick={onConfirm} className="bg-red-500 text-white px-4 py-2 rounded">
          Confirm
        </button>
        <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded ml-2">
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;