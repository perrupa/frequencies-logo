import {
  BoxGeometry,
  DoubleSide,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial,
  PerspectiveCamera,
  Scene,
  ShapeBufferGeometry,
  WebGLRenderer
} from "three";

import EffectComposer, {
  // CopyShader,
  RenderPass,
  ShaderPass
} from "@johh/three-effectcomposer";

import SVGLoader from "three-svg-loader";

export const getRenderer = (window, selector) => {
  const canvas = document.querySelector(selector);
  const renderer = new WebGLRenderer({ canvas, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  // renderer.setClearColorHex(0xffffff, 1);
  return renderer;
};

export const getCamera = (height, width) => {
  const fov = 75;
  const aspect = width / height;
  const near = 0.1;
  const far = 5;
  const camera = new PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 3;

  return camera;
};

export const getCube = () => {
  const loader = new SVGLoader();
  const geometry = new BoxGeometry(1, 1, 1);
  const material = new MeshBasicMaterial({ color: 0x44aa88 });
  // const material = new MeshLambertMaterial({
  //   map: loader.load("./frequencies-logo.svg")
  // });

  return new Mesh(geometry, material);
};

export const getSVG = url => {
  const loader = new SVGLoader();

  return new Promise((resolve, reject) => {
    loader.load(
      url,
      ({ paths }) => {
        const group = paths
          .map(path => [
            path,
            new MeshBasicMaterial({
              color: path.color,
              side: DoubleSide,
              depthWrite: false
            })
          ])
          .map(([path, material]) => {
            path
              .toShapes(true)
              .map(shape => new ShapeBufferGeometry(shape))
              .map(geometry => new Mesh(geometry, material));
          })
          .reduce((meshes, mesh) => meshes.concat(mesh), [])
          .reduce((group, mesh) => group.add(mesh), new Group());

        resolve(group);
      },
      () => {},
      () => reject()
    );
  });
};

export function getScene() {
  const scene = new Scene();
  const cube = getCube();
  scene.add(cube);

  return scene;
}

export function getComposer(state) {
  // Building Composer
  const composer = new EffectComposer(state.renderer);

  // Shaders
  state.shaders = {
    renderPass: new RenderPass(state.scene, state.camera),
    badTVPass: new ShaderPass(THREE.BadTVShader)
    // copyPass: new ShaderPass(CopyShader)
  };

  const shaders = Object.values(state.shaders);

  // debugger;

  shaders.forEach(shader => {
    shader.renderToScreen = true;
    composer.addPass(shader);
  });

  return composer;
}
