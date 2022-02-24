<template>
  <div
    class="catalog-item"
    @mouseover="buttonIsVisible = true"
    @mouseleave="buttonIsVisible = false"
  >
    <div class="catalog-item__head">
      <div class="catalog-item__head_stair">
        {{ item.floor }} этаж
      </div>
      <div class="catalog-item__head_room-meter">
        {{ item.rooms }} комната <span>-</span> {{ item.square }}м<sup>2</sup>
      </div>
    </div>
    <div class="catalog-item__image">
      <div class="catalog-item__image-number">
        №{{ item.building_id }}
      </div>
      <img
        :src="item.plan"
        alt="image"
      />
    </div>
    <div class="catalog-item__footer">
      <div class="catalog-item__footer_cost">
        {{ costToString }}р.
      </div>
      <div class="catalog-item__footer_cost-per-meter">
        {{ costPerMeter }} р. за м<sup>2</sup>
      </div>
    </div>
    <transition name="fade">
      <div
        v-if="buttonIsVisible"
        class="catalog-item__button-more"
      >
        Подробнее
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'CatalogItem',

  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },

  data: () => ({
    buttonIsVisible: false,
  }),

  computed: {
    costToString() {
      const price = this.item.price;
      return price.toLocaleString();
    },
    costPerMeter() {
      const price = this.item.price;
      const square = this.item.square;
      return Math.round(price / square)
        .toLocaleString();
    },
  },
};
</script>

<style scoped>
.catalog-item {
  display: flex;
  flex-direction: column;
  width: 270px;
  min-width: 270px;
  height: 365px;
  padding: 10px;
  background: #FFFFFF;
  box-shadow: 0 5px 20px rgba(86, 86, 86, 0.05);
  border-radius: 10px;
}

.catalog-item__head {
  height: 30px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  transition: all 0.2s;
}

.catalog-item__head_stair, span {
  font-weight: bold;
  font-size: 12px;
  line-height: 28px;
  color: #2C323A;
  opacity: 0.5;
}

.catalog-item__head_room-meter {
  font-weight: bold;
  font-size: 12px;
  color: #2C323A;
}

.catalog-item__image {
  border: 1px solid #EBEBEB;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 250px;
}

.catalog-item__image img {
  transition: all 0.5s;
  width: 230px;
}

.catalog-item:hover .catalog-item__image {
  transition: all 0.5s;
  height: 200px;
}

.catalog-item:hover .catalog-item__image img {
  transition: all 0.5s;
  width: 186px;
}

.catalog-item__image-number {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  width: 62px;
  height: 30px;
  font-weight: bold;
  font-size: 14px;
  text-transform: uppercase;
  color: #2C323A;
  padding: 2px 10px;
  border-bottom: 1px solid #EBEBEB;
  border-left: 1px solid #EBEBEB;
  border-radius: 0 5px;
}

.catalog-item__footer {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  margin-top: auto;
  transition: all 0.5s;
}

.catalog-item__footer_cost {
  font-weight: bold;
  font-size: 20px;
  color: #2C323A;
}

.catalog-item__footer_cost-per-meter {
  font-weight: bold;
  font-size: 12px;
  color: #2C323A;
  opacity: 0.5;
}

.catalog-item__button-more {
  width: 100%;
  height: 40px;
  background: #70D24E;
  border-radius: 2px 2px 5px 5px;
  margin-top: auto;
  font-weight: bold;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  color: #FFFFFF;
}
.fade-enter-active, .fade-leave-active {
  transition: all 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
