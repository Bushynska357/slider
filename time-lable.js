const timeFormat = (t) => {
    const s = ("00" + (t % 60)).slice(-2);
    return `${Math.floor(t / 60)}:${s}`;
};

export class TimeLable{
    #currentTime;
    constructor(timeElem, { total = 0, fps = 30, current = 0 } = {}){
        this.totalTime = Math.round(total);
        this.fps = fps;
        this.timeElem = timeElem;

        
        this.time = Math.round(current);
        // this.emitTimeAction = new EventEmitter();
    }
    
    get time() {
        return this.#currentTime;
    }

    set time(currentTime){
        this.#currentTime = Math.round(currentTime);
        this.render();
    }

    render() {
        const currentTimeFormated = timeFormat(this.#currentTime);
        this.timeElem.innerHTML = `${currentTimeFormated} / ${timeFormat(this.totalTime)}`
    }

    set totalFrames(generalFrame){
        this.totalTime = Math.round(generalFrame / this.fps);
        this.render();
    }

    set frame(frame){
        const currentTime = Math.round(frame / this.fps);
        this.time = currentTime;
    }
}
