/*
 * @Author: wangshan
 * @Date: 2022-02-21 22:46:26
 * @LastEditors: wangshan
 * @LastEditTime: 2022-03-05 02:58:00
 * @Description: 场景初始化
 */
((global) => {
  class Editor {
    _three = null;
    globals = {};
    globalsProxy = {};

    constructor(THREE) {
      this._three = THREE;
      this.renderer = null;

      //   this.globals = { ...this.initEditor(THREE) };
      this.initEditor(THREE);
    }
    createScene(THREE) {
      this.globals.scene = new THREE.Scene();
    }
    createRender(THREE, panel) {
      if (panel) {
        console.info("tip: 需要提供画布对象");
      }

      let renderer = new THREE.WebGLRenderer({
        antialias: true,
      });
      renderer.setClearColor(0xcccccc);
      renderer.setSize(window.innerWidth, window.innerHeight, false);
      document.body.appendChild(renderer.domElement);

      this.globals.renderer = renderer;
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
      this.globals.camera = camera;
      this.globals.scene.add(camera);
    }
    injectHelper(helpers) {
      for (let key in helpers) {
        this.globals[key] = this.globals.scene.add(helpers[key]);
      }
    }
    createControl(THREE) {
      let controls = new THREE.OrbitControls(
        this.globals.camera,
        this.globals.renderer.domElement
      );

      controls.addEventListener("change", () => {
        this.render();
      });
    }
    render() {
      //   console.log(this.globals);
      this.globals.renderer.render(this.globals.scene, this.globals.camera);
    }
    initEditor(THREE) {
      this.createScene(THREE);
      this.createRender(THREE);
      this.createCamera(THREE);
      this.createControl(THREE);
      this.globals.infos = this.globals.renderer.info;
      //   this.watch();

      // 调整窗口重置画布尺寸
      window.addEventListener("resize", () => {
        this.globals.renderer.setSize(
          window.innerWidth,
          window.innerHeight,
          false
        );
        this.globals.camera.aspect = window.innerWidth / window.innerHeight;
        this.globals.camera.updateProjectionMatrix();
      });
    }
    watch() {
      //
      let proxy = new Proxy(this.globals.scene, {
        set: function (obj, prop, value) {
          console.log(obj, prop);
        },
      });
      this.globalsProxy = proxy;
    }
  }

  global.Editor = Editor;
})(window);
