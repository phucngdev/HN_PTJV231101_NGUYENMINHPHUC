import React from "react";

const Search = ({ setSearch, search }) => {
  const handleRefresh = () => {
    setSearch("");
  };
  return (
    <>
      <div className="d-flex align-items-center justify-content-end gap-2 mb-3">
        <input
          style={{ width: 350 }}
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-control"
          placeholder="Tìm kiếm theo email"
        />
        <i
          onClick={handleRefresh}
          className="fa-solid fa-arrows-rotate"
          title="Refresh"
        />
      </div>
    </>
  );
};

export default Search;
