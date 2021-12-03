
import { Slider } from "./slider";

export class VolumeSlider{
    #isMuted = false;
    #beforeValue;
    #curentValue;
    // #volumeChangeCallbacks;



    constructor(initialValue, muteVolumeCallback, testVolumeChangeCallbacks) {
 
        this.muteVolumeCallback = muteVolumeCallback;
        this.testVolumeChangeCallbacks = testVolumeChangeCallbacks;
        // this.store = createStore(volumeReducer);
        this.volumeButton = document.getElementById('volume');
        var volumeContainer = document.querySelector(".volume-container");
        this.slider = new Slider(volumeContainer, 100, 0, 1);
        this.slider.emitSliderAction.on("changeSlider", (data) => {
            // console.log('data',data);
            this.testVolumeChangeCallbacks(data);
           
            
         
            // this.#sliderValueChanged(data);
        });


        this.volumeButton.addEventListener('click', (e)=>{
            // console.log(this.muteVolumeCallback);
            this.muteVolumeCallback();
          
        })
     
        // this.volumeButton.addEventListener('click', this.#handleVolumeByttonClick.bind(this));
        this.slider.setValue(initialValue);
        
    }

    // onClickMute(callback){
        
    //     console.log(e);
    //     callback();
    // }

    setValue(value) {
        console.log(value);
        // this.#curentValue = value;
        this.slider.setValue(value);
    }

    // onChange(callback) {
    //     if (!this.volumeChangeCallbacks) {
    //         this.volumeChangeCallbacks = [];
    //     }

    //     this.volumeChangeCallbacks.push(callback);
    // }

    // #sliderValueChanged(data) {
    //     if (this.#volumeChangeCallbacks) {
    //         this.#volumeChangeCallbacks.forEach(callback => {
    //             callback(data);
    //         });
    //     }
    // }

    // #handleVolumeByttonClick() {
    //     this.#isMuted = !this.#isMuted;
    //     let newValue = this.#beforeValue

    //     if (this.#isMuted) {
    //         this.#beforeValue = this.#curentValue;
    //         newValue = 0;
    //     }

    //     this.slider.setValue(newValue);
    // }
}