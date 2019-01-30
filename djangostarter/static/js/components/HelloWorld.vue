<template>
  <div class="flex items-center justify-center h-screen">
    <h1 class="text-blue text-5xl">{{ msg }}</h1>
  </div>
</template>`

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
