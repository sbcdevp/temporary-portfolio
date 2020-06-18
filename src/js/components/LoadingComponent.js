import AnimationComponent from "./AnimationComponent.js"
import HeadComponent from "./HeadComponent.js"
import IntroComponent from "./IntroComponent.js"

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

import models from "../models/models.json"


class LoadingComponent {
    constructor() {
        this._ui = {
            animationComponent: new AnimationComponent({el: document.querySelector('.js-container')}),
            introComponent: new IntroComponent({el: document.querySelector('.js-intro-container')}),
            headComponent: new HeadComponent({el: document.querySelector('.js-left-container')})
        }
        this._setup();
    }

    _setup() {
        this._promises = [];
        this.models = {};

        this._loadAssets().then(() => this._assetsLoadedHandler());
    }

    _loadAssets() {
        let totalItems = models.length;
        let dracoLoader = new DRACOLoader();
        let loader = new GLTFLoader()
        dracoLoader.setDecoderPath('draco/gltf/');
        loader.setDRACOLoader(dracoLoader);

        for (let i = 0; i < models.length; i++) {
            let promise = new Promise(resolve => {
                loader.load(models[i].url, resolve);
                this.models[`${models[i].name}`] = {};
            })
                .then(result => {
                    this.models[`${models[i].name}`] = result;
                    this._modelsLoaded += 1;
                    // this.components.loader.updateProgress(this._modelsLoaded / totalItems * 100);
                });
            this._promises.push(promise);
        }

        // Promise.all(this._promises).then(() => this._loadHandler())

        return Promise.all(this._promises);
    }

    _assetsLoadedHandler() {
        this._ui.headComponent.setupSceneObjects(this.models);
    }

}

export default LoadingComponent;