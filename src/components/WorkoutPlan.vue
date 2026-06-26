<template>
  <div class="card section">
    <div class="card-title">
      🏋️ 每周运动方案
      <span :class="'level-badge level-' + calculator.weeklyWorkout.value.level">
        {{ levelLabels[calculator.weeklyWorkout.value.level] }}
      </span>
    </div>

    <table class="workout-table">
      <thead>
        <tr>
          <th>日期</th>
          <th>类型</th>
          <th>计划</th>
          <th>消耗</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="w in calculator.weeklyWorkout.value.workouts" :key="w.day">
          <td><span class="workout-icon">{{ w.icon }}</span> {{ w.day }}</td>
          <td><span :class="'badge badge-' + typeClass(w.type)">{{ w.type }}</span></td>
          <td style="white-space:pre-line">{{ w.name }}</td>
          <td>{{ w.cal > 0 ? w.cal + ' kcal' : '-' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const props = defineProps({ calculator: { type: Object, required: true } })

const levelLabels = { beginner: '初学者', intermediate: '进阶级', advanced: '高级' }

function typeClass(type) {
  const m = { '有氧': 'cardio', '力量': 'strength', '休息': 'rest', '综合': 'mixed' }
  return m[type] || 'rest'
}
</script>
