import {
  MeshBasicMaterial,
  Mesh,
  Group,
  WebGLRenderer,
  ShapeBufferGeometry,
  DoubleSide,
  BoxGeometry,
  PerspectiveCamera,
} from 'three';

import SVGLoader from 'three-svg-loader'


export const getRenderer = (window, selector) => {
  const canvas = document.querySelector(selector);
  const renderer = new WebGLRenderer({canvas});
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

export const getCube = () => {
  const geometry = new BoxGeometry(1, 1, 1);
  const material = new MeshBasicMaterial({color: 0x44aa88}); // greenish blue

  return new Mesh(geometry, material);
};

export const getSVG = url => {
  const loader = new SVGLoader();

  return new Promise((resolve, reject) => {
    loader.load(
      url,
      ({paths}) => {
        const group = paths
          .map(path => new MeshBasicMaterial({
            color: path.color,
            side: DoubleSide,
            depthWrite: false,
          }))
          .map(material => {
            path.toShapes(true)
              .map(shape => new  ShapeBufferGeometry(shape))
              .map(geometry => new  Mesh(geometry, material))
          })
          .reduce((meshes, mesh) => meshes.concat(mesh), [])
          .reduce((group, mesh) => group.add(mesh), new Group())

        // debugger

        resolve(group);
      },
      () => {},
      () => reject(),
    )
  })
}
