import { momentum } from "./utils";

export interface ScrollOption extends Record<string, any> {
  scrollX: boolean;
  scrollY: boolean;
  momentum: boolean;
}
export const DefaultOption = {
  scrollY: true,
  scrollX: false,
  momentum: true,
};
export class BScroll {
  touch: {
    x: number;
    y: number;
    beginX?: number;
    beginY?: number;
  } = { x: 0, y: 0 };

  private readonly contentEl: HTMLElement | null = null;
  private touching = false;
  private option: ScrollOption | null = null;
  private maxScrollY = 0;
  private maxScrollX = 0;
  private distX: number;
  private distY: number;
  private startTime: number;
  private endTime: number;
  private startX: number;
  private startY: number;
  constructor(el: string | HTMLElement | null, option: ScrollOption) {
    if (!el) {
      return;
    }
    this.option = option
      ? {
          ...DefaultOption,
          ...option,
        }
      : DefaultOption;
    if (typeof el === "string") {
    } else {
      const child = el.children;
      const content = child[0];
      if (!content) {
        console.error("content 为空");
        return;
      }
      this.contentEl = content as HTMLElement;
      if (this.option.scrollX) {
        setTimeout(() => {
          this.maxScrollX = el.clientWidth - this.contentEl.scrollWidth;
        });
      }
      if (this.option.scrollY) {
        setTimeout(() => {
          this.maxScrollY = el.clientHeight - this.contentEl.scrollHeight;
        });
      }
      content.addEventListener(
        "touchstart",
        (e) => {
          this.startTime = +new Date();
          this.touching = true;
          this.distX = 0;
          this.distY = 0;
          this.startX = this.touch.x;
          this.startY = this.touch.y;

          const touches = (e as TouchEvent).touches;
          if (this.option?.scrollX) {
            this.touch.beginX = touches[0].pageX;
          }
          if (this.option?.scrollY) {
            this.touch.beginY = touches[0].pageY;
          }
          console.log("start", this.touch.beginY);
        },
        false
      );
      content.addEventListener(
        "touchmove",
        (e) => {
          if (!this.touching) {
            return;
          }
          const { x, y } = this.touch;
          const touches = (e as TouchEvent).touches;
          const { pageX, pageY } = touches[0];
          let newX, newY;
          if (this.option?.scrollY) {
            let delta = pageY - (this.touch.beginY || 0);

            this.distY += delta;
            const absDistY = Math.abs(this.distY);
            if (absDistY < 10) {
              return;
            }
            // console.log("touchy", this.touch.y, delta, beginY);
            // console.log(y);
            newY = y + delta;
            if (newY > 0 || newY < this.maxScrollY) {
              newY = y + delta / 3;
            }
            this.touch.beginY = pageY;
          }
          if (this.option?.scrollX) {
            let delta = pageX - (this.touch.beginX || 0);
            if (delta > 0 || delta < -1 * this.maxScrollX) {
              delta = delta / 3;
            }
            newX = this.touch.x + delta;
            this.touch.beginX = pageX;
          }
          this.translate(newX || 0, newY || 0);
        },
        false
      );
      content.addEventListener(
        "touchend",
        (e) => {
          console.log("touchend", e);
          this.touching = false;
          this.endTime = +new Date();

          this.resetPointer(this.touch.y, this.touch.x);
          let newY = this.touch.y,
            newX = this.touch.x;
          const duration = this.endTime - this.startTime;
          if (this.option?.momentum && duration < 300) {
            if (this.option.scrollY) {
              const ret = momentum(
                this.touch.y,
                this.startY || 0,
                duration,
                this.maxScrollY,
                this.contentEl?.parentElement?.clientHeight || 0
              );
              console.log(ret);
              newY = ret.destination;
              this.transitionTime(ret.duration);
            }
          }
          if (newY !== this.touch.y || newX !== this.touch.x) {
            this.translate(newX, newY);
          }
        },
        false
      );
    }
  }
  private transitionTime(time = 0) {
    if (this.contentEl) {
      // transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
      // transition-property: transform;
      // transition-duration: 0ms;
      this.contentEl.style.transitionDuration = `${time}ms`;
    }
  }
  private translate(x: number, y: number) {
    if (this.contentEl) {
      // transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
      // transition-property: transform;
      // transition-duration: 0ms;
      this.contentEl.style.transform = ` translateX(${x}px) translateY(${y}px) translateZ(0px)`;
      this.touch.x = x;
      this.touch.y = y;
    }
  }
  private resetPointer(pageY: number, pageX: number) {
    let x = pageX,
      y = pageY;
    if (this.option?.scrollY) {
      let delta = pageY;
      console.log("delta", pageY);
      if (delta > 0) {
        y = 0;
      } else if (delta < this.maxScrollY) {
        y = -1 * this.maxScrollY;
      }
      // if (y && this.contentEl) {
      //   this.contentEl.style.transform = ` translateY(${
      //     this.touch.y || 0
      //   }px) translateZ(0px)`;
      // }
    }
    if (this.option?.scrollX) {
      let delta = pageX;
      if (delta > 0) {
        x = 0;
      } else if (delta < -1 * this.maxScrollX) {
        x = -1 * this.maxScrollX;
      }
    }
    if (x === this.touch.x && this.touch.y === y) {
      return true;
    }
    this.translate(x || 0, y || 0);
  }
}
