import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import BScroll from '@better-scroll/core';
import PullDown from '@better-scroll/pull-down';
import Pullup from '@better-scroll/pull-up';

BScroll.use(PullDown);
BScroll.use(Pullup);

@Component({
  selector: 'app-nb-scroll',
  templateUrl: './nb-scroll.component.html',
  styleUrls: ['./nb-scroll.component.scss']
})
export class NbScrollComponent implements OnInit, AfterViewInit {
  list: number[];
  pullDownRefresh = { threshold: 90, stop: 40 };
  beforePullDown = true;
  isPullingDown: boolean;
  refreshTxt = '刷新完成';
  bubbleY = 0;
  @ViewChild('scroll', { static: false }) scrollEl: ElementRef;
  @ViewChild('listWrapper', { static: false }) listWrapper: ElementRef;
  private scroll: BScroll;
  isRebounding: boolean;
  pullDownInitTop = -50;
  pullDownStyle: string;


  isPullUpLoad: boolean;
  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.list = [];
    for (let index = 0; index < 2; index++) {
      this.list.push(index);
    }
  }
  ngAfterViewInit(): void {
    this.createScroll();
  }

  private createScroll() {
    if (!this.scrollEl) {
      return;
    }
    const rect = this.getRect(this.scrollEl.nativeElement);
    const listwrapperHtml = this.listWrapper.nativeElement as HTMLElement;
    listwrapperHtml.style.minHeight = `${rect.height + 1}px`;
    this.scroll = new BScroll(this.scrollEl.nativeElement, {
      scrollY: true,
      pullDownRefresh: this.pullDownRefresh,
      pullUpLoad: { threshold: 40 }
    });
    this.scroll.on('pullingDown', this.pullingDownHandler.bind(this));
    this.scroll.on('scroll', this.scrollHandler.bind(this));
    this.scroll.on('pullingUp', this.pullingUpHanlder.bind(this));
  }
  scrollHandler(pos) {
    if (!this.pullDownRefresh) {
      return;
    }

    if (this.beforePullDown) {
      this.bubbleY = Math.max(0, pos.y + this.pullDownInitTop);
      // console.log(`bubley:${this.bubbleY}`);
      this.pullDownStyle = `${Math.min(pos.y + this.pullDownInitTop, 10)}px`;
    } else {
      this.bubbleY = 0;
    }

    if (this.isRebounding) {
      this.pullDownStyle = `${10 - (this.pullDownRefresh.stop - pos.y)}px`;
    }
  }
  pullingDownHandler(args) {
    console.log(args);
    console.log('pulling down');
    this.beforePullDown = false;
    this.isPullingDown = true;
    setTimeout(() => {
      this.ngOnInit();
      this.forceUpdate(true);
    }, 2000);
  }
  pullingUpHanlder() {
    console.log('pulling up');
    this.isPullUpLoad = true;
    setTimeout(() => {
      for (let index = 0; index < 10; index++) {
        const i = this.list.length - 1 + index;
        this.list.push(i);
      }
      this.isPullUpLoad = false;
      this.scroll.finishPullUp();
      this.refresh();
    }, 2000);
  }
  refresh() {
    this.scroll.refresh();
  }
  getRect(el: HTMLElement): { top: number, left: number, width: number, height: number } {
    return {
      top: el.offsetTop,
      left: el.offsetLeft,
      width: el.offsetWidth,
      height: el.offsetHeight
    };
  }
  forceUpdate(dirty) {
    if (this.pullDownRefresh && this.isPullingDown) {
      this.isPullingDown = false;
      this.cdr.detectChanges();
      this._reboundPullDown().then(() => {
        this._afterPullDown();
      });

    }
    // } else if (this.pullUpLoad && this.isPullUpLoad) {
    //   this.isPullUpLoad = false
    //   this.scroll.finishPullUp()
    //   this.pullUpDirty = dirty
    //   this.refresh()
    // } else {
    //   this.refresh()
    // }
  }
  _reboundPullDown() {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.isRebounding = true;
        this.scroll.finishPullDown();
        resolve();
      }, 600);
    });
  }
  _afterPullDown() {
    setTimeout(() => {
      this.pullDownStyle = `${this.pullDownInitTop}px`;
      this.beforePullDown = true;
      this.isRebounding = false;
      this.refresh();
    }, this.scroll.options.bounceTime);
  }
}

