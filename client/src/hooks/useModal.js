import { useState } from "react";

function useModal(initialState = false) {
    const [isOpen, setIsOpen] = useState(initialState);
    const[modalData, setModalData] = useState(null);

    const openModal = (data = null) => {
        setIsOpen(true);
        setModalData(data);
    };

    const closeModal = () => {
        setIsOpen(false);
        setModalData(null);
    };

    return {
        isOpen,
        modalData,
        openModal,
        closeModal,
    };
}
export default useModal;
