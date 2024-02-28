import { Button } from "antd";
import React from "react";

const Footer = ({
  setCurrentPage,
  currentPage,
  setShowItem,
  showItem,
  filteredData,
  endIndex,
}) => {
  // Hàm thay đổi trang
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <footer className="d-flex justify-content-between">
        <div className="d-flex align-items-center">
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 0}
          >
            Prev
          </Button>
          <span className="p-2">Trang {currentPage + 1}</span>
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={endIndex >= filteredData.length}
          >
            Next
          </Button>
        </div>
        <div className="d-flex align-items-center gap-3">
          <select
            value={showItem}
            onChange={(e) => setShowItem(e.target.value)}
            className="form-select"
          >
            <option value={10} selected>
              Hiển thị 10 bản ghi trên trang
            </option>
            <option value={20}>Hiển thị 20 bản ghi trên trang</option>
            <option value={50}>Hiển thị 50 bản ghi trên trang</option>
            <option value={100}>Hiển thị 100 bản ghi trên trang</option>
          </select>
        </div>
      </footer>
    </>
  );
};

export default Footer;
