import * as THREE from 'three';
import { TweenLite, Power3 } from "gsap";

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { BloomPass } from 'three/examples/jsm/postprocessing/BloomPass.js';
import { CopyShader } from 'three/examples//jsm/shaders/CopyShader.js';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

class HeadComponent {
    constructor(el) {
        this._el = el.el
        this._canvas = this._el.querySelector(".js-canvas-head");
        this._setup();
    }

    _setup() {
        this._isReady = false

        this._setupHeadScene();
        this._setupHandlers();
        this._animate();
    }

    _setupHandlers() {
        document.addEventListener('mousemove', () => this._mouseMoveHandler());
        this._el.addEventListener('click', () => this._rotateHeadOnClick());
    }

    _setupHeadScene() {
        this._scene = new THREE.Scene();

        this._camera = new THREE.PerspectiveCamera(60, this._canvas.width / this._canvas.height, 1, 1000);
        this._camera.position.set(0, 0, 100);

        this._raycaster = new THREE.Raycaster();
        this._mouse = new THREE.Vector2();
        this._pointOfIntersection = new THREE.Vector3();

        // this._renderModel = new RenderPass(this._scene, this._camera);
        // this._effectBloom = new BloomPass(2);
        // this._effectCopy = new ShaderPass(CopyShader);

        // this._composer = new EffectComposer(this._renderer);

        // this._composer.addPass(this._renderModel);
        // this._composer.addPass(this._effectBloom);
        // this._composer.addPass(this._effectCopy);

    }

    setupSceneObjects(object) {
        this._isReady = true;
        this._head = object.head.scene

        this._plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -20);

        this._setupHeadObject(this._head);
        this._setupLights();
    }

    _setupLights() {
        let ambientLight = new THREE.AmbientLight(0x404040, 19)
        this._scene.add(ambientLight);
    }

    _setupHeadObject() {
        this._head.scale.set(0.1, 0.1, 0.1);
        this._scene.add(this._head)
    }

    _updateHeadLookAt() {
        this._raycaster.setFromCamera(this._mouse, this._camera);
        this._raycaster.ray.intersectPlane(this._plane, this._pointOfIntersection);
        this._head.lookAt(this._pointOfIntersection);
        // this._head.lookAt(this._mouse.x, this._mouse.y, 0)
    }

    _rotateHeadOnClick() {
        console.log("rotate");
        this._headRotating = true;
        TweenLite.to(this._head.position, 1, {
            y: 10 + this._pointOfIntersection.y, x: 10 + this._pointOfIntersection.x, ease: Power3.easeInOut, onComplete: () => {
                this._headRotating = false;
            }
        })

    }

    _mouseMoveHandler() {
        this._mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this._mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    }

    _animate() {
        if (!this._isReady) return;
        this._render();
    }

    _render() {
        // if (!this._headRotating) {
        this._updateHeadLookAt();
        // }
        // this._composer.render(this._scene, this._camera);
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