import { TimelineLite, Power3 } from "gsap";

class IntroComponent {
    constructor(el) {
        this._el = el.el

        this._ui = {
            introName: this._el.querySelector(".js-intro-name"),

        }
        this._setupIntroTween();
    }

    _setupIntroTween() {
        let introTimeline = new TimelineLite();
        introTimeline.to(this._ui.introName, 1.5, {y: 0, ease: Power3.easeOut, autoAlpha: 1, force3D: true, delay: 1 })
        .to(this._ui.introName, 1.5, {y: "-100%", ease: Power3.easeOut, autoAlpha: 0, force3D: true, delay: 0.5 })
        .to(this._el, 1.5, {height: 0, ease: Power3.easeInOut, force3D: true })
    }
}

export default IntroComponent;