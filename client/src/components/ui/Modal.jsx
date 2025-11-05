import PropTypes from 'prop-types';

function Modal({ isOpen, onClose, title, children, size = "md" }) {
    if (!isOpen) return null;

    const modalSizes = {
        sm: "modal-sm",
        md: "",
        lg: "modal-lg",
        xl: "modal-xl"
    };

    return (
        <div
            className="modal show d-block"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            tabIndex="-1"
        >
            <div className={`modal-dialog ${modalSizes[size]} modal-dialog-centered`}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                        ></button>
                    </div>
                    <div className="modal-body">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.node,
    size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl'])
};

Modal.defaultProps = {
    size: 'md',
    children: null
};

export default Modal;