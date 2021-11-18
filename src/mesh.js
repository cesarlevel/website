import * as THREE from 'three';
import vertexShader from './vertex.glsl';
import fragmentShader from './fragment.glsl';


/** @type {HTMLCanvasElement} */

export default class MeshStage {
  constructor(element) {
    this.element = element;

    this.frames = 0;

    this.viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    this.scene = new THREE.Scene();

    this.mouse = {
      x: 0,
      y: 0
    };

    this.settings = {
      // vertex
      uFrequency: {
        start: 0,
        end: 0
      },
      uAmplitude: {
        start: 0,
        end: 0
      },
      uDensity: {
        start: 0,
        end: 0
      },
      uStrength: {
        start: 0,
        end: 0
      },
      uDeepPurple: {
        start: 0,
        end: 0
      },
      uOpacity: {
        start: 1,
        end: 1
      }
    };

    this.renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });

    this.canvas = this.renderer.domElement;

    this.camera = new THREE.PerspectiveCamera( 
      65, 
      this.viewport.width / this.viewport.height, 
      .1, 
      10
    );

    this.clock = new THREE.Clock();

    this.update = this.update.bind(this);

    this.init();
  }

  init() {
    this.addCanvas()
    this.addCamera()
    this.addMesh()
    this.addEventListeners()
    this.onResize()
    this.update()
  }

  /**
   * STAGE
   */
  addCanvas() {
    this.canvas.classList.add('webgl')
    document.body.appendChild(this.canvas)
  }

  addCamera() {
    this.camera.position.set(this.getRandomProps.camera.x, this.getRandomProps.camera.y, this.getRandomProps.camera.z);
    this.scene.add(this.camera)
  }

  /**
   * OBJECT
   */
   addMesh() {
    this.geometry = new THREE.IcosahedronGeometry(1, this.getRandomProps.mesh.geometry.detail);

    this.material = new THREE.ShaderMaterial({
      blending: THREE.AdditiveBlending,
      transparent: true,
      vertexShader,
      fragmentShader,
      ...this.getRandomProps.mesh.material
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
  }

  /**
   * EVENTS
   */
  addEventListeners() {
    window.addEventListener('resize', this.onResize.bind(this));
    window.addEventListener('mousemove', this.onMouseMove.bind(this));
  }

  onMouseMove(event) {
    this.mouse.x = (event.clientX / this.viewport.width).toFixed(2) * 0.5;
    this.mouse.y = (event.clientY / this.viewport.height).toFixed(2) * 0.5;
  }

  onResize() {
    this.viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    if (this.viewport.width < this.viewport.height) {
      this.mesh.scale.set(.75, .75, .75)
    } else {
      this.mesh.scale.set(1, 1, 1)
    }

    this.camera.aspect = this.viewport.width / this.viewport.height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.viewport.width, this.viewport.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  }

  getRandom({min = 0, max = 0, int = true, posNeg = false} = {}) {
    let r = !min ? Math.random() * max : Math.random() * (max - min) + min;
    if (int) {
      r = Math.floor(r);
    }
    if (posNeg) {
      const posNegValue = Math.random() < 0.5 ? 1 : -1;
      r = posNegValue * r; 
    }
    return r;
  }

  get getRandomProps() {
    return {
      camera: {
        x: this.getRandom({max: 1.5, int: false, posNeg: true}),
        y: this.getRandom({max: 0.2, int: false, posNeg: true}),
        z: this.getRandom({min: 2, max: 3}),
      },
      mesh: {
        geometry: {
          detail: this.getRandom({min: 2, max: 6}), 
        },
        material: {
          wireframe: Math.random() < 0.5,
          uniforms: {
            uFrequency: { value: this.getRandom({min: 0, max: 4}) },
            uAmplitude: { value: this.getRandom({min: 0, max: 4}) },
            uDensity: { value: this.getRandom({min: 1, max: 4}) },
            uStrength: { value: this.getRandom({min: 1, max: 5}) },
            uDeepPurple: { value: this.getRandom({min: 0, max: 1}) },
            uOpacity: { value: this.getRandom({min: 1, max: 3}) }
          },
        } 
      },
    }
  }

  /**
   * LOOP
   */
  update() {
    this.frames++;

    if (this.frames === 240) {
      this.camera.position.set(this.getRandomProps.camera.x, this.getRandomProps.camera.y, this.getRandomProps.camera.z);
      this.mesh.material.wireframe = this.getRandomProps.mesh.material.wireframe;
      this.mesh.material.uniforms.uFrequency.value = this.getRandomProps.mesh.material.uniforms.uFrequency.value;
      this.mesh.material.uniforms.uAmplitude.value = this.getRandomProps.mesh.material.uniforms.uAmplitude.value;
      this.mesh.material.uniforms.uDensity.value = this.getRandomProps.mesh.material.uniforms.uDensity.value;
      this.mesh.material.uniforms.uStrength.value = this.getRandomProps.mesh.material.uniforms.uStrength.value;
      this.mesh.material.uniforms.uDeepPurple.value = this.getRandomProps.mesh.material.uniforms.uDeepPurple.value;
      this.mesh.material.uniforms.uOpacity.value = this.getRandomProps.mesh.material.uniforms.uOpacity.value;
      this.geometry.parameters.detail = this.getRandomProps.mesh.geometry.detail;
      if (Math.random() < 0.5) {
        this.canvas.classList.toggle('is-zoom');
      }
      this.frames = 0;
    }
    const elapsedTime = this.clock.getElapsedTime();

    this.mesh.rotation.x = elapsedTime * .05;
    this.mesh.rotation.y = elapsedTime * .05;

    this.render();
    window.requestAnimationFrame(this.update);
  }

  /**
   * RENDER
   */
  render() {
    this.renderer.render(this.scene, this.camera);
  }  
}
