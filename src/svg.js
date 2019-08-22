import { getRenderer, getScene, getCamera, getComposer, getSVG } from "./scene";

const ANIMATION_TICK = 0.1;

const state = {
  isPlaying: true,
  shaderTime: 0,
  isPlaying: true
};

export function init() {
  console.log("Initializing the app...");

  state.renderer = getRenderer(window, "#app");
  state.camera = getCamera(window.innerHeight, window.innerWidth);
  state.scene = getScene();
  state.composer = getComposer(state);

  animate();

  document.getElementById("app").addEventListener("click", togglePlayState);
}

function incrementTimeBy(state, interval) {
  const newTime = state.shaderTime + interval;

  state.shaderTime = newTime;

  if (state.shaders.badTVPass) {
    state.shaders.badTVPass.uniforms["time"].value = newTime;
  }
}

function animate() {
  incrementTimeBy(state, ANIMATION_TICK);

  if (state.isPlaying) {
    state.composer.render(0.1);
    requestAnimationFrame(() => animate(state));
  }
}

const togglePlayState = () => {
  state.isPlaying = !state.isPlaying;
  state.isPlaying && animate(state);
};
