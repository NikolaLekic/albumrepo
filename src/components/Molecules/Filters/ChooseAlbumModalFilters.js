import { SelectInput, SecondaryButton } from "../../Atoms";
export const ChooseAlbumModalFilters = ({
  albums,
  dropdownPlaceholder,
  onDropdownChange,
  dropdownButtonValue,
  onModalClose,
  onAddToAlbum,
}) => {
  return (
    <>
      <div className="my-3 text-center">
        <SelectInput
          data={albums}
          placeholder={dropdownPlaceholder}
          onClick={onDropdownChange}
          buttonValue={dropdownButtonValue}
        />
      </div>
      <div className="d-flex justify-content-between mt-3">
        <SecondaryButton
          text={"Add to album +"}
          type={"submit"}
          disabled={dropdownPlaceholder === "Select an Album"}
          onClick={onAddToAlbum}
        />
        <SecondaryButton text={"Cancel"} onClick={onModalClose} />
      </div>
    </>
  );
};
