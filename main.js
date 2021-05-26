import './style.css';
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
const material = new THREE.MeshStandardMaterial({color: 0xff6347});
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20, 20, 20);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}
Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('background.jpeg');
scene.background = spaceTexture;

const grassTexture = new THREE.TextureLoader().load('face.jpeg');
const cube = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: grassTexture }));
scene.add(cube);
cube.position.setZ(5);
cube.position.setX(10);

const earthTexture = new THREE.TextureLoader().load('earth.jpeg');
const normalTexture = new THREE.TextureLoader().load('normal.png');

const planet = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
    normalMap: normalTexture,
  })
);
scene.add(planet);
planet.position.setZ(30);
planet.position.setX(-10);

const marsTexture = new THREE.TextureLoader().load('mars.jpeg');
const mars = new THREE.Mesh(
  new THREE.SphereGeometry(1.5, 32, 32),
  new THREE.MeshStandardMaterial({
    map: marsTexture,
    normalMap: normalTexture,
  })
);
scene.add(mars);
mars.position.setZ(30);
mars.position.setX(20);
mars.position.setY(7);

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  if(t === -1){
    camera.rotateX(0);
    camera.rotateY(0);
    camera.rotateZ(0);
  }
  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
}

document.body.onscroll = moveCamera;
camera.position.z = 0;
camera.position.x = 0;
camera.position.y = 0;

function animate() {
  requestAnimationFrame(animate);

  torus.rotateX(0.002);
  torus.rotateY(0.002);
  torus.rotateZ(0.002);

  cube.rotateX(-0.002);
  cube.rotateY(-0.002);
  cube.rotateZ(-0.002);

  planet.rotation.x += 0.003;
  planet.rotation.y += 0.003;

  mars.rotation.x += 0.03;
  mars.rotation.y += 0.03;

  renderer.render(scene, camera);
}

animate();