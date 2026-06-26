<template>
  <div class="card section">
    <div class="card-title">📈 体重预测趋势</div>
    <div class="chart-container">
      <canvas ref="chartRef"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

const props = defineProps({ calculator: { type: Object, required: true } })
const chartRef = ref(null)
let chartInstance = null

const chartData = computed(() => props.calculator.weekPrediction.value)

function renderChart() {
  if (!chartRef.value) return
  if (chartInstance) { chartInstance.destroy(); chartInstance = null }

  const data = chartData.value
  const ctx = chartRef.value.getContext('2d')

  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.map(d => '第' + d.week + '周'),
      datasets: [{
        label: '体重 (kg)',
        data: data.map(d => d.weight),
        borderColor: '#FF6B35',
        backgroundColor: 'rgba(255,107,53,0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#FF6B35',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: {
          grid: { color: 'rgba(255,255,255,0.05)' },
          ticks: {
            color: '#9A9AB0',
            font: { size: 11 }
          }
        },
        x: {
          grid: { display: false },
          ticks: {
            color: '#9A9AB0',
            font: { size: 10 },
            maxRotation: 45
          }
        }
      }
    }
  })
}

watch(chartData, () => { nextTick(renderChart) }, { deep: true })

onMounted(() => {
  nextTick(renderChart)
})
</script>
