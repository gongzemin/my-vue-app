<template>
  <div class="container">
    <div
      class="column"
      v-for="(image, index) in images"
      :key="index"
      :class="`column${index}`"
    >
      <img :src="image" :alt="'Image ' + (index + 1)" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ThreeColumnLayout',
  data() {
    return {
      images: [
        '/1.jpg', // Replace with actual image URL or local path
        '/2.jpg', // Replace with actual image URL or local path
        '/3.jpg', // Replace with actual image URL or local path
      ],
    }
  },
}
</script>

<style scoped>
body,
html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
}
.container {
  display: flex;
  width: 1920px;
  height: 1080px;
}
.column {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.column0 {
  border: 2px solid pink;
}
.column img {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
}
</style>
