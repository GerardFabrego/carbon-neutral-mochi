import { useEffect } from 'react';

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import SceneInit from './lib/SceneInit';

function App() {
  useEffect(() => {
    const test = new SceneInit('myThreeJsCanvas');
    test.initialize();
    test.animate();

    // add shiba model
    const glftLoader = new GLTFLoader();
    glftLoader.load('./shiba/scene.gltf', (gltfScene) => {
      // gltfScene.scene.position.y = 0.5;
      // gltfScene.scene.position.z = 4;
      gltfScene.scene.scale.set(10, 10, 10);
      test.scene.add(gltfScene.scene);
    });

    const origin = new THREE.Vector3();
    origin.y = 15;
    const direction = new THREE.Vector3();
    direction.y = -1;
    const raycaster = new THREE.Raycaster();

    raycaster.set(origin, direction);
    raycaster.intersectObjects(test.scene.children)

    const onClick = () => {

      raycaster.set(origin, direction);
      const intersects = raycaster.intersectObjects(test.scene.children)

      console.log(intersects);

      // change color of the closest object intersecting the raycaster
      if (intersects.length > 0) {
        intersects[0].object.material.color.set(0xff0000);
      }
    };

    window.addEventListener('click', onClick);
  }, []);

  return (
      <div>
        <canvas id="myThreeJsCanvas" />
      </div>
  );
}

export default App;
