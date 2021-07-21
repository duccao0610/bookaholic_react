import Tag from "./Tag";
const RelatedGenres = ({ genres }) => {
  return (
    <div className="d-flex flex-column mt-3">
      <h5>Related genres</h5>
      {genres.map((genre) => {
        return (
          <div
            key={genre._id}
            className="align-self-center mb-1 border-top w-100 row"
          >
            <div className="col-8 p-0">
              <Tag name={genre._id} related="true" />
            </div>
            <span className="font-italic p-0 fw-light col-4 text-center">
              {genre.total} books
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default RelatedGenres;
