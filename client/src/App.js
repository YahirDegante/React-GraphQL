import { useQuery } from '@apollo/client';
import { GET_USERS } from './graphql';
import { Toaster } from 'react-hot-toast';
import useModal from './hooks/useModal';
import Header from './components/layout/Header';
import UserFormModal from './components/users/UserFormModal';
import UserList from './components/users/UserList';

function App() {
  const createModal = useModal();
  const editModal = useModal();

  const { data, refetch } = useQuery(GET_USERS);

  const handleUserSaved = () => {
    refetch();
  };

  const handleOpenEditModal = (user) => {
    editModal.openModal(user);
  };

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />

      <div className="container-fluid py-4 bg-light min-vh-100">
        <div className="container">
          <Header 
            onOpenCreateModal={createModal.openModal}
            userCount={data?.getUsers?.length || 0}
          />
          <UserList 
            onOpenEditModal={handleOpenEditModal}
            onRefetch={refetch}
          />
          <UserFormModal
            isOpen={createModal.isOpen}
            onClose={createModal.closeModal}
            onUserSaved={handleUserSaved}
            mode="create"
          />
          <UserFormModal
            isOpen={editModal.isOpen}
            onClose={editModal.closeModal}
            user={editModal.modalData}
            onUserSaved={handleUserSaved}
            mode="edit"
          />
        </div>
      </div>
    </>
  );
}

export default App;