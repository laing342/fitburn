<template>
  <div class="app">
    <header class="app-header">
      <h1>🔥 FitBurn</h1>
      <p>智能减脂计划 · 科学饮食 · 高效运动</p>
    </header>

    <div class="grid-2">
      <div class="left-col">
        <UserProfile :calculator="calc" />
      </div>
      <div class="right-col">
        <CalorieDashboard :calculator="calc" />
        <DietPlan :calculator="calc" />
        <WorkoutPlan :calculator="calc" />
        <HealthTips :calculator="calc" />
        <WeightChart :calculator="calc" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useFitnessCalculator } from './composables/useFitnessCalculator.js'
import UserProfile from './components/UserProfile.vue'
import CalorieDashboard from './components/CalorieDashboard.vue'
import DietPlan from './components/DietPlan.vue'
import WorkoutPlan from './components/WorkoutPlan.vue'
import WeightChart from './components/WeightChart.vue'
import HealthTips from './components/HealthTips.vue'

const calc = useFitnessCalculator()
</script>
