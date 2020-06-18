import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


class HeadComponent {
    constructor(el) {
        this._el = el.el
        this._canvas = this._el.querySelector(".js-canvas-head");
        this._setup();
    }

    _setup() {
        this._isReady = false
        this._setupScene();
        this._animate();
    }

    _setupScene() {
        this._scene = new THREE.Scene();

        this._camera = new THREE.PerspectiveCamera(60, this._canvas.width / this._canvas.height, 1, 1000);
        this._camera.position.set(0, 0, 100)
        this._renderer = new THREE.WebGLRenderer({
            canvas: this._canvas,
            antialias: true,
            alpha: true,
        });

        this._renderer.setPixelRatio(5);
        this._mouse = new THREE.Vector2();
        this._rayCaster = new THREE.Raycaster();
        this._controls = new OrbitControls(this._camera, this._renderer.domElement)
    }
    
    setupSceneObjects(object) {
        this._isReady = true;
        this._head = object.head.scene
        
        this._setupHeadObject(this._head);
        this._setupLights();

    }

    _setupLights() {
        let ambientLight = new THREE.AmbientLight( 0x404040, 19)
        this._scene.add(ambientLight);
    }

    _setupHeadObject() {
        this._head.scale.set(0.2, 0.2, 0.2);
        this._scene.add(this._head)
    }

    _animate() {
        window.requestAnimationFrame(() => this._animate());
        if(!this._isReady) return;
        this._render();
    }

    _render() {
        this._renderer.render(this._scene, this._camera);
    }

    _resize(width, height) {
        this._width = width;
        this._height = height;

        this._camera.aspect = width / height;
        this._camera.updateProjectionMatrix();
        this._renderer.setSize(width, height);
    }
}

export default HeadComponent;