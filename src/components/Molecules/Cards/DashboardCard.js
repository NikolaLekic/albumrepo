export const DashboardCard = ({ id, author, imgUrl, onClick, showTitle }) => {
  return (
    <div key={id} className="masonry-item" onClick={onClick}>
      <div className="img-wrapper">
        <img src={imgUrl} loading="lazy" />
      </div>
      {showTitle ? <p className="mt-2">Author</p> : null}
      {showTitle ? <h5>{author}</h5> : null}
    </div>
  );
};
