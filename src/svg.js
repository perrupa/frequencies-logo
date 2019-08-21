import { getRenderer, getScene, getCamera, getComposer, getSVG } from "./scene";

export function init() {
  console.log("Initializing the app...");

  const state = {
    isPlaying: true,
    shaderTime: 0
  };

  state.renderer = getRenderer(window, "#app");
  state.camera = getCamera(window.innerHeight, window.innerWidth);
  state.scene = getScene();
  state.composer = getComposer(state);

  animate(state);

  document
    .getElementById("app")
    .addEventListener("click", () => togglePlayState(state));

  return state;
}

function animate(state) {
  state.shaderTime += 0.1;
  state.shaders.badTVPass.uniforms["time"].value = state.shaderTime;

  if (state.isPlaying) {
    state.composer.render(0.1);
    requestAnimationFrame(() => animate(state));
  }
}

const togglePlayState = state => {
  state.isPlaying = !state.isPlaying;
  state.isPlaying && animate(state);
};
