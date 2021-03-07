import EffectComposer, {
  RenderPass,
  ShaderPass,
} from "@johh/three-effectcomposer";

import { Scene } from "three";

import { getRenderer, getCamera, getLogo } from "./scene";

let state = {
  shaderTime: 0,
  playing: true,
};

function init() {
  state.renderer = getRenderer(window, "#app");
  state.camera = getCamera(window.innerHeight, window.innerWidth);
  state.scene = new Scene();

  const logo = getLogo();
  state.scene.add(logo);

  // Shaders
  state.shaders = {
    renderPass: new RenderPass(state.scene, state.camera),
    badTVPass: new ShaderPass(THREE.BadTVShader),
    rgbPass: new ShaderPass(THREE.RGBShiftShader),
  };

  // BadTV Config
  const { uniforms: TVConfig } = state.shaders.badTVPass;
  TVConfig.speed.value = 0.1;
  TVConfig.rollSpeed.value = 0;
  TVConfig.distortion2.value = 0.03;
  TVConfig.distortion2.value = 0.03;

  // Building Composer
  state.composer = new EffectComposer(state.renderer);
  state.composer.addPass(state.shaders.renderPass);
  state.composer.addPass(state.shaders.badTVPass);
  // state.composer.addPass(state.shaders.rgbPass);
}

function animate() {
  state.shaderTime += 0.03;
  state.shaders.badTVPass.uniforms.time.value = state.shaderTime;

  if (state.playing) {
    state.composer.render();
    requestAnimationFrame(() => animate(state));
  }
}

init(state);
animate(state);

document.getElementById("app").addEventListener("click", () => {
  state.playing = !state.playing;
  animate();
});
