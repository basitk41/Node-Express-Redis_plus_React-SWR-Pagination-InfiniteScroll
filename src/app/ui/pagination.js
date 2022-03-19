const Pagination = ({ page, setPage, totalPages }) => {
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-end">
        <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            disabled={page === 1}
            onClick={() => setPage(1)}
          >
            First
          </button>
        </li>
        <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>
        </li>
        <li className={`page-item ${page === 1 ? "active" : ""}`}>
          <button
            className="page-link"
            onClick={() => {
              page === 1
                ? setPage(1)
                : page === totalPages
                ? setPage(page - 2)
                : setPage(page - 1);
            }}
          >
            {page === 1 ? page : page === totalPages ? page - 2 : page - 1}
          </button>
        </li>
        <li
          className={`page-item ${
            page === 1 ? "" : page === totalPages ? "" : "active"
          }`}
        >
          <button
            className="page-link"
            onClick={() => {
              page === 1
                ? setPage(2)
                : page === totalPages
                ? setPage(page - 1)
                : setPage(page);
            }}
          >
            {page === 1 ? 2 : page === totalPages ? page - 1 : page}
          </button>
        </li>
        <li className={`page-item ${page === totalPages ? "active" : ""}`}>
          <button
            className="page-link"
            onClick={() => {
              page === 1
                ? setPage(3)
                : page === totalPages
                ? setPage(page)
                : setPage(page + 1);
            }}
          >
            {page === 1 ? 3 : page === totalPages ? page : page + 1}
          </button>
        </li>
        <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
          <button
            className="page-link"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </li>
        <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
          <button
            className="page-link"
            disabled={page === totalPages}
            onClick={() => setPage(totalPages)}
          >
            Last
          </button>
        </li>
      </ul>
    </nav>
  );
};
export default Pagination;
