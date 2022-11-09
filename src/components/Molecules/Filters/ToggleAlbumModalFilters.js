import { SecondaryButton } from "../../Atoms";
export const ToggleAlbumModalFilters = ({
  onToggleCreateModalClick,
  onToggleExistingModalClick,
  modalMode,
  albums,
}) => {
  return (
    <div className="d-flex justify-content-center my-5">
      <SecondaryButton
        text={"Create an Album"}
        onClick={onToggleCreateModalClick}
        btnClass={modalMode === "create" ? "btn-primary" : ""}
      />
      <SecondaryButton
        text={"Choose an existing album"}
        disabled={albums.length === 0}
        onClick={onToggleExistingModalClick}
        btnClass={modalMode !== "create" ? "btn-primary" : ""}
      />
    </div>
  );
};
