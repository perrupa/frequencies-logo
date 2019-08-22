import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  PointLight,
  Scene,
  WebGLRenderer
} from "three";

import EffectComposer, {
  // CopyShader,
  RenderPass,
  ShaderPass
} from "@johh/three-effectcomposer";

import { getLogo, getCube } from "./actors";

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

export function getScene() {
  const scene = new Scene();

  const actors = {
    // cube: getCube()
    logo: getLogo()
  };

  Object.values(actors).forEach(actor => scene.add(actor));

  // Add a point light with #fff color, .7 intensity, and 0 distance
  var light = new PointLight(0xffffff, 1, 0);

  // Specify the light's position
  light.position.set(1, 1, 100);

  // Add the light to the scene
  scene.add(light);

  return scene;
}

export function getComposer(state) {
  // Building Composer
  const composer = new EffectComposer(state.renderer);

  // Bad shader options

  Object.entries({
    rollSpeed: 0,
    speed: 0.1,
    distortion: 0.4,
    distortion2: 3.4
  }).forEach(([key, value]) => (THREE.BadTVShader.uniforms[key].value = value));

  // Shaders
  state.shaders = {
    renderPass: new RenderPass(state.scene, state.camera),
    badTVPass: new ShaderPass(THREE.BadTVShader)
    // badTVPass: new ShaderPass({
    //   ...THREE.BadTVShader,
    //   rollSpeed: 0,
    //   speed: 0.1,
    // })
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
