import React, { useState } from "react";
import Form from "../components/Form";

const Header = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <header className="d-flex justify-content-between mb-3">
        <h3>Nhân viên</h3>
        <button onClick={() => setShowForm(true)} className="btn btn-primary">
          Thêm mới nhân viên
        </button>
      </header>
      {showForm && <Form setShowForm={setShowForm}></Form>}
    </>
  );
};

export default Header;
