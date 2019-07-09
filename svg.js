// import EffectComposer, {
//   RenderPass,
//   ShaderPass,
// } from '@johh/three-effectcomposer';

import {
  // Color,
  // MeshBasicMaterial,
  // BoxBufferGeometry,
  // ShapeBufferGeometry,
  // Mesh,
  // DoubleSide,
  // Group,
  // WebGLRenderer,
  // SVGLoader,
  // BoxGeometry,
  // PerspectiveCamera,
  Scene,
} from 'three';

import {getRenderer, getCamera, getCube} from './scene'

function main() {
  const renderer = getRenderer(window.innerHeight, window.innerWidth);
  const camera = getCamera(window.innerHeight, window.innerWidth);
  const scene = new Scene();

  const cube = getCube();

  scene.add(cube);

  renderer.render(scene, camera);
}

main();

// composer.addPass(renderPass);
// composer.addPass(badTVPass);
// badTVPass.renderToScreen = true;

// var geometry = new BoxBufferGeometry( 1, 1, 1 );
// var material = new MeshBasicMaterial( { color: 0xffff00 } );
// var mesh = new Mesh( geometry, material );

// Effects...?
// const composer = new EffectComposer(renderer);
// const renderPass = new RenderPass(scene, camera);
// const badTVPass = new ShaderPass(THREE.BadTVShader);

// scene.add(mesh)

