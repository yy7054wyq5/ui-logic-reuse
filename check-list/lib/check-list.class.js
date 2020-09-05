"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dataCreater = dataCreater;
exports.CheckList = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable */
var CheckList = /*#__PURE__*/function () {
  _createClass(CheckList, [{
    key: "data",
    get: function get() {
      return this.sources;
    },
    set: function set(data) {
      this.sources = Array.isArray(data) ? data : [];

      var _iterator = _createForOfIteratorHelper(this.sources),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var row = _step.value;
          this.defineCheckedPropertyOfRow(row);
          this.defineDisabledPropertyOfRow(row);
          var rowId = row.id;

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
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      this.checkAllValue = this.updateCheckAllValue();
    }
    /***** 复选操作 *****/

  }, {
    key: "checkAll",
    get: function get() {
      return this.checkAllValue;
    },
    set: function set(value) {
      this.checkAllValue = value;

      var _iterator2 = _createForOfIteratorHelper(this.sources),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var row = _step2.value;
          var rowId = row.id;

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
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  }]);

  function CheckList() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      name: null,
      data: [],
      checkedIds: [],
      disabledIds: []
    };

    _classCallCheck(this, CheckList);

    _defineProperty(this, "disabledMap", {});

    _defineProperty(this, "sources", []);

    _defineProperty(this, "checkedMap", {});

    _defineProperty(this, "checkedRowMap", {});

    _defineProperty(this, "checkAllValue", false);

    this.init(options);
  }

  _createClass(CheckList, [{
    key: "init",
    value: function init(options) {
      var name = options.name,
          data = options.data,
          checkedIds = options.checkedIds,
          disabledIds = options.disabledIds;
      this.setPropNotWritable("name", name); // name 属性作为外部钩子，不可被修改

      this.data = data;
      this.checkRows(checkedIds);
      this.disableRows(disabledIds);
    }
  }, {
    key: "updateCheckAllValue",
    value: function updateCheckAllValue() {
      var checkedTimes = 0;

      var _iterator3 = _createForOfIteratorHelper(this.sources),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var item = _step3.value;
          var id = item.id;

          if (this.disabledMap[id] || this.checkedMap[id]) {
            checkedTimes += 1;
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      return checkedTimes === this.sources.length;
    }
  }, {
    key: "checkRows",
    value: function checkRows(ids) {
      var _this = this;

      if (Array.isArray(ids)) {
        ids.forEach(function (id) {
          _this.checkedMap[id] = true;
        });
        this.sources.map(function (item) {
          if (ids.includes(item.id)) {
            return item;
          }

          return null;
        }).filter(function (item) {
          return item;
        }).forEach(function (item) {
          _this.checkedRowMap[item.id] = item;
        });
      }
    }
  }, {
    key: "getCheckedRowIds",
    value: function getCheckedRowIds() {
      var _this2 = this;

      return Object.keys(this.checkedMap).filter(function (id) {
        return _this2.checkedMap[id] === true;
      });
    }
  }, {
    key: "getCheckedRows",
    value: function getCheckedRows() {
      var _this3 = this;

      return Object.keys(this.checkedRowMap).map(function (id) {
        return _this3.checkedRowMap[id];
      });
    }
  }, {
    key: "disableRows",
    value: function disableRows(ids) {
      var _this4 = this;

      if (Array.isArray(ids)) {
        ids.forEach(function (id) {
          _this4.disabledMap[id] = true;
        });
      }
    }
    /* 定义disabled属性的getter和setter */

  }, {
    key: "defineDisabledPropertyOfRow",
    value: function defineDisabledPropertyOfRow(row) {
      var _this5 = this;

      Object.defineProperties(row, {
        disabled: {
          get: function get() {
            return _this5.disabledMap[row.id];
          },
          set: function set(value) {
            _this5.disabledMap[row.id] = value;
          }
        }
      });
    }
    /* 定义checked属性的getter和setter */

  }, {
    key: "defineCheckedPropertyOfRow",
    value: function defineCheckedPropertyOfRow(row) {
      var _this6 = this;

      Object.defineProperties(row, {
        checked: {
          get: function get() {
            return _this6.checkedMap[row.id];
          },
          set: function set(value) {
            var id = row.id;

            if (_this6.disabledMap[id]) {
              return;
            }

            _this6.checkedMap[id] = value;
            _this6.checkedMap = _objectSpread({}, _this6.checkedMap); // 浅拷贝触发vue响应

            if (!value) {
              _this6.checkAllValue = false;
              delete _this6.checkedRowMap[id];
              return;
            }

            _this6.checkedRowMap[id] = row;
            _this6.checkAllValue = _this6.updateCheckAllValue();
          }
        }
      });
    }
  }, {
    key: "setPropNotWritable",
    value: function setPropNotWritable(prop, value) {
      Object.defineProperties(this, _defineProperty({}, prop, {
        value: value,
        writable: false
      }));
    }
  }]);

  return CheckList;
}();

exports.CheckList = CheckList;

function dataCreater(start, size) {
  var tmp = [];

  for (var index = start * size; index < (start + 1) * size; index++) {
    tmp.push({
      index: index,
      id: "id" + index,
      name: "row" + index
    });
  }

  return tmp;
}