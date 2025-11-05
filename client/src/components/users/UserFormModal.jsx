import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_USER, UPDATE_USER } from '../../graphql';
import Modal from '../ui/Modal';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';

function UserFormModal({ isOpen, onClose, user, onUserSaved, mode = 'create' }) {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        isMarried: false
    });

    useEffect(() => {
        if (mode === 'edit' && user) {
            setFormData({
                name: user.name || '',
                age: user.age?.toString() || '',
                isMarried: user.isMarried || false
            });
        } else {
            setFormData({
                name: '',
                age: '',
                isMarried: false
            });
        }
    }, [mode, user, isOpen]);

    const [createUser, { loading: creating }] = useMutation(CREATE_USER, {
        onCompleted: () => {
            toast.success('Usuario registrado exitosamente');
            onUserSaved();
            onClose();
        },
        onError: (error) => {
            toast.error(`Error al crear usuario: ${error.message}`);
        }
    });

    const [updateUser, { loading: updating }] = useMutation(UPDATE_USER, {
        onCompleted: () => {
            toast.success('Usuario actualizado exitosamente');
            onUserSaved();
            onClose();
        },
        onError: (error) => {
            toast.error(`Error al actualizar usuario: ${error.message}`);
        }
    });

    const loading = creating || updating;
    const getButtonText = () => {
        if (loading) {
            return mode === 'create' ? 'Creando...' : 'Guardando...';
        }
        return mode === 'create' ? 'Crear Usuario' : 'Guardar Cambios';
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.name || !formData.age) {
            toast.error('Por favor completa todos los campos requeridos');
            return;
        }

        if (mode === 'create') {
            createUser({
                variables: {
                    name: formData.name,
                    age: Number.parseInt(formData.age, 10),
                    isMarried: formData.isMarried
                }
            });
        } else {
            updateUser({
                variables: {
                    id: user.id,
                    name: formData.name,
                    age: Number.parseInt(formData.age, 10),
                    isMarried: formData.isMarried
                }
            });
        }
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={mode === 'create' ? 'Crear Nuevo Usuario' : 'Editar Usuario'}
            size="md"
        >
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Nombre *
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Ingresa el nombre"
                        disabled={loading}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="age" className="form-label">
                        Edad *
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="age"
                        value={formData.age}
                        onChange={(e) => handleInputChange('age', e.target.value)}
                        placeholder="Ingresa la edad"
                        disabled={loading}
                    />
                </div>
                <div className="mb-4">
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="isMarried"
                            checked={formData.isMarried}
                            onChange={(e) => handleInputChange('isMarried', e.target.checked)}
                            disabled={loading}
                        />
                        <label className="form-check-label" htmlFor="isMarried">
                            ¿Está casado?
                        </label>
                    </div>
                </div>
                <div className="d-flex gap-2 justify-content-end">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={onClose}
                        disabled={loading}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className={`btn ${mode === 'create' ? 'btn-success' : 'btn-primary'}`}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                                {getButtonText()}
                            </>
                        ) : (
                            getButtonText()
                        )}
                    </button>
                </div>
            </form>
        </Modal>
    );
}

UserFormModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    user: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        age: PropTypes.number,
        isMarried: PropTypes.bool
    }),
    onUserSaved: PropTypes.func.isRequired,
    mode: PropTypes.oneOf(['create', 'edit'])
};

UserFormModal.defaultProps = {
    mode: 'create',
    user: null
};

export default UserFormModal;