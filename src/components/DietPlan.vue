<template>
  <div class="card section">
    <div class="card-title">🍽️ 每日饮食计划 ({{ calculator.dailyCalories.value }}kcal)</div>

    <div class="meal-grid">
      <div v-for="(meal, key) in calculator.dailyMeals.value" :key="key" class="meal-card">
        <div class="meal-header">
          <span class="meal-name">{{ mealLabels[key] }}</span>
          <span class="meal-cal">{{ meal.cal }}kcal</span>
        </div>
        <ul class="meal-items">
          <li v-for="item in meal.items" :key="item">{{ item }}</li>
        </ul>
        <div class="meal-macros">
          <span>蛋白质 {{ meal.protein }}g</span>
          <span>碳水 {{ meal.carbs }}g</span>
          <span>脂肪 {{ meal.fat }}g</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ calculator: { type: Object, required: true } })

const mealLabels = {
  breakfast: '早餐',
  lunch: '午餐',
  dinner: '晚餐',
  snack: '加餐'
}
</script>
