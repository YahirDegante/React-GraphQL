import { useQuery } from '@apollo/client';
import { GET_USERS } from '../../graphql';
import UserItem from './UserItem';
import Loading from '../ui/Loading';
import ErrorMessage from '../ui/ErrorMessage';
import PropTypes from 'prop-types';

function UserList({ onOpenEditModal, onRefetch }) {
    const { data, loading, error, refetch } = useQuery(GET_USERS);

    const handleRefetch = () => {
        refetch();
        onRefetch?.();
    };

    if (loading) return <Loading message="Cargando usuarios..." />;
    if (error) return <ErrorMessage error={error} />;

    return (
        <div>
            {data.getUsers.length === 0 ? (
                <div className="card text-center py-5">
                    <div className="card-body">
                        <h5 className="card-title text-muted">No hay usuarios registrados</h5>
                        <p className="card-text text-muted">
                            Comienza creando el primer usuario usando el botón "Nuevo Usuario"
                        </p>
                    </div>
                </div>
            ) : (
                data.getUsers.map(user => (
                    <UserItem
                        key={user.id}
                        user={user}
                        onOpenEditModal={onOpenEditModal}
                        onUserDeleted={handleRefetch}
                    />
                ))
            )}
        </div>
    );
}

UserList.propTypes = {
    onOpenEditModal: PropTypes.func.isRequired,
    onRefetch: PropTypes.func
};

UserList.defaultProps = {
    onRefetch: () => {}
};

export default UserList;