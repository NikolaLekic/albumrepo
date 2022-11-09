import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Spinner } from "../components/Atoms";
import { DashboardCard } from "../components/Molecules";
import {
  onGetImages,
  onIncreasePage,
  onShouldFetchImages,
} from "../store/actions";

const Dashboard = (props) => {
  const dispatch = useDispatch();
  let elementRef = useRef(null);

  const { loadingImages, images, urlPage, shouldFetchImages } = useSelector(
    (state) => ({
      loadingImages: state.appState.loadingImages,
      images: state.appState.images,
      urlPage: state.appState.urlPage,
      shouldFetchImages: state.appState.shouldFetchImages,
    })
  );

  const onImageClick = (id) => {
    props.history.push(`/dashboard/${id}`);
  };

  useEffect(() => {
    if (urlPage > 1 && shouldFetchImages) {
      dispatch(onGetImages(urlPage));
    }
    return () => dispatch(onShouldFetchImages(false));
  }, [urlPage]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "10%",
      threshold: 1,
    };
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && Math.floor(entry.intersectionRatio) === 1) {
        dispatch(onIncreasePage());
        dispatch(onShouldFetchImages(true));
      }
    }, options);
    observer.observe(elementRef.current);
    return () => observer.disconnect;
  }, []);

  return (
    <div className="container">
      <div className="masonry">
        {images?.map((item) => {
          return (
            <DashboardCard
              key={item.id}
              imgUrl={item.download_url}
              author={item.author}
              onClick={() => onImageClick(item.id)}
            />
          );
        })}
      </div>
      {loadingImages ? <Spinner /> : null}
      <div
        ref={elementRef}
        style={{
          border: "5px solid black",
          width: "100%",
        }}
      ></div>
    </div>
  );
};

export default Dashboard;
