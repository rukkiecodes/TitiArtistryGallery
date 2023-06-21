<template>
    <v-img
        src="https://res.cloudinary.com/rukkiecodes/image/upload/v1687297065/Titi%20Artistry%20Gallery/theregisti-HSXIp58yPyI-unsplash_pjns2x.jpg"
        lazy-src="https://res.cloudinary.com/rukkiecodes/image/upload/v1687297065/Titi%20Artistry%20Gallery/theregisti-HSXIp58yPyI-unsplash_pjns2x.jpg"
        gradient="rgba(0,0,0,0.8), rgba(0,0,0,0.4)" cover width="100vw" height="93vh">
        <canvas class="outlineText"></canvas>
    </v-img>
</template>

<script setup>
import * as THREE from 'three'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'
import { onMounted } from "vue";

onMounted(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('.outlineText') });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Create the text geometry
    const textGeometry = new TextGeometry('Hello, World!', {
        font: 'helvetiker',
        size: 50,
        height: 5,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 2,
        bevelSize: 1,
        bevelOffset: 0,
        bevelSegments: 5
    });

    // Create the text material
    const textMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });

    // Create the text mesh
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    scene.add(textMesh);

    // Create the outline material
    const outlineMaterial = new THREE.ShaderMaterial({
        uniforms: {
            "c": { type: "f", value: 0.1 },
            "p": { type: "f", value: 4.0 }
        },
        vertexShader: `
        uniform float c;
        uniform float p;
        
        varying vec2 vUv;
        
        void main() {
            vUv = uv;
            vec4 pos = modelViewMatrix * vec4(position, 1.0);
            float d = length(vec2(dFdx(pos.x), dFdy(pos.y)));
            gl_Position = projectionMatrix * pos;
            gl_Position.xy += normal.xy * c * d * sin(p * gl_Position.y);
        }
    `,
        fragmentShader: `
        varying vec2 vUv;
        
        void main() {
            float d = length(vUv - vec2(0.5));
            float alpha = smoothstep(0.45, 0.55, d);
            gl_FragColor = vec4(0.0, 0.0, 0.0, alpha);
        }
    `,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true
    });

    // Create the outline mesh
    const outlineMesh = new THREE.Mesh(textGeometry, outlineMaterial);
    scene.add(outlineMesh);

    // Position the camera
    camera.position.z = 5;

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        textMesh.rotation.x += 0.01;
        textMesh.rotation.y += 0.01;
        outlineMesh.rotation.x += 0.01;
        outlineMesh.rotation.y += 0.01;
        renderer.render(scene, camera);
    }

    animate();
})
</script>
