<template>
  <div class="card section">
    <div class="card-title">📊 热量总览</div>

    <div class="stat-grid">
      <div class="stat-item">
        <div class="stat-value">{{ calculator.bmr.value }}</div>
        <div class="stat-label">基础代谢 BMR (kcal)</div>
      </div>
      <div class="stat-item">
        <div class="stat-value green">{{ calculator.tdee.value }}</div>
        <div class="stat-label">每日消耗 TDEE (kcal)</div>
      </div>
      <div class="stat-item">
        <div class="stat-value">{{ calculator.dailyCalories.value }}</div>
        <div class="stat-label">推荐摄入 (kcal)</div>
      </div>
      <div class="stat-item">
        <div class="stat-value green">{{ calculator.tips.value.calorieDeficit }}</div>
        <div class="stat-label">热量缺口 (kcal)</div>
      </div>
      <div class="stat-item">
        <div class="stat-value">{{ calculator.bmi.value }}</div>
        <div class="stat-label">当前 BMI</div>
      </div>
      <div class="stat-item">
        <div class="stat-value green">{{ calculator.targetBmi.value }}</div>
        <div class="stat-label">目标 BMI</div>
      </div>
    </div>

    <div style="margin-top:16px">
      <div style="display:flex;justify-content:space-between;font-size:0.85rem;color:var(--text-muted)">
        <span>蛋白质 {{ calculator.macros.value.protein }}g ({{ calculator.macros.value.proteinCal }}kcal)</span>
        <span>碳水 {{ calculator.macros.value.carbs }}g ({{ calculator.macros.value.carbsCal }}kcal)</span>
        <span>脂肪 {{ calculator.macros.value.fat }}g ({{ calculator.macros.value.fatCal }}kcal)</span>
      </div>
      <div class="macro-bar">
        <div class="macro-segment macro-protein" :style="{ width: '30%' }">30%</div>
        <div class="macro-segment macro-carbs" :style="{ width: '40%' }">40%</div>
        <div class="macro-segment macro-fat" :style="{ width: '30%' }">30%</div>
      </div>
      <div class="macro-legend">
        <span><span class="dot dot-protein"></span>蛋白质</span>
        <span><span class="dot dot-carbs"></span>碳水化合物</span>
        <span><span class="dot dot-fat"></span>脂肪</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ calculator: { type: Object, required: true } })
</script>
