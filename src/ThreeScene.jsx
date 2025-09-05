import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

let sceneInstance = null; // prevent double-mount in React StrictMode

export default function ThreeScene() {
  const mountRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const modelRef = useRef(null);
  const selectedDotRef = useRef(null);
  const hotspotMeshesRef = useRef([]);

  const [popup, setPopup] = useState(null);

  useEffect(() => {
    if (!mountRef.current || sceneInstance) return;
    sceneInstance = true;

    const container = mountRef.current;

    // Scene — keep background transparent so section bg shows through
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0d0d0d); // deep black/gray

    // Renderer (alpha: true for transparency)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    rendererRef.current = renderer;
    renderer.setPixelRatio(window.devicePixelRatio || 1);
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    container.appendChild(renderer.domElement);

    // Camera
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    cameraRef.current = camera;
    camera.position.set(0, 1, 5);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 10, 7.5);
    scene.add(dirLight);

    // Resize: size renderer to the container
    const setSizeToContainer = () => {
      const width = Math.max(1, container.clientWidth);
      const height = Math.max(1, container.clientHeight);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    setSizeToContainer();
    const ro = new ResizeObserver(setSizeToContainer);
    ro.observe(container);

    // Load model
    const loader = new GLTFLoader();
    loader.load(
      "/3dmodel.glb",
      (gltf) => {
        const model = gltf.scene;
        modelRef.current = model;

        // Compute bounding box & center the model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);

        scene.add(model);

        // Frame the camera
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = (camera.fov * Math.PI) / 180;
        let cameraZ = Math.abs((maxDim / 2) / Math.tan(fov / 2));
        cameraZ *= 1.6;
        camera.position.set(0, size.y * 0.15, cameraZ);
        controls.target.set(0, size.y * 0.05, 0);
        controls.update();

        // Hotspots
        const dotGeometry = new THREE.SphereGeometry(Math.max(size.y * 0.02, 0.02), 16, 16);
        const dotMaterial = new THREE.MeshBasicMaterial({ color: 0xff4444 });

        const hotspots = [
          { pos: new THREE.Vector3(0, size.y * 0.4, 0), text: "Display / Screen" },
          { pos: new THREE.Vector3(size.x * 0.28, -size.y * 0.18, size.z * 0.45), text: "Card / Ticket Slot" },
          { pos: new THREE.Vector3(-size.x * 0.28, size.y * 0.18, size.z * 0.45), text: "Camera / Sensor" },
        ];

        const hotspotMeshes = [];
        hotspots.forEach(({ pos, text }) => {
          const dot = new THREE.Mesh(dotGeometry, dotMaterial);
          dot.position.copy(pos);
          dot.userData = { text };
          model.add(dot);
          hotspotMeshes.push(dot);
        });
        hotspotMeshesRef.current = hotspotMeshes;
      },
      undefined,
      (err) => {
        console.error("Failed to load /3dmodel.glb", err);
      }
    );

    // Raycasting
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const worldToScreen = (obj3D, camera, rect) => {
      const p = obj3D.getWorldPosition(new THREE.Vector3()).project(camera);
      return {
        x: (p.x * 0.5 + 0.5) * rect.width,
        y: (-p.y * 0.5 + 0.5) * rect.height,
      };
    };

    const onClick = (event) => {
      if (!rendererRef.current || !cameraRef.current) return;
      const rect = rendererRef.current.domElement.getBoundingClientRect();

      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      mouse.set(x, y);
      raycaster.setFromCamera(mouse, cameraRef.current);

      const hits = raycaster.intersectObjects(hotspotMeshesRef.current, true);
      if (hits.length) {
        const dot = hits[0].object;
        selectedDotRef.current = dot;

        const { x: px, y: py } = worldToScreen(dot, cameraRef.current, rect);
        setPopup({ x: px, y: py, text: dot.userData.text });
      } else {
        selectedDotRef.current = null;
        setPopup(null);
      }
    };

    renderer.domElement.style.cursor = "grab";
    renderer.domElement.addEventListener("click", onClick);

    // Animate loop with slow rotation
    let rafId;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      controls.update();

      // 🔹 Rotate model slowly around Y-axis
      if (modelRef.current) {
        modelRef.current.rotation.y += 0.002; // adjust for speed
      }

      if (selectedDotRef.current && rendererRef.current) {
        const rect = rendererRef.current.domElement.getBoundingClientRect();
        const { x, y } = worldToScreen(selectedDotRef.current, cameraRef.current, rect);
        setPopup((prev) => (prev ? { ...prev, x, y } : prev));
      }

      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      ro.disconnect();
      renderer.domElement.removeEventListener("click", onClick);
      cancelAnimationFrame(rafId);
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
          else obj.material.dispose();
        }
      });
      sceneInstance = null;
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100%",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {popup && (
        <div
          style={{
            position: "absolute",
            top: popup.y,
            left: popup.x,
            transform: "translate(-50%, -120%)",
            background: "white",
            color: "black",
            padding: "8px 12px",
            borderRadius: 8,
            boxShadow: "0 6px 24px rgba(0,0,0,0.25)",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            zIndex: 10,
          }}
        >
          {popup.text}
        </div>
      )}
    </div>
  );
}
