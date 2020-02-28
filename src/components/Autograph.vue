<template>
  <div class="container-autograph">
    <canvas id="canvas" ref="canvas" :height="canvasHeight" :width="canvasWidth"></canvas>
    <div class="button-list">
      <van-button type="warning" @click="clear">清除</van-button>
      <van-button type="primary" @click="save">保存</van-button>
    </div>
  </div>
</template>

<script>
import SignaturePad from "signature_pad";
export default {
  data() {
    return {
      signaturePad: undefined,
      canvasHeight:0,
      canvasWidth:0
    };
  },
  created() {
    this.resizeCanvas()
    window.addEventListener('resize',this.resizeCanvas,false);
  },
  mounted() {
    var canvas = document.querySelector("canvas");
    this.signaturePad = new SignaturePad(this.$refs.canvas,{
        backgroundColor:"rgb(255,255,255)"
    });
  },
  methods: {
    save() {
      // 使用isEmpty方法判断签名是否为空
      if (this.signaturePad.isEmpty()) {
        this.$toast.fail("请签名并保存");
        return;
      }else{
          this.$toast.success("保存成功")
      }
      // 使用canvas的toDataURL方法返回一个包含图片展示的 data URI
      const data = this.signaturePad.toDataURL();
      // dataURLToBlob方法将数据转化为Blob类型
      const myBlob = this.dataURLToBlob(data);
      const formData = new FormData();
      // 在fromData中添加Blob类型的内容
      formData.append("uploadFile", myBlob, "sig.png");
      // 然后就可以拿formData去上传啦
      this.$store.commit('changeThumbnail',data)
      let file = formData.get('uploadFile')
      this.$store.commit('changeAutographPhoto',file)
      this.$store.commit('changeIsShowText',false)
      this.$router.back(-1)
    },
    dataURLToBlob(dataURL) {
      // Code taken from https://github.com/ebidel/filer.js
      var parts = dataURL.split(";base64,");
      var contentType = parts[0].split(":")[1];
      var raw = window.atob(parts[1]);
      var rawLength = raw.length;
      var uInt8Array = new Uint8Array(rawLength);
      for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }
      return new Blob([uInt8Array], { type: contentType });
    },
    clear() {
      // Clears the canvas
      this.signaturePad.clear();
    },
    resizeCanvas(){
      this.canvasHeight = window.innerHeight -120;
      this.canvasWidth = window.innerWidth - 20;
    }
  }
};
</script>

<style lang="less" scoped>
.container-autograph {
  height: 100%;
  padding-top: 50px;
  box-sizing: border-box;
  #canvas {
    display: block;
    // padding: 10px;
    // padding-bottom: 0;
    padding: 0;
    margin: auto;
    border: 1Px dashed #000;
  }
  .button-list {
    margin-top: 50px;
    display: flex;
    justify-content: space-around;
  }
}
</style>