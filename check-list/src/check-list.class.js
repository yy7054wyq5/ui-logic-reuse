/* eslint-disable */
export class CheckList {
  disabledMap = {};
  sources = [];
  get data() {
    return this.sources;
  }
  set data(data) {
    this.sources = Array.isArray(data) ? data : [];
    for (const row of this.sources) {
      this.defineCheckedPropertyOfRow(row);
      this.defineDisabledPropertyOfRow(row);
      const rowId = row.id;
      if (this.disabledMap[rowId]) {
        continue;
      }
      if (this.checkedMap[rowId]) {
        this.checkedRowMap[rowId] = row;
        this.checkedMap[rowId] = true;
      } else {
        this.checkedMap[rowId] = false;
      }
    }
    this.checkAllValue = this.updateCheckAllValue();
    // console.log("setter data", this.data, this.checkAllValue);
  }

  /***** 复选操作 *****/
  checkedMap = {}; // 被选中的数据id，以数据id为key
  checkedRowMap = {}; // 被选中的数据，check为true则往里追加，为false则直接delete该属性
  checkAllValue = false;
  get checkAll() {
    return this.checkAllValue;
  }
  set checkAll(value) {
    this.checkAllValue = value;
    for (const row of this.sources) {
      const rowId = row.id;
      if (this.disabledMap[rowId]) {
        continue;
      }
      this.checkedMap[rowId] = value;
      if (value) {
        this.checkedRowMap[rowId] = row;
      } else {
        delete this.checkedRowMap[rowId];
      }
    }
    // console.log("setter checkAll", this.checkedMap);
  }

  constructor(
    options = {
      name: null,
      data: [],
      checkedIds: [],
      disabledIds: [],
    },
    checkedRows = []
  ) {
    this.init(options, checkedRows);
  }

  init(options, checkedRows) {
    const { name, data, checkedIds, disabledIds } = options;
    this.setPropNotWritable("name", name); // name 属性作为外部钩子，不可被修改
    this.data = data;
    this.checkRows(checkedIds);
    this.disableRows(disabledIds);
    if (checkedRows) {
      for (const cr of checkedRows) {
        this.checkedRowMap[cr.id] = cr;
        this.checkedMap[cr.id] = true;
      }
    }
    this.checkAllValue = this.updateCheckAllValue();
  }

  updateCheckAllValue() {
    let checkedTimes = 0;
    for (const item of this.sources) {
      const id = item.id;
      if (this.disabledMap[id] || this.checkedMap[id]) {
        checkedTimes += 1;
      }
    }
    return checkedTimes === this.sources.length;
  }

  checkRows(ids) {
    if (Array.isArray(ids)) {
      ids.forEach((id) => {
        this.checkedMap[id] = true;
      });
      this.sources
        .map((item) => {
          if (ids.includes(item.id)) {
            return item;
          }
          return null;
        })
        .filter((item) => item)
        .forEach((item) => {
          this.checkedRowMap[item.id] = item;
        });
    }
  }

  getCheckedRowIds() {
    return Object.keys(this.checkedMap).filter((id) => {
      return this.checkedMap[id] === true;
    });
  }

  getCheckedRows() {
    return Object.keys(this.checkedRowMap).map((id) => this.checkedRowMap[id]);
  }

  disableRows(ids) {
    if (Array.isArray(ids)) {
      ids.forEach((id) => {
        this.disabledMap[id] = true;
      });
    }
  }

  /* 定义disabled属性的getter和setter */
  defineDisabledPropertyOfRow(row) {
    Object.defineProperties(row, {
      disabled: {
        get: () => {
          return this.disabledMap[row.id];
        },
        set: (value) => {
          this.disabledMap[row.id] = value;
        },
      },
    });
  }

  /* 定义checked属性的getter和setter */
  defineCheckedPropertyOfRow(row) {
    Object.defineProperties(row, {
      checked: {
        get: () => {
          return this.checkedMap[row.id];
        },
        set: (value) => {
          const id = row.id;
          if (this.disabledMap[id]) {
            return;
          }
          this.checkedMap[id] = value;
          this.checkedMap = { ...this.checkedMap }; // 浅拷贝触发vue响应
          // console.log('defineCheckedPropertyOfRow', this.checkedMap);
          if (!value) {
            this.checkAllValue = false;
            delete this.checkedRowMap[id];
            return;
          }
          this.checkedRowMap[id] = row;
          this.checkAllValue = this.updateCheckAllValue();
        },
      },
    });
  }

  setPropNotWritable(prop, value) {
    Object.defineProperties(this, {
      [prop]: {
        value,
        writable: false,
      },
    });
  }
}

export function dataCreater(start, size) {
  const tmp = [];
  for (let index = start * size; index < (start + 1) * size; index++) {
    tmp.push({
      index,
      id: "id" + index,
      name: "row" + index,
    });
  }
  return tmp;
}
