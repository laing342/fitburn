<template>
  <div class="card">
    <div class="card-title">📋 个人资料</div>
    <form @submit.prevent>
      <div class="form-row">
        <div class="form-group">
          <label>性别</label>
          <select v-model="calculator.profile.value.gender">
            <option value="male">男性</option>
            <option value="female">女性</option>
          </select>
        </div>
        <div class="form-group">
          <label>年龄</label>
          <input type="number" v-model.number="calculator.profile.value.age" min="10" max="100" />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>身高 (cm)</label>
          <input type="number" v-model.number="calculator.profile.value.height" min="100" max="250" step="0.1" />
        </div>
        <div class="form-group">
          <label>当前体重 (kg)</label>
          <input type="number" v-model.number="calculator.profile.value.weight" min="20" max="300" step="0.1" />
        </div>
      </div>
      <div class="form-group">
        <label>目标体重 (kg)</label>
        <input type="number" v-model.number="calculator.profile.value.targetWeight" min="20" max="300" step="0.1" />
      </div>
      <div class="form-group">
        <label>日常活动水平</label>
        <select v-model="calculator.profile.value.activityLevel">
          <option v-for="(label, key) in calculator.activityLabels.value" :key="key" :value="key">{{ label }}</option>
        </select>
      </div>
      <div class="form-group">
        <label>减脂速度</label>
        <select v-model="calculator.profile.value.weightLossRate">
          <option v-for="(rate, key) in calculator.weightLossRates.value" :key="key" :value="key">{{ rate.label }}</option>
        </select>
      </div>
    </form>
  </div>
</template>

<script setup>
const props = defineProps({ calculator: { type: Object, required: true } })
</script>
