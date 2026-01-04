import { useEffect, useRef } from 'react'
import * as THREE from 'three'
// @ts-ignore - WebGPU types might be missing or experimental
import WebGPURenderer from 'three/examples/jsm/renderers/webgpu/WebGPURenderer.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export const Canvas = () => {
    const mountRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!mountRef.current) return

        // Scene Setup
        const scene = new THREE.Scene()
        scene.background = new THREE.Color(0x050505) // Void Color

        // Camera Setup (Orthographic for precision 2D drafting by default)
        const aspect = window.innerWidth / window.innerHeight
        const frustumSize = 10
        const camera = new THREE.OrthographicCamera(
            (frustumSize * aspect) / -2,
            (frustumSize * aspect) / 2,
            frustumSize / 2,
            frustumSize / -2,
            0.1,
            1000
        )
        camera.position.set(0, 0, 10)

        // Renderer Setup (WebGPU)
        const renderer = new WebGPURenderer({ antialias: true })
        renderer.setPixelRatio(window.devicePixelRatio)
        renderer.setSize(window.innerWidth, window.innerHeight)
        mountRef.current.appendChild(renderer.domElement)

        // Controls
        const controls = new OrbitControls(camera, renderer.domElement)
        controls.enableDamping = true
        controls.dampingFactor = 0.05
        controls.screenSpacePanning = true
        controls.minDistance = 1
        controls.maxDistance = 100

        // Initial Test Geometry (The Seed)
        const geometry = new THREE.IcosahedronGeometry(1, 0)
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
        const seed = new THREE.Mesh(geometry, material)
        scene.add(seed)

        // Animation Loop
        const animate = () => {
            seed.rotation.x += 0.01
            seed.rotation.y += 0.01
            controls.update()
            renderer.render(scene, camera)
        }
        renderer.setAnimationLoop(animate)

        // Resize Handler
        const handleResize = () => {
            const aspect = window.innerWidth / window.innerHeight
            camera.left = (frustumSize * aspect) / -2
            camera.right = (frustumSize * aspect) / 2
            camera.top = frustumSize / 2
            camera.bottom = frustumSize / -2
            camera.updateProjectionMatrix()
            renderer.setSize(window.innerWidth, window.innerHeight)
        }
        window.addEventListener('resize', handleResize)

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize)
            // renderer.dispose() // Method might vary in WebGPU
            if (mountRef.current) {
                mountRef.current.removeChild(renderer.domElement)
            }
        }
    }, [])

    return (
        <div
            ref={mountRef}
            style={{
                width: '100vw',
                height: '100vh',
                overflow: 'hidden',
                position: 'absolute',
                top: 0,
                left: 0
            }}
        />
    )
}
