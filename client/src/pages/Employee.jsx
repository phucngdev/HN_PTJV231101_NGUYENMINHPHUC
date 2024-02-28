import React from "react";
import { useState } from "react";
import Table from "../layout/Table";
import Header from "../layout/Header";
import Search from "../layout/Search";

const Employee = () => {
  const [search, setSearch] = useState("");

  return (
    <>
      <div className="w-[80%] m-auto mt-4 h-[100vh]">
        <main className="main">
          <Header></Header>
          <Search setSearch={setSearch} search={search}></Search>
          <Table search={search}></Table>
        </main>
      </div>
    </>
  );
};

export default Employee;
