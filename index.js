const scene = new THREE.Scene()
let renderer, camera, heart

const ww = 200
const wh = 200

renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('scene')
})
renderer.setSize(ww, wh)
renderer.setClearColor(0xffffff)

camera = new THREE.PerspectiveCamera(12, ww / wh, 0.1, 10000)
camera.position.set(0, 0, 500)
scene.add(camera)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
directionalLight.position.set(0, 0, 350)
directionalLight.lookAt(new THREE.Vector3(0, 0, 0))
scene.add(directionalLight)

const render = function () {
    requestAnimationFrame(render)

    heart.rotation.y += .01

    renderer.render(scene, camera)
}

const loadOBJ = function () {
    const manager = new THREE.LoadingManager()
    const loader = new THREE.OBJLoader(manager)

    loader.load('models/heart.obj', function (object) {
        heart = object
        object.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.material.color = new THREE.Color(0xff69b4)
                child.geometry.computeVertexNormals()
            }
        })

        scene.add(heart)
        render()
    })
}

loadOBJ()
