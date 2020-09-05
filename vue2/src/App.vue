
<template>
  <div id="app">
    <section style="width: 30vw">
      <section>
        <table>
          <thead>
            <th>
              <input type="checkbox" v-model="checkList.checkAll" />
            </th>
            <th>id</th>
            <th>checked</th>
            <th>disabled</th>
            <th>name</th>
          </thead>
          <tbody>
            <tr v-for="(item, index) of checkList.data" v-bind:key="index">
              <td>
                <input type="checkbox" :disabled="item.disabled" v-model="item.checked" />
              </td>
              <td>{{ item.id }}</td>
              <td>{{ item.checked }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.disabled }}</td>
            </tr>
          </tbody>
        </table>
      </section>
      <section>
        <span class="pager" @click="pre()">pre</span>&nbsp;
        <span class="pager" @click="next()">next</span>
      </section>checked：
      <section>
        <ul v-for="(item, index) of checkList.getCheckedRows()" v-bind:key="index">
          <li>{{ toStr(item) }}</li>
        </ul>
      </section>
    </section>
  </div>
</template>

<script src="@wuyang1023/check-list/lib/check-list.class.js"></script>
<script>
import { CheckList, dataCreater } from "@wuyang1023/check-list/lib/check-list.class.js";

export default {
  name: "App",
  data: function () {
    return {
      pageNum: 0,
      pageSize: 5,
      checkList: new CheckList({
        name: "vue",
        checkedIds: [],
        data: [],
        disabledIds: [],
      }),
    };
  },
  methods: {
    toStr: function (value) {
      return JSON.stringify(value);
    },
    pre: function () {
      this.pageNum -= 1;
      if (this.pageNum === -1) {
        this.pageNum = 0;
      }
      this.checkList.data = dataCreater(this.pageNum, this.pageSize);
    },
    next: function () {
      this.pageNum += 1;
      if (this.pageNum > 1) {
        this.pageNum = 1;
      }
      this.checkList.data = dataCreater(this.pageNum, this.pageSize);
    },
  },
  mounted: function () {
    setTimeout(() => {
      this.checkList.data = dataCreater(this.pageNum, this.pageSize);
      this.checkList.checkRows(["id1"]);
      this.checkList.disableRows(["id1"]);
    }, 500);
  },
};
</script>

<style lang="scss">
@import "@wuyang1023/check-list/src/check-list.class.scss";
</style>
