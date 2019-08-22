import {
  BoxGeometry,
  MeshBasicMaterial,
  TextureLoader,
  MeshLambertMaterial,
  PlaneGeometry,
  Mesh
} from "three";

export function getCube() {
  const geometry = new BoxGeometry(1, 1, 1);
  const material = new MeshBasicMaterial({ color: 0x44aa88 });

  return new Mesh(geometry, material);
}

export function getLogo() {
  // Create a texture loader so we can load our image file
  var loader = new TextureLoader();

  // Load an image file into a custom material
  var material = new MeshLambertMaterial({
    map: loader.load("../frequencies-logo.svg")
  });

  // create a plane geometry for the image with a width of 10
  // and a height that preserves the image's aspect ratio
  var geometry = new PlaneGeometry(10, 10 * 0.75);

  // combine our image geometry and material into a mesh
  var logo = new Mesh(geometry, material);

  // set the position of the image mesh in the x,y,z dimensions
  logo.position.set(0, 0, 0);

  return logo;
}
