import {
  MeshBasicMaterial,
  Mesh,
  WebGLRenderer,
  BoxGeometry,
  PerspectiveCamera,
  TextureLoader,
} from "three";

export const getRenderer = (window, selector) => {
  const canvas = document.querySelector(selector);
  const renderer = new WebGLRenderer({ canvas });
  renderer.setSize(window.innerWidth, window.innerHeight);
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

const logoUrl = require("./frequencies.png");
const loader = new TextureLoader();

export const getLogo = () => {
  const geometry = new BoxGeometry(1, 1, 1);

  const material = new MeshBasicMaterial({
    map: loader.load(logoUrl),
    // transparent: true,
    // opacity: 1,
  });

  return new Mesh(geometry, material);
};
