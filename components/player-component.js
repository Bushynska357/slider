export class Player{

    constructor(timeline,time){
        this.scene = new Tetavi.THREE.Scene();
        this.camera = new Tetavi.THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        this.renderer = new Tetavi.THREE.WebGLRenderer({ antialias: true });
        document.body.appendChild(this.renderer.domElement);
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.controls = new TetaviExt.libOrbitControls(this.camera, this.renderer.domElement);
        this.controls.target.set(0, 1.5, 0);

        this.camera.position.z = 5;
        this.camera.position.y = 1.5;
        this.controls.update();

        this.ambient = new Tetavi.THREE.AmbientLight(0x999999);
        this.scene.add(this.ambient);

        this.spotLight = new Tetavi.THREE.SpotLight(0xffffff);
        this.spotLight.position.set(0, 5, 0);
        this.spotLight.castShadow = false;
        this.spotLight.angle = Math.PI / 4;
        this.spotLight.penumbra = 0.1;
        this.spotLight.decay = 2;
        this.spotLight.distance = 200;
        this.scene.add(this.spotLight);
        this.scene.background = new Tetavi.THREE.Color(0x666666);

        this.material = new Tetavi.THREE.MeshPhongMaterial({ color: 0xaaaaaa });
        this.material.side = Tetavi.THREE.BackSide;
        this.bSize = 100;
        this.hSize = 10;
        this.geometry = new Tetavi.THREE.BoxGeometry(this.bSize, this.hSize, this.bSize);
        this.cube = new Tetavi.THREE.Mesh(this.geometry, this.material);
        this.cube.position.set(0, this.hSize / 2, 0);
        this.scene.add(this.cube);

        var libVersionElem = document.getElementById("libVersion");
        var isIosElem = document.getElementById("myIsIOS");

        this.timeElem = document.getElementById("time");
        this.playElem = document.getElementById("playButton");
      
        this.playIcon = document.getElementById("play");
        this.pauseIcon = document.getElementById("pause");

        this.wrapperBtns = document.getElementById("wrapper-buttons");

        this.fullScreenBtn = document.getElementById("fullscreen");
        this.minimizeBtn = document.getElementById("minimize");

        this.volumeRangeElem = document.getElementById("volumeRange");
        // this.progressElem = document.getElementById("myProgress");

        this.timeline = timeline;
        this.time = time; 
        this.tetavi = Tetavi.create(this.renderer, this.camera, this.videoSrc, this.manifestSrc)
    .onSetBar(this.setBar)
    .setFadeAlpha(false)
    .setShadowAngle(0.4)
    .onLog(this.onLog)
    .onPerform(this.onPerform);

    requestAnimationFrame(this.three_animate);

    }


    three_animate() {
        requestAnimationFrame(three_animate);
    
        if (tetavi != null) {
          tetavi.animate();
    
          if (tetavi.isIos()) isIosElem.innerHTML = "On iOS";
          if (tetavi.getTotalFrames() > 1) {
            this.time.totalFrames = tetavi.getTotalFrames();
            this.time.frame = tetavi.getFrame();
    
          }
          if (!tetavi.isVideoBuffering()) {
            playElem.disabled = false;
    
          }
          if (tetavi.isPlaying) {
            const totalFrames = tetavi.getTotalFrames();
            const currentFrame = tetavi.getFrame();
            this.timeline.setValue(100 * (currentFrame / totalFrames));
    
    
          }
        }
        renderer.render(scene, camera);
      }
   
 
    setValueFromslider(value) {
        tetavi.getSrcVideo().volume = value / 100;
        tetavi.getSrcVideo().muted = tetavi.getSrcVideo().volume === 0;
    
        if (tetavi.getSrcVideo().muted) {
          document.getElementById("mute").style.display = "block";
          document.getElementById("unmute").style.display = "none";
        } else {
          document.getElementById("mute").style.display = "none";
          document.getElementById("unmute").style.display = "block";
        }
    }


    fullScreenState() {
        if (!document.fullscreenElement) {
          this.minimizeBtn.style.display = "block";
          this.fullScreenBtn.style.display = "none";
          document.body.requestFullscreen().then(() => {
            this.renderer.setSize(window.innerWidth, window.innerHeight);
          });
        } else {
          document.exitFullscreen();
          this.minimizeBtn.style.display = "none";
          this.fullScreenBtn.style.display = "block";
        }
      };

    setBar(width, widthPlay) {
        timeline.setBuffering(width, widthPlay);
    }

    onPerform(log) {
    var performElem = document.getElementById("myPerform");
    performElem.innerHTML = log;
    }
    

    
    onLog(log) {
        console.log(log);
    }

}