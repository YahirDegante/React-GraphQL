import PropTypes from 'prop-types';

function Header({ onOpenCreateModal, userCount }) {
    return (
        <div className="card shadow-sm mb-4">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <h1 className="h2 mb-1 text-primary">
                            Gestor de Usuarios
                        </h1>
                        <p className="text-muted mb-0">
                            {userCount} usuarios registrados
                        </p>
                    </div>
                    <button
                        className="btn btn-success btn-lg"
                        onClick={onOpenCreateModal}
                    >
                        Nuevo Usuario
                    </button>
                </div>
            </div>
        </div>
    );
}

Header.propTypes = {
    onOpenCreateModal: PropTypes.func.isRequired,
    userCount: PropTypes.number.isRequired
};

export default Header;