<template>
  <div>
       <van-nav-bar
      title="game"
      left-arrow
      @click-left="onClickLeft"
    />
    <div id="container"></div>

  </div>
</template>

<script>
  import * as Three from 'three'
import { OBJLoader, MTLLoader } from 'three-obj-mtl-loader'
  export default {
    name: 'ThreeTest',
    data () {
      return {
        camera: null,
        scene: null,
        renderer: null,
        mesh: null
      }
    },
    methods: {
        onClickLeft() {
         this.$router.go(-1);
    },
      init: function () {
        
        let container = document.getElementById('container')
        this.camera = new Three.PerspectiveCamera(70, container.clientWidth / container.clientHeight, 0.01, 100)
        this.camera.position.z = 10
        this.scene = new Three.Scene()
        var spotLight = new  Three.SpotLight(0x00FFFF);
        spotLight.position.set(-40,60,-10);
        this.scene.add(spotLight) ;
       // let geometry = new Three.BoxGeometry(0.2, 0.2, 0.2)
       // let material = new Three.MeshNormalMaterial()
       // this.mesh = new Three.Mesh(geometry, material)
       // this.scene.add(this.mesh)
        let _this = this;
   let mtlLoader = new MTLLoader();
   mtlLoader.load(`dorand.mtl`, function(materials) {
      materials.preload();
      let objLoader = new OBJLoader();
      objLoader.load(`dorand.obj`, function(obj) {
        _this.mesh = obj;
          obj.scale.x = obj.scale.y = obj.scale.z = 1;
         obj.rotation.y =150 ;
         // obj.rotation.x=;
          let mesh = obj;
          mesh.position.y = 0;
          //let this.mesh = mesh 
          _this.scene.add(mesh);
       })
    })

        this.renderer = new Three.WebGLRenderer({antialias: true})
        this.renderer.setSize(container.clientWidth, container.clientHeight)
        container.appendChild(this.renderer.domElement)
      },
      animate: function () {
       requestAnimationFrame(this.animate)
        this.mesh.rotation.y += 0.001
        this.mesh.position.z-=0.01
        this.mesh.position.y-=0.01
        //this.mesh.rotation.y -= 0.02
        this.renderer.render(this.scene, this.camera)
      }
    },
    mounted () {
      this.init()
      this.animate()
    }
  }
</script>
<style scoped>
  #container {
    height: 900px;
  }
</style>