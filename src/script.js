import './style.css'
import * as THREE from 'three';
import * as dat from 'dat.gui'

import fragmentShader from './shaders/fragment.glsl'
import vertexShader from './shaders/vertex.glsl'

import Stats from 'stats.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { gsap } from "gsap"


const gui = new dat.GUI()
const canvas = document.querySelector('canvas.webgl')


//////////////////////////////// Stats ////////////////////////////////
var stats = new Stats();
stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom )

//////////////////////////////// Scene ////////////////////////////////
const scene = new THREE.Scene()

//////////////////////////////// Objects ////////////////////////////////
const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );

//////////////////////////////// Materials ////////////////////////////////

const material = new THREE.ShaderMaterial({
    vertexShader : vertexShader,
    fragmentShader: fragmentShader,
    uniforms:
    {
        uTime: { value: 0 }
    }
})

//////////////////////////////// Mesh ////////////////////////////////
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

//////////////////////////////// Lights ////////////////////////////////

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

//////////////////////////////// Sizes ////////////////////////////////
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

//////////////////////////////// Camera ////////////////////////////////
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

//////////////////////////////// Controls ////////////////////////////////
const controls = new OrbitControls(camera, canvas)
controls.autoRotate = true
controls.autoRotateSpeed = 5

controls.enableDamping= true
controls.enableZoom = true
controls.enableRotate = true
controls.enablePan = true

//////////////////////////////// Renderer ////////////////////////////////
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

//////////////////////////////// Animation ////////////////////////////////
const clock = new THREE.Clock()

const tick = () =>
{
    stats.begin()

    const elapsedTime = clock.getElapsedTime()

    material.uniforms.uTime.value = elapsedTime

    controls.update()

    renderer.render(scene, camera)
    stats.end()
    window.requestAnimationFrame(tick)
}

tick()