import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findAll } from "../services/user.service";
import ModalBlock from "../components/ModalBlock";
import ModalDelete from "../components/ModalDelete";
import FormEdit from "../components/FormEdit";

const Table = () => {
  const dispatch = useDispatch();
  const dataUser = useSelector((state) => state.user.data);
  const [showDelete, setShowDelete] = useState(false);
  const [showBlock, setShowBlock] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const loadDataUser = () => {
    dispatch(findAll());
  };
  useEffect(() => {
    loadDataUser();
  }, []);

  const handleShowBlock = (id) => {
    setShowBlock(true);
    setSelectedId(id);
  };

  const handleShowDelete = (id) => {
    setShowDelete(true);
    setSelectedId(id);
  };

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
            <th colSpan={2}>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {dataUser?.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.dateOfBirth}</td>
              <td>{user.email}</td>
              <td>{user.address}</td>
              <td>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
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
          ))}
        </tbody>
      </table>
      <footer className="d-flex justify-content-end">
        <div className="d-flex align-items-center gap-3">
          <select className="form-select">
            <option selected>Hiển thị 10 bản ghi trên trang</option>
            <option>Hiển thị 20 bản ghi trên trang</option>
            <option>Hiển thị 50 bản ghi trên trang</option>
            <option>Hiển thị 100 bản ghi trên trang</option>
          </select>
        </div>
      </footer>
    </>
  );
};

export default Table;
