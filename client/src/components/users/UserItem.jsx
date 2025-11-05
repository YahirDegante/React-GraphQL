import { useMutation } from '@apollo/client';
import { DELETE_USER } from '../../graphql';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';

function UserItem({ user, onOpenEditModal, onUserDeleted }) {
    const [deleteUser, { loading: deleting }] = useMutation(DELETE_USER, {
        onCompleted: () => {
            toast.success('Usuario eliminado exitosamente 🗑️');
            onUserDeleted?.();
        },
        onError: (error) => {
            toast.error(`Error al eliminar usuario: ${error.message}`);
        }
    });

    const handleDelete = () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: `Vas a eliminar a ${user.name}. Esta acción no se puede deshacer.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                deleteUser({ variables: { id: user.id } });
            }
        });
    };

    return (
        <div className="card mb-3">
            <div className="card-body">
                <div className="row">
                    <div className="col-md-8">
                        <h5 className="card-title text-primary">{user.name}</h5>
                        <div className="row text-muted">
                            <div className="col-sm-6">
                                <strong>Edad:</strong> {user.age} años
                            </div>
                            <div className="col-sm-6">
                                <strong>Estado civil:</strong> {user.isMarried ? 'Casado/a' : 'Soltero/a'}
                            </div>
                        </div>
                        <small className="text-muted">
                            <strong>ID:</strong> {user.id}
                        </small>
                    </div>

                    <div className="col-md-4">
                        <div className="d-flex gap-2 flex-md-column">
                            <button
                                className="btn btn-primary btn-sm flex-fill"
                                onClick={() => onOpenEditModal(user)}
                            >
                                Editar
                            </button>
                            <button
                                className="btn btn-danger btn-sm flex-fill"
                                onClick={handleDelete}
                                disabled={deleting}
                            >
                                {deleting ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-1" aria-hidden="true"></span>{' '}
                                        Eliminando...
                                    </>
                                ) : (
                                    'Eliminar'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

UserItem.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        age: PropTypes.number.isRequired,
        isMarried: PropTypes.bool.isRequired
    }).isRequired,
    onOpenEditModal: PropTypes.func.isRequired,
    onUserDeleted: PropTypes.func
};

UserItem.defaultProps = {
    onUserDeleted: () => { }
};

export default UserItem;