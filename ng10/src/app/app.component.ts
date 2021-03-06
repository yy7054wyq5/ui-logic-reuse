import { Component, OnInit } from '@angular/core';
import { CheckList, dataCreater } from '@wuyang1023/check-list/lib/check-list.class';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  pageNum = 0;
  pageSize = 1000;
  title = 'ng10';
  checkList = new CheckList({
    name: 'name',
    checkedIds: [],
    data: [],
    disabledIds: [],
  });

  ngOnInit(): void {
    setTimeout(() => {
      this.checkList.data = dataCreater(this.pageNum, this.pageSize);
      this.checkList.checkRows(['id1']);
      this.checkList.disableRows(['id1']);
    }, 500);
  }

  pre(): void {
    this.pageNum -= 1;
    if (this.pageNum === -1) {
      this.pageNum = 0;
    }
    this.checkList.data = dataCreater(this.pageNum, this.pageSize);
  }

  next(): void {
    this.pageNum += 1;
    if (this.pageNum > 1) {
      this.pageNum = 1;
    }
    this.checkList.data = dataCreater(this.pageNum, this.pageSize);
  }
}
