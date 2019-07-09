import EffectComposer, {
    RenderPass,
    ShaderPass,
} from '@johh/three-effectcomposer'
import { WebGLRenderer, Camera, Scene } from 'three'

// import logo from './frequencies-logo.svg'

console.log("Init.")

//init renderer
const renderer = new WebGLRenderer();
renderer.setSize( 800, 600 );

document.body.appendChild( renderer.domElement );

const scene = new Scene()
const camera = new Camera()
const composer = new EffectComposer( renderer )
const renderPass = new RenderPass( scene, camera )
const badTVPass = new ShaderPass( THREE.BadTVShader )

composer.addPass( renderPass )
composer.addPass( badTVPass )

badTVPass.renderToScreen = true
