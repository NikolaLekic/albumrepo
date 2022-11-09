import * as actionTypes from "./actionTypes";

const loadingData = (field, value) => {
  return {
    type: actionTypes.LOADING_DATA,
    field,
    value,
  };
};

export const onGetImages = (page = 1) => {
  return async (dispatch) => {
    dispatch(loadingData("loadingImages", true));
    try {
      const data = await (
        await fetch(`https://picsum.photos/v2/list?page=${page}&limit=20`)
      ).json();
      dispatch({
        type: actionTypes.SET_IMAGES,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
    dispatch(loadingData("loadingImages", false));
  };
};

export const onSetUser = (userName) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SET_USER,
      payload: userName,
    });
  };
};

export const onIncreasePage = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.CHANGE_PAGE,
    });
  };
};

export const onShouldFetchImages = (value) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SHOULD_FETCH_IMAGES,
      value: value,
    });
  };
};

export const onCreateAlbum = (item) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.ADD_ALBUM,
      payload: item,
    });
  };
};

export const onAddToAlbum = (item) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.ADD_TO_ALBUM,
      payload: item,
    });
  };
};

export const onRemoveFromAlbum = (item) => {
  return (dispatch) => {
    console.log(item);
    dispatch({
      type: actionTypes.REMOVE_FROM_ALBUM,
      payload: item,
    });
  };
};
