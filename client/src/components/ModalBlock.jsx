import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findOne, patch } from "../services/user.service";
import { message } from "antd";

const ModalBlock = ({ selectedId, setShowBlock }) => {
  const dispatch = useDispatch();
  const dataUser = useSelector((state) => state.user.userEdit);

  const loadDataUser = () => {
    dispatch(findOne(selectedId));
  };
  useEffect(() => {
    loadDataUser();
  }, []);

  const blockUser = () => {
    dispatch(patch({ id: selectedId, statusUpdate: { status: 0 } }));
  };
  const unBlockUser = () => {
    dispatch(patch({ id: selectedId, statusUpdate: { status: 1 } }));
  };

  const handleCloseShow = () => {
    setShowBlock(false);
  };
  const handleBlock = () => {
    blockUser();
    message.success({
      content: "block successful. Welcome!",
    });
    setShowBlock(false);
  };
  const handleUnBlock = () => {
    unBlockUser();
    message.success({
      content: "unblock successful. Welcome!",
    });
    setShowBlock(false);
  };
  return (
    <>
      <div className="overlay" hidden="">
        <div className="modal-custom">
          <div className="modal-title">
            <h4>Cảnh báo</h4>
            <i onClick={handleCloseShow} className="fa-solid fa-xmark" />
          </div>

          <div className="modal-body-custom">
            <span>
              Bạn có chắc chắn muốn{" "}
              {dataUser?.status === 1 ? "chặn" : "bỏ chặn"} tài khoản này?
            </span>
          </div>

          <div className="modal-footer-custom">
            <button onClick={handleCloseShow} className="btn btn-light">
              Hủy
            </button>
            {dataUser?.status === 1 ? (
              <button onClick={handleBlock} className="btn btn-danger">
                Xác nhận
              </button>
            ) : (
              <button onClick={handleUnBlock} className="btn btn-danger">
                Xác nhận
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalBlock;
