var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
window.addEventListener('resize', onWindowResize, false);
document.body.appendChild(renderer.domElement);

var light = new THREE.PointLight();
light.intensity = 1.4;

var synth = new Tone.Synth().toMaster()


var whiteKeys = [];
var blackKeys = [];

initWhiteKeys();
initBlackKeys();

keyListeners();
var notesBindings = {
    "KeyA": "C4",
    "KeyW": "Db4",
    "KeyS": "D4",
    "KeyE": "Eb4",
    "KeyD": "E4",
    "KeyF": "F4",
    "KeyT": "Gb4",
    "KeyG": "G4",
    "KeyY": "Ab4",
    "KeyH": "A4",
    "KeyU": "Bb4",
    "KeyJ": "B4",
		"KeyK": "C5+"
};
var whiteKeysBindings = {
    "KeyA": 1,
    "KeyS": 2,
    "KeyD": 3,
    "KeyF": 4,
    "KeyG": 5,
    "KeyH": 6,
    "KeyJ": 7,
		"KeyK": 8
};
var blackKeysBindings = {
    "KeyW": 1,
    "KeyE": 2,
    "KeyT": 4,
    "KeyY": 5,
    "KeyU": 6
};


light.position.set(3, 6, -3);
camera.position.set(3, 6, -3);
camera.lookAt(blackKeys[3].position);

scene.add(light);

var animate = function () {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
};

function initWhiteKeys() {
    var whiteKeyGeometry = new THREE.BoxGeometry(3, 1, 1);

    for (var i = 1; i <= 8; i++) {
        var whiteKeyMaterial = new THREE.MeshLambertMaterial({
            color: 0xffffff
        });
        whiteKeys[i] = new THREE.Mesh(whiteKeyGeometry, whiteKeyMaterial);
        scene.add(whiteKeys[i])
        whiteKeys[i].position.z = -i * 1.2;
    }
}

function initBlackKeys() {
    var blackKeyGeometry = new THREE.BoxGeometry(2, 0.6, 0.6);

    for (var i = 1; i <= 6; i++) {
        var blackKeyMaterial = new THREE.MeshLambertMaterial({
            color: 0x000000
        });
        blackKeys[i] = new THREE.Mesh(blackKeyGeometry, blackKeyMaterial);
        if (i != 3) {
            scene.add(blackKeys[i])
        }

        blackKeys[i].position.z = -0.5 - i * 1.2;
        blackKeys[i].position.y = 0.4;
        blackKeys[i].position.x = -0.5;
    }
}

function keyListeners() {
    document.addEventListener('keydown', function (event) {

        if (whiteKeysBindings[event.code] && whiteKeys[whiteKeysBindings[event.code]].pressed != true) {

            TweenMax.to(whiteKeys[whiteKeysBindings[event.code]].position, 0.05, {
                y: -0.2
            });
            whiteKeys[whiteKeysBindings[event.code]].pressed = true;
            whiteKeys[whiteKeysBindings[event.code]].material.color.setHex(0xff8787);
            synth.triggerAttackRelease(notesBindings[event.code], '8n');
        }

        if (blackKeysBindings[event.code] && blackKeys[blackKeysBindings[event.code]].pressed != true) {
            TweenMax.to(blackKeys[blackKeysBindings[event.code]].position, 0.05, {
                y: 0.3
            });
            blackKeys[blackKeysBindings[event.code]].position.y -= 0.1;
            blackKeys[blackKeysBindings[event.code]].pressed = true;
            blackKeys[blackKeysBindings[event.code]].material.color.setHex(0x8a0000);
            synth.triggerAttackRelease(notesBindings[event.code], '8n');
        }


    });

    document.addEventListener('keyup', function (event) {
        if (whiteKeysBindings[event.code]) {
            TweenMax.to(whiteKeys[whiteKeysBindings[event.code]].position, 0.05, {
                y: 0
            });
            whiteKeys[whiteKeysBindings[event.code]].pressed = false;
            whiteKeys[whiteKeysBindings[event.code]].material.color.setHex(0xffffff);
        }
        if (blackKeysBindings[event.code]) {
            TweenMax.to(blackKeys[blackKeysBindings[event.code]].position, 0.05, {
                y: 0.4
            });
            blackKeys[blackKeysBindings[event.code]].pressed = false;
            blackKeys[blackKeysBindings[event.code]].material.color.setHex(0x000000);
        }
    });
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}


animate();