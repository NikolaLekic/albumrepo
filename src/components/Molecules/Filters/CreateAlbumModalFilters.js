import { TextInput, SecondaryButton } from "../../Atoms";
export const CreateAlbumModalFilters = ({
  albumName,
  onCreateAlbumHandler,
  onModalClose,
  onSetAlbumName,
}) => {
  return (
    <>
      <div className="my-3 text-center">
        <TextInput
          value={albumName}
          id={"albumName"}
          placeholder={"Enter album name here"}
          name={"albumName"}
          onChange={onSetAlbumName}
        />
      </div>
      <div className="d-flex justify-content-between">
        <SecondaryButton
          text={"create album"}
          type={"submit"}
          onClick={onCreateAlbumHandler}
          disabled={albumName ? false : true}
        />
        <SecondaryButton text={"Cancel"} onClick={onModalClose} />
      </div>
    </>
  );
};
