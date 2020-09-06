import React, { useState } from "react";
// import logo from "./logo.svg";
import "./App.css";
import "@wuyang1023/check-list/src/check-list.class.scss";
import {
  CheckList,
  dataCreater,
} from "@wuyang1023/check-list/lib/check-list.class.js";

// TODO: 实现单实例
function App() {
  const [checkList, setCheckList] = useState(
    new CheckList({
      name: "react",
      data: dataCreater(0, 5),
      checkedIds: ["id0"],
      disabledIds: ["id0"],
    })
  );

  const checkedRows = function () {
    return checkList.getCheckedRows().map((row, index) => {
      return <li key={index}>{JSON.stringify(row)}</li>;
    });
  };

  // let checkedIds = checkList.getCheckedRowIds();

  function createRow(row, index) {
    return (
      <tr key={index}>
        <td>
          <input
            type="checkbox"
            disabled={row.disabled}
            checked={row.checked}
            onChange={() => {
              row.checked = !row.checked;
              setCheckList(
                new CheckList({
                  name: "react",
                  data: JSON.parse(JSON.stringify(checkList.data)),
                  checkedIds: checkList.getCheckedRowIds(),
                  disabledIds: ["id0"],
                })
              );
              // setCheckAll(checklist.checkAll); // 此处未能接受到实例的值
            }}
          />
        </td>
        <td>{row.id}</td>
        <td>{row.checked ? "true" : "false"}</td>
        <td>{row.name}</td>
        <td>{row.disabled ? "true" : ""}</td>
      </tr>
    );
  }
  const rows = checkList.data.map((row, index) => {
    return createRow(row, index);
  });

  let pageNum = 0;
  const pageSize = 5;
  function pre() {
    pageNum -= 1;
    if (pageNum === -1) {
      pageNum = 0;
    }
    console.log(checkList.getCheckedRowIds());
    setCheckList(
      new CheckList({
        name: "react",
        data: dataCreater(pageNum, pageSize),
        checkedIds: checkList.getCheckedRowIds(),
        disabledIds: ["id0"],
      })
    );
  }

  function next() {
    pageNum += 1;
    if (pageNum > 1) {
      pageNum = 1;
    }
    console.log(checkList.getCheckedRowIds());
    setCheckList(
      new CheckList({
        name: "react",
        data: dataCreater(pageNum, pageSize),
        checkedIds: checkList.getCheckedRowIds(),
        disabledIds: ["id0"],
      })
    );
  }

  return (
    <div className="App">
      <section style={{ width: "30vw" }}>
        <section>
          <table>
            <thead>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    checked={checkList.checkAll}
                    onChange={() => {
                      checkList.checkAll = !checkList.checkAll;
                      setCheckList(
                        new CheckList({
                          name: "react",
                          data: JSON.parse(JSON.stringify(checkList.data)),
                          checkedIds: checkList.getCheckedRowIds(),
                          disabledIds: ["id0"],
                        })
                      );
                    }}
                  />
                </td>
                <td>id</td>
                <td>checked</td>
                <td>name</td>
                <td>disabled</td>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
        </section>
        <section>
          <span
            className="pager"
            onClick={() => {
              pre();
            }}
          >
            pre
          </span>
          &nbsp;
          <span className="pager" onClick={() => next()}>
            next
          </span>
        </section>
        checked:
        <section>
          <ul>{checkedRows()}</ul>
        </section>
      </section>
    </div>
  );
}

export default App;
