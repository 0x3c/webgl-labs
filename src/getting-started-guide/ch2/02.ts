import * as THREE from 'three'

const github_cat_url = require('./assets/octocat.png')

let renderer: THREE.WebGLRenderer;
let scene: THREE.Scene;
let cube: THREE.Mesh;
let camera: THREE.Camera;
let animating = true;

const run = () => {
    renderer.render(scene, camera);
    if (animating) {
        cube.rotation.y -= 0.01;
        cube.rotation.x -= 0.01;
    }
    requestAnimationFrame(run)
}
const addEvent = () => {
    if (renderer) {
        renderer.domElement.addEventListener('mouseup', () => { animating = !animating }, false);
    }
}

const init = (canvas: HTMLCanvasElement) => {

    // 渲染器
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

    // 场景
    scene = new THREE.Scene();

    // 相机
    camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 1, 4000);
    camera.position.set(0, 0, 3);
    scene.add(camera);

    // 灯光
    const light = new THREE.DirectionalLight(0xffffff, 1.5);
    light.position.set(0, 0, 1);
    scene.add(light);


    // 创建纹理映射
    const map = THREE.ImageUtils.loadTexture(github_cat_url);
    // 创建 phong材质，并关联纹理
    const material = new THREE.MeshPhongMaterial({ map });
    // 创建几何体
    const geometry = new THREE.CubeGeometry(1, 1, 1);
    // 将几何体和材质放入同一个网格
    cube = new THREE.Mesh(geometry, material);

    // 设置网格朝向
    cube.rotation.x = Math.PI / 5;
    cube.rotation.y = Math.PI / 5;
    scene.add(cube);

    addEvent();

    run();
}

export default init