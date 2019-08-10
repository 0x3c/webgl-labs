/*
 * @Author: Samuel Chia 
 * @Date: 2019-08-05 15:10:26 
 * @Last Modified by: Samuel Chia
 * @Last Modified time: 2019-08-07 19:47:03
 */
import { SphereGeometry, ImageUtils, MeshBasicMaterial, Mesh } from 'three';
const earth_surface_2048 = require('../../../assets/earth_surface_2048.jpg');


export interface IEarth {
    mesh: Mesh | null;
    init: () => Mesh;
    render: () => void
}

export default class Earth implements IEarth {
    static TILT = .41;
    static RATATION_Y = .0025;
    mesh: Mesh | null = null;
    init = () => {
        const geometry = new SphereGeometry(1, 32, 32);
        const map = ImageUtils.loadTexture(earth_surface_2048);
        const material = new MeshBasicMaterial({ map });
        this.mesh = new Mesh(geometry, material);
        this.mesh.rotation.z = Earth.TILT;
        return this.mesh;
    }
    render = () => {
        if (!this.mesh) {
            return
        }
        this.mesh.rotation.y += Earth.RATATION_Y;
    }
}