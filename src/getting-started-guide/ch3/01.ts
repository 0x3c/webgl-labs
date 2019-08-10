/*
 * @Author: Samuel Chia 
 * @Date: 2019-08-05 15:00:13 
 * @Last Modified by: Samuel Chia
 * @Last Modified time: 2019-08-07 19:42:03
 */

import * as THREE from 'three'
import Earth, { IEarth } from './components/earth'

let renderer: THREE.WebGLRenderer;
let scene: THREE.Scene;
let earth: IEarth;
let camera: THREE.Camera;
let animating = true;

const run = () => {
    renderer.render(scene, camera);
    if (animating) {
        earth.render()
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

    earth = new Earth();

    const earthMesh = earth.init();
    scene.add(earthMesh);

    addEvent();


    run();
}

export default init