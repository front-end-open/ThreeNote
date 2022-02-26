/*
 * @Author: wangshan
 * @Date: 2022-02-21 22:46:26
 * @LastEditors: wangshan
 * @LastEditTime: 2022-02-21 23:46:19
 * @Description: 场景初始化
 */
((global) => {
  class Editor {
    _three = null;
    _global = {};

    constructor(THREE) {
      this._three = THREE;
      this.renderer = null;

      //   this._global = { ...this.initEditor(THREE) };
      this.initEditor(THREE);
    }
    createScene(THREE) {
      this._global.scene = new THREE.Scene();
    }
    createRender(THREE, panel) {
      if (panel) {
        console.info("tip: 需要提供画布对象");
      }

      let renderer = new THREE.WebGLRenderer({
        antialias: true,
      });
      renderer.setClearColor(0xffffff);
      renderer.setSize(window.innerWidth, window.innerHeight, false);
      document.body.appendChild(renderer.domElement);

      this._global.renderer = renderer;
    }
    createCamera(THREE) {
      let camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.5,
        2000
      );

      camera.position.set(100, 500, 100); // 设置相机所在位置
      camera.lookAt(new THREE.Vector3(0, 0, 0)); // 设置相机观察方向
      this._global.camera = camera;
      this._global.scene.add(camera);
    }
    injectHelper(THREE, helpers) {
      if (typeof helpers === "bject") {
        console.warn("helpers 需要时字面对象初始化");
      }

      for (let key in helpers) {
        this._global[key] = this._global.scene.add(helpers[key]);
      }
    }
    createControl(THREE) {
      let controls = new THREE.OrbitControls(
        this._global.camera,
        this._global.renderer.domElement
      );

      controls.addEventListener("change", () => {
        this.render();
      });
    }
    render() {
      this._global.renderer.render(this._global.scene, this._global.camera);
    }
    initEditor(THREE) {
      this.createScene(THREE);
      this.createRender(THREE);
      this.createCamera(THREE);
      this.createControl(THREE);
    }
  }

  global.Editor = Editor;
})(window);
