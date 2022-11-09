import * as actionTypes from "../actions/actionTypes";
const initialState = {
  user: null,
  albums: [],
  images: [],
  urlPage: 1,
  loadingImages: false,
  shouldFetchImages: false,
};

const appStateReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case actionTypes.SET_IMAGES:
      return {
        ...state,
        images: [...state.images, ...action.payload],
      };
    case actionTypes.LOADING_DATA:
      return {
        ...state,
        [action.field]: action.value,
      };
    case actionTypes.CHANGE_PAGE:
      return {
        ...state,
        urlPage: state.urlPage + 1,
      };
    case actionTypes.SHOULD_FETCH_IMAGES:
      return {
        ...state,
        shouldFetchImages: action.value,
      };
    case actionTypes.ADD_ALBUM:
      return {
        ...state,
        albums: [...state.albums, action.payload],
      };
    case actionTypes.ADD_TO_ALBUM:
      const updatedAddAlbums = state.albums.map((album) => {
        if (album.id === action.payload.albumId) {
          return {
            ...album,
            images: [...album.images, action.payload.image],
          };
        } else {
          return {
            ...album,
          };
        }
      });
      return {
        ...state,
        albums: updatedAddAlbums,
      };
    case actionTypes.REMOVE_FROM_ALBUM:
      const updatedRemoveAlbums = state.albums.map((album) => {
        if (album.id.toString() === action.payload.albumId.toString()) {
          const newImages = album.images.filter(
            (image) => image.id.toString() !== action.payload.imageId.toString()
          );
          return {
            ...album,
            images: newImages,
          };
        } else {
          return {
            ...album,
          };
        }
      });
      return {
        ...state,
        albums: updatedRemoveAlbums,
      };
    default:
      return state;
  }
};

export default appStateReducer;
