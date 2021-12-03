import { htmlToElement } from "../helper.js";
import { EventEmitter } from "../eventemitter.js";

export class Slider {
  constructor(sliderWrapper, max, min, step) {
    this.max = max;
    this.min = min;
    this.step = step;
    this.value = this.min;
    this.mouseIsDown = false;   

    this.sliderContent = htmlToElement(
      '<div class="range"><div class="buffering"></div><div class="progress"><div class="thumb"></div></div></div>'
    );

    this.range = this.sliderContent.querySelector('range')
    this.bufferingElem = this.sliderContent.querySelector(".buffering")
    this.progressElem = this.sliderContent.querySelector(".progress");
    this.thumb = this.sliderContent.querySelector(".thumb");


    this.mouseIsDown = false;
    this.emitSliderAction = new EventEmitter();

    this.init(sliderWrapper);
  }

  init(sliderWrapper) {
    document.addEventListener("mouseup", this.up.bind(this));
    this.thumb.addEventListener("mousedown", this.down.bind(this));
    sliderWrapper.addEventListener(
      "click",
      (e) => {
        const updateValueClick = this.getValue(e);
        this.setValue(updateValueClick);
      },
      true
    );

    document.addEventListener(
      "mousemove",
      (e) => {
        if(this.mouseIsDown){
          const updateValueClick = this.getValue(e);
          this.setValue(updateValueClick);  
        }
                  
      },
      true
    );

    sliderWrapper.appendChild(this.sliderContent);
  }

  down(){ this.mouseIsDown = true;  }
  up(){ this.mouseIsDown = false;  }

  getValue(e){
    const { width: rangeWidth, left: sliderStart} = this.sliderContent.getBoundingClientRect();
    const clickPosition = e.x - sliderStart;
    const percent = clickPosition / rangeWidth;
    const newValue = (this.max - this.min) * percent + this.min;
    return newValue;
  }

  setValue(value) {
    if (value > this.max) {
        value = this.max;
    }

    if (value < this.min) {
        value = this.min;
    }


    const percent = ((value-this.min) / (this.max - this.min)) * 100;
    this.progressElem.style.width = `${percent}%`;
    this.emitSliderAction.emit("changeSlider", value);
    }

    setBuffering(width,widthPlay){
      this.bufferingElem.style.width = 100 * (widthPlay / width) + "%";
    }
    
  
}
