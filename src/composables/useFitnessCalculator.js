import { ref, computed } from 'vue'

export function useFitnessCalculator() {
  const profile = ref({
    gender: 'male',
    age: 25,
    height: 170,
    weight: 70,
    targetWeight: 65,
    activityLevel: 'moderate',
    weightLossRate: 'moderate'
  })

  const activityFactors = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    extra: 1.9
  }

  const activityLabels = {
    sedentary: '久坐（几乎不运动）',
    light: '轻度（每周1-3天）',
    moderate: '中度（每周3-5天）',
    active: '活跃（每周6-7天）',
    extra: '高强度（每天/体力劳动）'
  }

  const weightLossRates = {
    mild: { label: '温和 (0.25kg/周)', deficit: 250 },
    moderate: { label: '标准 (0.5kg/周)', deficit: 500 },
    aggressive: { label: '快速 (0.75kg/周)', deficit: 750 }
  }

  const bmr = computed(() => {
    const { gender, age, height, weight } = profile.value
    if (gender === 'male') {
      return 10 * weight + 6.25 * height - 5 * age + 5
    } else {
      return 10 * weight + 6.25 * height - 5 * age - 161
    }
  })

  const tdee = computed(() => {
    return Math.round(bmr.value * activityFactors[profile.value.activityLevel])
  })

  const dailyCalories = computed(() => {
    const deficit = weightLossRates[profile.value.weightLossRate].deficit
    return Math.max(1200, tdee.value - deficit)
  })

  const bmi = computed(() => {
    const h = profile.value.height / 100
    return Math.round((profile.value.weight / (h * h)) * 10) / 10
  })

  const targetBmi = computed(() => {
    const h = profile.value.height / 100
    return Math.round((profile.value.targetWeight / (h * h)) * 10) / 10
  })

  const macros = computed(() => {
    const cal = dailyCalories.value
    return {
      protein: Math.round((cal * 0.30) / 4),
      carbs: Math.round((cal * 0.40) / 4),
      fat: Math.round((cal * 0.30) / 9),
      proteinCal: Math.round(cal * 0.30),
      carbsCal: Math.round(cal * 0.40),
      fatCal: Math.round(cal * 0.30)
    }
  })

  const weekPrediction = computed(() => {
    const deficit = weightLossRates[profile.value.weightLossRate].deficit
    const weeks = []
    let w = profile.value.weight
    for (let i = 0; i <= 12; i++) {
      weeks.push({ week: i, weight: Math.round(w * 10) / 10 })
      w -= (deficit * 7) / 7700
      if (w < profile.value.targetWeight) break
    }
    return weeks
  })

  const totalWeeks = computed(() => {
    return weekPrediction.value.length - 1
  })

  const dailyMeals = computed(() => {
    const cal = dailyCalories.value
    const p = macros.value.protein
    const c = macros.value.carbs
    const f = macros.value.fat

    return {
      breakfast: {
        cal: Math.round(cal * 0.30),
        protein: Math.round(p * 0.25),
        carbs: Math.round(c * 0.30),
        fat: Math.round(f * 0.25),
        items: ['全麦面包 2片 (150kcal)', '鸡蛋 2个 (140kcal)', '牛奶 200ml (100kcal)', '水果 1份 (80kcal)']
      },
      lunch: {
        cal: Math.round(cal * 0.35),
        protein: Math.round(p * 0.35),
        carbs: Math.round(c * 0.35),
        fat: Math.round(f * 0.35),
        items: ['鸡胸肉/瘦牛肉 150g (200kcal)', '糙米/杂粮饭 150g (180kcal)', '蔬菜沙拉 200g (60kcal)', '橄榄油 10ml (80kcal)']
      },
      dinner: {
        cal: Math.round(cal * 0.25),
        protein: Math.round(p * 0.30),
        carbs: Math.round(c * 0.25),
        fat: Math.round(f * 0.25),
        items: ['鱼肉/虾仁 150g (160kcal)', '红薯/南瓜 150g (130kcal)', '清炒蔬菜 200g (70kcal)']
      },
      snack: {
        cal: Math.round(cal * 0.10),
        protein: Math.round(p * 0.10),
        carbs: Math.round(c * 0.10),
        fat: Math.round(f * 0.15),
        items: ['坚果 20g (120kcal)', '希腊酸奶 100g (60kcal)']
      }
    }
  })

  const weeklyWorkout = computed(() => {
    const { activityLevel, weight } = profile.value
    const isBeginner = activityLevel === 'sedentary' || activityLevel === 'light'
    const level = isBeginner ? 'beginner' : (activityLevel === 'moderate' ? 'intermediate' : 'advanced')

    const plans = {
      beginner: [
        { day: '周一', type: '有氧', name: '快走 / 慢跑 30min', cal: Math.round(4 * weight * 0.5), icon: '🏃' },
        { day: '周二', type: '休息', name: '拉伸放松 15min', cal: 0, icon: '🧘' },
        { day: '周三', type: '力量', name: '自重训练 25min\n(深蹲/俯卧撑/平板支撑)', cal: Math.round(5 * weight * 0.4), icon: '💪' },
        { day: '周四', type: '有氧', name: '快走 / 慢跑 30min', cal: Math.round(4 * weight * 0.5), icon: '🏃' },
        { day: '周五', type: '休息', name: '拉伸放松 15min', cal: 0, icon: '🧘' },
        { day: '周六', type: '综合', name: '有氧30min + 力量20min', cal: Math.round(6 * weight * 0.5), icon: '🏋️' },
        { day: '周日', type: '休息', name: '完全休息', cal: 0, icon: '😊' }
      ],
      intermediate: [
        { day: '周一', type: '力量', name: '上肢训练 40min\n(哑铃推举/划船/弯举)', cal: Math.round(6 * weight * 0.6), icon: '💪' },
        { day: '周二', type: '有氧', name: '间歇跑 30min\n(1min快+2min慢交替)', cal: Math.round(8 * weight * 0.5), icon: '🏃' },
        { day: '周三', type: '力量', name: '下肢训练 40min\n(深蹲/弓步/硬拉)', cal: Math.round(6 * weight * 0.6), icon: '🦵' },
        { day: '周四', type: '有氧', name: '游泳 / 椭圆机 35min', cal: Math.round(7 * weight * 0.5), icon: '🏊' },
        { day: '周五', type: '力量', name: '全身综合 40min', cal: Math.round(6 * weight * 0.6), icon: '🏋️' },
        { day: '周六', type: '综合', name: 'HIIT 20min + 核心15min', cal: Math.round(10 * weight * 0.5), icon: '🔥' },
        { day: '周日', type: '休息', name: '瑜伽 / 拉伸 30min', cal: Math.round(2 * weight * 0.5), icon: '🧘' }
      ],
      advanced: [
        { day: '周一', type: '力量', name: '推类训练 45min\n(卧推/过头推举/三头)', cal: Math.round(7 * weight * 0.6), icon: '💪' },
        { day: '周二', type: '有氧', name: 'HIIT跑步 30min', cal: Math.round(10 * weight * 0.5), icon: '🔥' },
        { day: '周三', type: '力量', name: '拉类训练 45min\n(引体/划船/二头)', cal: Math.round(7 * weight * 0.6), icon: '💪' },
        { day: '周四', type: '有氧', name: '游泳 / 划船机 40min', cal: Math.round(8 * weight * 0.5), icon: '🏊' },
        { day: '周五', type: '力量', name: '腿部训练 50min\n(深蹲/硬拉/弓步)', cal: Math.round(8 * weight * 0.6), icon: '🦵' },
        { day: '周六', type: '综合', name: 'HIIT 25min + 核心20min', cal: Math.round(11 * weight * 0.5), icon: '🔥' },
        { day: '周日', type: '休息', name: '瑜伽 / 泡沫轴放松 30min', cal: Math.round(2 * weight * 0.5), icon: '🧘' }
      ]
    }

    return { level, workouts: plans[level] }
  })

  const tips = computed(() => {
    const waterTarget = Math.round(profile.value.weight * 35)
    return {
      water: waterTarget,
      sleep: '7-9小时',
      proteinPerKg: Math.round((macros.value.protein / profile.value.weight) * 10) / 10,
      calorieDeficit: weightLossRates[profile.value.weightLossRate].deficit,
      dailyCalories: dailyCalories.value
    }
  })

  return {
    profile,
    bmr,
    tdee,
    bmi,
    targetBmi,
    dailyCalories,
    macros,
    dailyMeals,
    weeklyWorkout,
    weekPrediction,
    totalWeeks,
    tips,
    activityLabels,
    weightLossRates
  }
}
