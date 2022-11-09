import { useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { onRemoveFromAlbum } from "../store/actions";
import { SecondaryButton } from "../components/Atoms";

const AlbumsInfo = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { albums } = useSelector((state) => ({
    albums: state.appState.albums,
  }));
  const { id } = useParams();

  const renderAlbumImages = useCallback(
    (data) => {
      return data
        ?.find((album) => album?.id?.toString() === id.toString())
        ?.images?.map((image) => {
          return (
            <div key={image?.id} className="col-md-4 m-2 p-0 image-container">
              <img
                src={image?.imgUrl}
                id={image?.id}
                className="img-fluid"
                loading="lazy"
              />
              <button
                className="btn btn-danger"
                onClick={() => onRemoveImage(image?.id, id)}
              >
                Remove
              </button>
            </div>
          );
        });
    },
    [albums]
  );

  const albumExists = useCallback(
    (data) => {
      return data?.find((album) => album?.id?.toString() === id.toString());
    },
    [albums]
  );

  const onRemoveImage = useCallback(
    (imageId, albumId) => {
      dispatch(onRemoveFromAlbum({ imageId: imageId, albumId: albumId }));
    },
    [albums]
  );

  return (
    <div className="container ">
      <div className="row justify-content-center my-5">
        <div className="col-md-8">
          <h3 className="text-center">
            {albumExists(albums)
              ? albumExists(albums)?.name
              : "No such album created."}
          </h3>
          <div className="row justify-content-center align-items-end">
            {renderAlbumImages(albums)}
          </div>
        </div>
        <div className="text-center mt-5">
          <SecondaryButton
            text={"go back"}
            onClick={() => {
              history.goBack();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AlbumsInfo;
