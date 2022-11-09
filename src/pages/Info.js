import { useState, useEffect, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Spinner, SecondaryButton, PrimaryButton } from "../components/Atoms";
import {
  DashboardCard,
  Modal,
  ToggleAlbumModalFilters,
  CreateAlbumModalFilters,
  ChooseAlbumModalFilters,
} from "../components/Molecules";
import { useModal } from "../hooks/modal-hook";
import { onCreateAlbum, onAddToAlbum } from "../store/actions";

const Info = () => {
  const { albums } = useSelector((state) => ({
    albums: state.appState.albums,
  }));
  const [data, setData] = useState();
  const [loadingData, setLoadingData] = useState(true);
  const [albumName, setAlbumName] = useState("");
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [modalMode, setModalMode] = useState(
    albums.length > 0 ? "existing" : "create"
  );

  const [showModal, onModalOpen, onModalClose] = useModal(false);

  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    // fetch data
    const controller = new AbortController();
    const dataFetch = async () => {
      try {
        const data = await (
          await fetch(`https://picsum.photos/id/${id}/info`, {
            signal: controller.signal,
          })
        ).json();
        setData(data);
      } catch (error) {
        setLoadingData(false);
      }
      setLoadingData(false);
      // set state when the data received
      return () => controller.abort();
    };

    dataFetch();
  }, [id]);

  const onCreateAlbumHandler = (e) => {
    e.preventDefault();
    const newAlbum = {
      id: albums.length + 1,
      name: albumName,
      images: [],
    };
    dispatch(onCreateAlbum(newAlbum));
    setAlbumName("");
    setModalMode("existing");
    setSelectedAlbum(newAlbum);
  };

  const onAddToAlbumHandler = (e) => {
    e.preventDefault();
    const item = {
      albumId: selectedAlbum.id,
      image: {
        id: data.id,
        imgUrl: data.download_url,
      },
    };
    dispatch(onAddToAlbum(item));
    setAlbumName("");
    onModalClose();
  };

  const onToggleCreateModalClick = useCallback(() => {
    setModalMode("create");
  }, []);

  const onToggleExistingModalClick = useCallback(() => {
    setModalMode("existing");
  }, []);

  const onSetAlbumName = useCallback((e) => {
    setAlbumName(e.target.value);
  }, []);

  const onDropdownChange = useCallback(
    (e) => {
      const albumId = e.target.id;
      const album = albums.find(
        (item) => item.id.toString() === albumId.toString()
      );
      setSelectedAlbum(album);
    },
    [albums]
  );

  const onDownloadImage = useCallback(async (e, author) => {
    e.preventDefault();
    try {
      const response = await fetch(e.target.href);
      const blob = await response.blob();
      const urlObject = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = urlObject;
      link.setAttribute("download", `${author}-image.jpg`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectUrl(blob);
    } catch (error) {}
  }, []);

  if (loadingData) return <Spinner />;
  return (
    <>
      <div className="container">
        <div className="row flex-grow-1 justify-content-center">
          <div className="col-md-6 my-5 text-center">
            <DashboardCard
              key={data?.id}
              imgUrl={data?.download_url}
              author={data?.author}
              showTitle={true}
            />
            <div className="d-flex justify-content-between">
              <SecondaryButton text={"Add to Album +"} onClick={onModalOpen} />
              <a
                href={data?.download_url}
                target="_blank"
                onClick={(e) => onDownloadImage(e, data?.author)}
              >
                <PrimaryButton text={"download"} />
              </a>
              <SecondaryButton
                onClick={() => {
                  history.goBack();
                }}
                text={"go back"}
              />
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <Modal
          show={showModal}
          className={"container-fluid"}
          title={modalMode === "create" ? "Create an Album" : "Choose an Album"}
          onCancel={onModalClose}
        >
          <>
            <ToggleAlbumModalFilters
              modalMode={modalMode}
              albums={albums}
              onToggleCreateModalClick={onToggleCreateModalClick}
              onToggleExistingModalClick={onToggleExistingModalClick}
            />
            {modalMode === "create" ? (
              <CreateAlbumModalFilters
                albumName={albumName}
                onSetAlbumName={onSetAlbumName}
                onModalClose={onModalClose}
                onCreateAlbumHandler={onCreateAlbumHandler}
              />
            ) : (
              <>
                <ChooseAlbumModalFilters
                  albums={albums}
                  dropdownPlaceholder={
                    selectedAlbum?.name
                      ? selectedAlbum?.name
                      : "Select an Album"
                  }
                  onModalClose={onModalClose}
                  dropdownButtonValue={"name"}
                  onDropdownChange={onDropdownChange}
                  onAddToAlbum={onAddToAlbumHandler}
                />
              </>
            )}
          </>
        </Modal>
      )}
    </>
  );
};

export default Info;
