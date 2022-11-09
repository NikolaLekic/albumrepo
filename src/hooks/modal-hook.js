import { useState, useCallback } from "react";

export const useModal = (state) => {
  const [showModal, setShowModal] = useState(state);

  const onModalOpen = useCallback(() => {
    setShowModal(true);
  }, []);

  const onModalClose = useCallback(() => {
    setShowModal(false);
  }, []);

  return [showModal, onModalOpen, onModalClose];
};
