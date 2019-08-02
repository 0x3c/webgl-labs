
import * as THREE from 'three'

const init = (canvas: HTMLCanvasElement) => {

    const renderer = new THREE.WebGLRenderer({ canvas })

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 1, 4000)
    camera.position.set(0, 0, 3.3333)

    scene.add(camera)

    const geometry = new THREE.PlaneGeometry(1, 1)
    const mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial())

    scene.add(mesh)
    renderer.render(scene, camera)
}
export default init