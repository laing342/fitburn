<template>
  <div class="card section">
    <div class="card-title">💡 健康建议</div>

    <div class="tip-grid">
      <div class="tip-card">
        <div class="tip-icon">💧</div>
        <div class="tip-value">{{ calculator.tips.value.water }}ml</div>
        <div class="tip-label">每日饮水目标</div>
      </div>
      <div class="tip-card">
        <div class="tip-icon">😴</div>
        <div class="tip-value">{{ calculator.tips.value.sleep }}</div>
        <div class="tip-label">推荐睡眠</div>
      </div>
      <div class="tip-card">
        <div class="tip-icon">🥩</div>
        <div class="tip-value">{{ calculator.tips.value.proteinPerKg }}g/kg</div>
        <div class="tip-label">蛋白质摄入/体重</div>
      </div>
      <div class="tip-card">
        <div class="tip-icon">📅</div>
        <div class="tip-value">{{ calculator.totalWeeks.value }}周</div>
        <div class="tip-label">预计达成目标</div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ calculator: { type: Object, required: true } })
</script>
