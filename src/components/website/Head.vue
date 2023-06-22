<template>
    <v-img
        src="https://res.cloudinary.com/rukkiecodes/image/upload/v1687297065/Titi%20Artistry%20Gallery/theregisti-HSXIp58yPyI-unsplash_pjns2x.jpg"
        lazy-src="https://res.cloudinary.com/rukkiecodes/image/upload/v1687297065/Titi%20Artistry%20Gallery/theregisti-HSXIp58yPyI-unsplash_pjns2x.jpg"
        gradient="rgba(0,0,0,0.8), rgba(0,0,0,0.4)" cover width="100vw" height="93vh">
        <div ref="canvasContainer"></div>
    </v-img>
</template>

<script>
import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'

export default {
    mounted() {
        // Set up the scene, camera, and renderer
        this.init();

        // Load the font and create text geometry
        const fontLoader = new FontLoader();
        fontLoader.load('https://threejsfundamentals.org/threejs/resources/threejs/fonts/helvetiker_regular.typeface.json', (font) => {
            const textGeometry = new TextGeometry('Hello', {
                font: font,
                size: 1,
                height: 0.2,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelSegments: 5,
            });

            // Create text material
            const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

            // Create text mesh
            const textMesh = new THREE.Mesh(textGeometry, textMaterial);

            // Add text mesh to the scene
            this.scene.add(textMesh);

            // Create outline material
            const outlineMaterial = new THREE.ShaderMaterial({
                vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
                fragmentShader: `
          varying vec2 vUv;
          void main() {
            float distance = length(vec2(0.5, 0.5) - vUv);
            float alpha = smoothstep(0.45, 0.55, distance);
            gl_FragColor = vec4(1.0, 1.0, 1.0, alpha);
          }
        `,
                transparent: true,
            });

            // Create outline mesh
            const outlineMesh = new THREE.Mesh(textGeometry, outlineMaterial);
            outlineMesh.scale.set(1.1, 1.1, 1.1); // Slightly scale up the outline

            // Add outline mesh to the scene
            this.scene.add(outlineMesh);
        });

        // Start the animation loop
        this.animate();
    },
    methods: {
        init() {
            // Create a scene
            this.scene = new THREE.Scene();

            // Create a camera
            this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            this.camera.position.z = 5;

            // Create a renderer
            this.renderer = new THREE.WebGLRenderer({ antialias: true });
            this.renderer.setSize(window.innerWidth, window.innerHeight);

            // Append the renderer to the container element
            this.$refs.canvasContainer.appendChild(this.renderer.domElement);
        },
        animate() {
            requestAnimationFrame(this.animate);

            // Rotate the text meshes
            this.scene.traverse((object) => {
                if (object instanceof THREE.Mesh) {
                    object.rotation.x += 0.01;
                    object.rotation.y += 0.01;
                }
            });

            // Render the scene
            this.renderer.render(this.scene, this.camera);
        },
    },
};
</script>


<style scoped>
canvas {
    display: block;
}
</style>