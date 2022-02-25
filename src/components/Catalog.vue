<template>
  <div class="catalog container">
    <div class="catalog__filter row">
      <div class="catalog__filter_item catalog__filter_rooms">
        <h3>КОМНАТЫ</h3>
        <div class="catalog__filter_rooms-buttons">
          <input
            id="check1"
            v-model="selectRooms"
            :value="firstValue"
            type="checkbox"
            class="hidden"
            @input="sFilterHandler"
          />
          <label
            for="check1"
            class="catalog__filter_rooms-button"
            :class="sIsActive && 'active'"
          >
            S
          </label>
          <input
            id="check2"
            v-model="selectRooms"
            type="checkbox"
            class="hidden"
            :value="secondValue"
            @input="oneRoomFilterHandler"
          />
          <label
            for="check2"
            class="catalog__filter_rooms-button"
            :class="oneRoomFilterIsActive && 'active'"
          >
            1K
          </label>
          <input
            id="check3"
            v-model="selectRooms"
            type="checkbox"
            class="hidden"
            :value="thirdValue"
            @input="twoRoomFilterHandler"
          />
          <label
            for="check3"
            class="catalog__filter_rooms-button"
            :class="twoRoomFilterIsActive && 'active'"
          >
            2K
          </label>
          <input
            id="check4"
            v-model="selectRooms"
            type="checkbox"
            class="hidden"
            :value="forthValue"
            @input="threeRoomFilterHandler"
          />
          <label
            for="check4"
            class="catalog__filter_rooms-button"
            :class="threeRoomFilterIsActive && 'active'"
          >
            3K
          </label>
        </div>
      </div>
      <div class="catalog__filter_item">
        <div class="catalog__filter_stairs-slider">
          <h3>ЭТАЖ</h3>
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
      <div class="catalog__filter_item">
        <h3>ПЛОЩАДЬ, м<sup>2</sup> </h3>
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
      <div class="catalog__filter_item">
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
      <div class="catalog__filter_item catalog__filter_buttons">
        <div
          class="catalog__filter_buttons-apply"
          @click="applyFilters"
        >
          применить
        </div>
        <div
          class="catalog__filter_buttons-reset"
          @click="resetFilters"
        >
          сбросить фильтр
        </div>
      </div>
    </div>
    <div class="catalog__main row">
      <div
        v-for="(item, index) in currentArray"
        :key="index"
        class="catalog__card col-12 col-md-6 col-lg-4 col-xl-3 mb-md-4 d-flex"
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
    selectRooms: [],
    firstValue: '',
    secondValue: '',
    thirdValue: '',
    forthValue: '',
    valueStairs: [1, 25],
    valueMeters: [9, 999],
    valueCost: [99.9, 999.9],
    sIsActive: false,
    oneRoomFilterIsActive: false,
    twoRoomFilterIsActive: false,
    threeRoomFilterIsActive: false,
    sRoomFilterValue: '',
    oneRoomFilterValue: '',
    twoRoomFilterValue: '',
    threeRoomFilterValue: '',
    currentArray: [],
  }),
  computed: {
    ...mapGetters([
      'FLAT_CATALOG',
    ]),
    sortedParametersBySliders() {
      const {
        valueStairs,
        valueMeters,
        valueCost,
        FLAT_CATALOG,
      } = this;
      return FLAT_CATALOG.filter(({
        floor,
        square,
        price_mil,
      }) => (parseInt(floor) >= valueStairs[0] && parseInt(floor) <= valueStairs[1] && (parseInt(square) >= valueMeters[0] && parseInt(square) <= valueMeters[1]) && (parseInt(price_mil) >= valueCost[0] && parseInt(price_mil) <= valueCost[1])));
    },
    sortedParametersByButtons() {
      let data = [];
      if (this.selectRooms.length) {
        data = this.sortedParametersBySliders.filter((x) => this.selectRooms.indexOf(x.rooms.toString()) !== -1);
      }
 else {
        data = this.sortedParametersBySliders;
      }
      return data;
    },
  },
  mounted() {
    this.GET_FLATS_FROM_JSON()
      .then((response) => {
        if (response.data) {
          console.log('hola!');
          this.currentArray = this.FLAT_CATALOG;
        }
      });
  },
  methods: {
    ...mapActions([
      'GET_FLATS_FROM_JSON',
    ]),
    sFilterHandler() {
      this.sIsActive = !this.sIsActive;
      this.firstValue = 's';
    },
    oneRoomFilterHandler() {
      this.oneRoomFilterIsActive = !this.oneRoomFilterIsActive;
      this.secondValue = '1';
    },
    twoRoomFilterHandler() {
      this.twoRoomFilterIsActive = !this.twoRoomFilterIsActive;
      this.thirdValue = '2';
    },
    threeRoomFilterHandler() {
      this.threeRoomFilterIsActive = !this.threeRoomFilterIsActive;
      this.forthValue = '3';
    },
    applyFilters() {
      this.currentArray = this.sortedParametersByButtons;
    },
    resetFilters() {
      this.currentArray = this.FLAT_CATALOG;
    },
  },
};
</script>

<style scoped>

.catalog__filter {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  max-width: 1200px;
  margin: 0 auto;
}

.catalog__filter_item{
  margin-bottom: 20px;
}

.catalog__card{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

h3 {
  font-weight: bold;
  font-size: 12px;
  line-height: 28px;
  color: #2C323A;
}

.catalog__filter_rooms-button, label {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 47px;
  height: 40px;
  margin: 4px;
  border: 1px solid #D8D8D8;
  border-radius: 5px;
  background: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
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

.catalog__filter_buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.catalog__filter_buttons-apply {
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
  cursor: pointer;
  transition: 0.2s ease-in-out;
}
.catalog__filter_buttons-apply:hover{
  font-size: 15px;
  transition: 0.2s ease-in-out;
}

.catalog__filter_buttons-reset {
  margin-top: 10px;
  font-weight: bold;
  font-size: 10px;
  display: flex;
  align-items: center;
  text-transform: uppercase;
  color: #2C323A;
  border-bottom: 1px solid #70D24E;
  cursor: pointer;
}

.catalog__main {
  width: 100%;
  margin-top: 50px;
}

.active {
  background: #73ff4c;
  color: #FFFFFF;
}

.hidden {
  width: 0;
  height: 0;
}
@media (min-width: 1200px){
.catalog__filter_item{
  margin-bottom: 0;
}
  .catalog__card{
    align-items: unset;
    justify-content: unset;
    margin-bottom: 0;
  }
}
</style>
