import {WebGLRenderer, PerspectiveCamera, Scene, BoxGeometry, MeshBasicMaterial, Mesh} from 'three'

function main() {
  const canvas = document.querySelector('#app');
  const renderer = new WebGLRenderer({canvas});

  const fov = 75;
  const aspect = 2;  // the canvas default
  const near = 0.1;
  const far = 5;
  const camera = new PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 2;

  const scene = new Scene();

  const geometry = new BoxGeometry(1, 1, 1);
  const material = new MeshBasicMaterial({color: 0x44aa88});  // greenish blue

  const cube = new Mesh(geometry, material);

  scene.add(cube);

  renderer.render(scene, camera);
}

main();
