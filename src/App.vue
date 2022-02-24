<template>
  <div id="app">
    <main class="main__layout">
      <div class="main__layout_content">
        <Header />
        <Catalog />
      </div>
    </main>
  </div>
</template>

<script>

import Header from './components/Header';
import Catalog from './components/Catalog';

export default {
  name: 'App',
  components: {
    Catalog,
    Header,
  },
};
</script>

<style lang="scss">
#app {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background: $background-01;
}

.main__layout {
  padding: 30px;
  width: 100%;
  border-radius: 10px;
  background: $background-02;

}
.main__layout_content{
  background: $background-03;
  border-radius: 10px;
}
@media (min-width: 768px){
  #app{
    padding: 30px;
  }
}
@media (min-width: 1328px){
  #app{
    padding: 80px;
  }
}
</style>
