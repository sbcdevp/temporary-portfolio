import HeadComponent from "./HeadComponent";

class ThreeMainScene {
    constructor() {
        this._headComponent = new HeadComponent({ el: document.querySelector('.js--container') });
        this._projectsComponent = new ProjectsComponent({ el: document.querySelector('.js-projects-container') });

    }

    _setupRenderer() {

        this._renderer = new THREE.WebGLRenderer({
            canvas: this._canvas,
            antialias: true,
            alpha: true,
        });

        this._renderer.setPixelRatio(3);
    }

    renderScenes(sceneInfo) {
        const { scene, camera, elem } = sceneInfo;

        // get the viewport relative position of this element
        const { left, right, top, bottom, width, height } =
            elem.getBoundingClientRect();

        const isOffscreen =
            bottom < 0 ||
            top > this._renderer.domElement.clientHeight ||
            right < 0 ||
            left > this._renderer.domElement.clientWidth;

        if (isOffscreen) {
            return;
        }

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        const positiveYUpBottom = canvasRect.height - bottom;
        this._renderer.setScissor(left, positiveYUpBottom, width, height);
        this._renderer.setViewport(left, positiveYUpBottom, width, height);

        this._renderer.render(scene, camera);
    }

    setupFirstScene() {

    }

    setupSecondScene() {

    }

    animate() {
        window.requestAnimationFrame(() => this._animate());

    }

    render() {

    }
}

export default ThreeMainScene;