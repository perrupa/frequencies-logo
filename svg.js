import EffectComposer, {
  RenderPass,
  CopyShader,
  ShaderPass,
} from '@johh/three-effectcomposer';

import {
  Scene,
} from 'three';

import {getRenderer, getCamera, getCube} from './scene'

let state = {
  shaderTime: 0,
};

function init(state) {
  state.renderer = getRenderer(window, '#app');
  state.camera = getCamera(window.innerHeight, window.innerWidth);
  state.scene = new Scene();

  const cube = getCube();
  state.scene.add(cube);

  // Shaders
  state.shaders = {
    renderPass: new RenderPass(state.scene, state.camera),
    badTVPass: new ShaderPass(THREE.BadTVShader),
    copyPass: new ShaderPass(CopyShader),
  };

  // Building Composer
  state.composer = new EffectComposer(state.renderer);
  state.composer.addPass(state.shaders.renderPass);
  state.composer.addPass(state.shaders.badTVPass);
}

function animate(state) {
  state.shaderTime += 0.1;
  state.shaders.badTVPass.uniforms[ 'time' ].value =  state.shaderTime;
  // console.log(`tick ${shaderTime}`)
  requestAnimationFrame(() => animate(state));

  state.composer.render(0.1)
}

init(state);
animate(state);

