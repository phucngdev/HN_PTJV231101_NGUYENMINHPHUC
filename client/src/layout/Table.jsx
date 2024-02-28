import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findAll } from "../services/user.service";
import ModalBlock from "../components/ModalBlock";
import ModalDelete from "../components/ModalDelete";
import FormEdit from "../components/FormEdit";
import _debounce from "lodash/debounce";
import { Button } from "antd";
import Footer from "./Footer";

const Table = ({ search }) => {
  const dispatch = useDispatch();
  const dataUser = useSelector((state) => state.user.data);
  const [showItem, setShowItem] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [showDelete, setShowDelete] = useState(false);
  const [showBlock, setShowBlock] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  // làm lấy tất cả user
  const loadDataUser = () => {
    dispatch(findAll());
  };

  useEffect(() => {
    loadDataUser();
  }, []);

  // hàm lọc tìm kiếm theo email sau 300ms khi ngừoi dùng nhập vào search
  useEffect(() => {
    const debouncedFilter = _debounce(() => {
      const filtered = dataUser?.filter((user) =>
        user.email.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredData(filtered);
    }, 300);
    debouncedFilter();
    return () => {
      debouncedFilter.cancel();
    };
  }, [search, dataUser]);

  // phân trang
  const startIndex = currentPage * showItem;
  const endIndex = startIndex + showItem;
  const visibleData = filteredData.slice(startIndex, endIndex);
  console.log(visibleData);

  // hàm hiểm thị modal block và set lại id selected
  const handleShowBlock = (id) => {
    setShowBlock(true);
    setSelectedId(id);
  };

  // hàm hiểm thị modal xoá và set lại id selected
  const handleShowDelete = (id) => {
    setShowDelete(true);
    setSelectedId(id);
  };

  // hàm hiểm thị modal edit và set lại id selected
  const handleShowEdit = (id) => {
    setShowEdit(true);
    setSelectedId(id);
  };

  return (
    <>
      {showBlock && (
        <ModalBlock
          selectedId={selectedId}
          setShowBlock={setShowBlock}
        ></ModalBlock>
      )}
      {showEdit && (
        <FormEdit selectedId={selectedId} setShowEdit={setShowEdit} />
      )}
      {showDelete && (
        <ModalDelete selectedId={selectedId} setShowDelete={setShowDelete} />
      )}
      <table className="table table-bordered table-hover table-striped">
        <thead>
          <tr>
            <th>STT</th>
            <th>Họ và tên</th>
            <th>Ngày sinh</th>
            <th>Email</th>
            <th>Địa chỉ</th>
            <th>Trạng thái</th>
            <th style={{ textAlign: "center" }} colSpan={3}>
              Chức năng
            </th>
          </tr>
        </thead>
        <tbody>
          {visibleData?.length > 0 ? (
            visibleData?.map((user, index) => (
              <tr key={user.id}>
                <td>{startIndex + index + 1}</td>
                <td>{user.name}</td>
                <td>{user.dateOfBirth}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    {user.status === 1 ? (
                      <>
                        <div className="status status-active" />
                        <span> Đang hoạt động</span>
                      </>
                    ) : (
                      <>
                        <div className="status status-stop" />
                        <span> Ngừng hoạt động</span>
                      </>
                    )}
                  </div>
                </td>
                <td>
                  {user.status === 1 ? (
                    <span
                      onClick={() => handleShowBlock(user.id)}
                      className="button button-block"
                    >
                      Chặn
                    </span>
                  ) : (
                    <span
                      onClick={() => handleShowBlock(user.id)}
                      className="button button-block"
                    >
                      Bỏ chặn
                    </span>
                  )}
                </td>
                <td>
                  <span
                    onClick={() => handleShowEdit(user.id)}
                    className="button button-edit"
                  >
                    Sửa
                  </span>
                </td>
                <td>
                  <span
                    onClick={() => handleShowDelete(user.id)}
                    className="button button-delete"
                  >
                    Xóa
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <>
              <span>Không có kết quả tìm kiếm</span>
            </>
          )}
        </tbody>
      </table>
      <Footer
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setShowItem={setShowItem}
        showItem={showItem}
        endIndex={endIndex}
        filteredData={filteredData}
      ></Footer>
    </>
  );
};

export default Table;
