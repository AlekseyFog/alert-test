<template>
  <div class="catalog container">
    <div class="catalog__filter row">
      <div class="catalog__filter_rooms">
        <h3>комнаты</h3>
        <div class="catalog__filter_rooms-buttons">
          <button class="catalog__filter_rooms-button">
            S
          </button>
          <button class="catalog__filter_rooms-button">
            1K
          </button>
          <button class="catalog__filter_rooms-button">
            2K
          </button>
          <button class="catalog__filter_rooms-button">
            3K
          </button>
        </div>
      </div>
      <div class="catalog__filter_stairs">
        <div class="catalog__filter_stairs-slider">
          <h3>этаж</h3>
          <input
            v-model="valueStairs[0]"
            class="slider-input"
          />
          <input
            v-model="valueStairs[1]"
            class="slider-input"
          />
          <vue-slider
            v-model="valueStairs"
            :enable-cross="false"
            :min="1"
            :max="25"
            :tooltip="'none'"
          />
        </div>
      </div>
      <div class="catalog__filter_meters">
        <h3>ПЛОЩАДЬ, м </h3>
        <div class="catalog__filter_meters-slider">
          <input
            v-model="valueMeters[0]"
            class="slider-input"
          />
          <input
            v-model="valueMeters[1]"
            class="slider-input"
          />
          <vue-slider
            v-model="valueMeters"
            :enable-cross="false"
            :min="9"
            :max="999"
            :tooltip="'none'"
          />
        </div>
      </div>
      <div class="catalog__filter_cost">
        <h3>СТОИМОСТЬ, млн.р. </h3>
        <div class="catalog__filter_cost-slider">
          <input
            v-model="valueCost[0]"
            class="slider-input"
          />
          <input
            v-model="valueCost[1]"
            class="slider-input"
          />
          <vue-slider
            v-model="valueCost"
            :enable-cross="false"
            :min="99.9"
            :max="999.9"
            :tooltip="'none'"
            :interval="0.1"
          />
        </div>
      </div>
      <div class="catalog__filter_buttons">
        <div class="catalog__filter_buttons-apply">
          применить
        </div>
        <div class="catalog__filter_buttons-reset">
          сбросить фильтр
        </div>
      </div>
    </div>
    <div class="catalog__main row">
      <div
        v-for="(item, index) in FLAT_CATALOG"
        :key="index"
        class="col-12 col-md-6 col-lg-4 col-xl-3 mb-md-4 d-flex"
      >
        <CatalogItem
          :item="item"
        />
      </div>
    </div>
  </div>
</template>

<script>
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css';
import { mapActions, mapGetters } from 'vuex';
import CatalogItem from './CatalogItem';

export default {
  name: 'Catalog',

  components: {
    CatalogItem,
    VueSlider,
  },
  data: () => ({
    valueStairs: [1, 25],
    valueMeters: [9, 999],
    valueCost: [99.9, 999.9],
  }),
  computed: {
    ...mapGetters([
      'FLAT_CATALOG',
    ]),
  },
  mounted() {
    this.GET_FLATS_FROM_JSON();
  },
  methods: {
    ...mapActions([
      'GET_FLATS_FROM_JSON',
    ]),
  },
};
</script>

<style scoped>

.catalog__filter {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
}
h3 {
  font-weight: bold;
  font-size: 12px;
  line-height: 28px;
  color: #2C323A;
}

.catalog__filter_rooms-button {
  width: 47px;
  height: 40px;
  margin: 4px;
  border: 1px solid #D8D8D8;
  border-radius: 5px;
  background: white;
  font-size: 16px;
  font-weight: bold;
}

.slider-input {
  width: 80px;
  height: 40px;
  background: #FFFFFF;
  border: 1px solid #D8D8D8;
  font-size: 16px;
  font-weight: 400;
  color: #2C323A;
  text-align: center;
  border-radius: 5px;
  margin-right: 15px;
}
.catalog__filter_buttons{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.catalog__filter_buttons-apply{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 201px;
  height: 40px;
  background: #70D24E;
  border-radius: 5px;
  font-weight: bold;
  font-size: 14px;
  text-transform: uppercase;
  color: #FFFFFF;
}
.catalog__filter_buttons-reset{
  margin-top: 10px;
  font-weight: bold;
  font-size: 10px;
  display: flex;
  align-items: center;
  text-transform: uppercase;
  color: #2C323A;
  border-bottom: 1px solid #70D24E;
}
.catalog__main {
  width: 100%;
  margin-top: 50px;
}
</style>
