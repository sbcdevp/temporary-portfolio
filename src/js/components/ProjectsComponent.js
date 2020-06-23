class ProjectsComponent {
    constructor() {
        this._setupScene();
    }

    _setupScene() {
        this._scene = new THREE.Scene();

        this._camera = new THREE.PerspectiveCamera(60, this._canvas.width / this._canvas.height, 1, 1000);
        this._camera.position.set(0, 0, 100);

        this._renderer = new THREE.WebGLRenderer({
            canvas: this._canvas,
            antialias: true,
            alpha: true,
        });

        this._renderer.setPixelRatio(3);
    }

    _loadVideos() {
        var video = document.getElementById('video');
        var texture = new THREE.VideoTexture(video);
        texture.needsUpdate;
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.format = THREE.RGBFormat;
        texture.crossOrigin = 'anonymous';

        var imageObject = new THREE.Mesh(
            new THREE.PlaneGeometry(width, height),
            new THREE.MeshBasicMaterial({ map: texture }));

        scene.add(imageObject);
    }
}

export default ProjectsComponent;