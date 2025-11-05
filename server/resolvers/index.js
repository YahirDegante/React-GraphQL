import User from '../models/User.js';

const resolvers = {
    Query: {
        getUsers: async () => {
            try {
                return await User.find();
            } catch (error) {
                throw new Error('Error obteniendo usuarios: ' + error.message);
            }
        },
        getUserById: async (parent, { id }) => {
            try {
                const user = await User.findById(id);
                if (!user) {
                    throw new Error('Usuario no encontrado');
                }
                return user;
            } catch (error) {
                throw new Error('Error obteniendo usuario: ' + error.message);
            }
        },
    },

    Mutation: {
        createUser: async (parent, { name, age, isMarried }) => {
            try {
                const newUser = new User({
                    name,
                    age,
                    isMarried
                });
                return await newUser.save();
            } catch (error) {
                throw new Error('Error creando usuario: ' + error.message);
            }
        },
        updateUser: async (parent, { id, ...updates }) => {
            try {
                const filteredUpdates = Object.fromEntries(
                    Object.entries(updates).filter(([_, value]) => value !== undefined)
                );
                const updatedUser = await User.findByIdAndUpdate(
                    id,
                    filteredUpdates,
                    { new: true, runValidators: true }
                );
                if (!updatedUser) {
                    throw new Error(`Usuario con id ${id} no encontrado`);
                }
                return updatedUser;
            } catch (error) {
                throw new Error('Error actualizando usuario: ' + error.message);
            }
        },
        deleteUser: async (parent, { id }) => {
            try {
                const deletedUser = await User.findByIdAndDelete(id);
                if (!deletedUser) {
                    return {
                        success: false,
                        message: `Usuario con id ${id} no encontrado`,
                        deletedUser: null
                    };
                }
                return {
                    success: true,
                    message: `Usuario ${deletedUser.name} eliminado correctamente`,
                    deletedUser: deletedUser
                };
            } catch (error) {
                throw new Error('Error eliminando usuario: ' + error.message);
            }
        }
    }
};

export default resolvers;