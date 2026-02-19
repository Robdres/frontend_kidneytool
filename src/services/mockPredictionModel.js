/**
 * Mock Prediction Model for CKD (Chronic Kidney Disease)
 * This is a temporary model used until the backend model is ready
 * 
 * The model calculates probability based on the presence of risk factors:
 * - Each risk factor contributes to the overall probability
 * - Higher-weight factors have more impact on the result
 */

export const mockPredict = (formData) => {
  let probabilityScore = 0.08; // Start with baseline 8%
  let riskFactors = [];

  // ========== AGE CONTRIBUTION (Weight: 4-7%) ==========
  // Age is always a factor - contributes weight regardless
  const age = parseInt(formData.age_years) || 30
  if (age >= 65) {
    probabilityScore += 0.07;
    riskFactors.push('Edad muy avanzada (≥65 años)');
  } else if (age >= 60) {
    probabilityScore += 0.06;
    riskFactors.push('Edad avanzada (≥60 años)');
  } else if (age >= 50) {
    probabilityScore += 0.05;
    riskFactors.push('Edad moderada (≥50 años)');
  } else if (age >= 40) {
    probabilityScore += 0.03;
    riskFactors.push('Edad media (≥40 años)');
  } else {
    probabilityScore += 0.01;
    riskFactors.push('Edad más joven (<40 años)');
  }

  // ========== HIGH IMPACT FACTORS (Weight: 15% each) ==========
  
  // Personal history of chronic kidney disease (highest priority)
  if (formData.personal_history_chronic_kidney_disease === 'yes') {
    probabilityScore += 0.15;
    riskFactors.push('Antecedente personal de enfermedad renal crónica');
  }

  // Hypertension (very strong risk factor for CKD)
  if (formData.personal_history_hypertension === 'yes') {
    probabilityScore += 0.15;
    riskFactors.push('Antecedente personal de hipertensión');
  }

  // Microalbuminuria (direct kidney indicator) - VERY IMPORTANT
  if (formData.microalbuminuria_category !== 'no') {
    probabilityScore += 0.25; // Significantly increased weight
    riskFactors.push('Microalbuminuria detectada - Indicador crítico de daño renal');
  }

  // ========== MEDIUM-HIGH IMPACT FACTORS (Weight: 10% each) ==========
  
  // Diabetes-related factors
  if (formData.prediabetes_diagnosis === 'yes') {
    probabilityScore += 0.10;
    riskFactors.push('Diagnóstico de prediabetes');
  }

  if (formData.hba1c_elevated === 'yes') {
    probabilityScore += 0.10;
    riskFactors.push('HbA1c elevado');
  }

  if (formData.diabetes_risk_10_years_findrisk > 4) {
    probabilityScore += 0.08;
    riskFactors.push('Riesgo significativo de diabetes en 10 años');
  }

  // Metabolic syndrome
  if (formData.metabolic_syndrome === 'yes') {
    probabilityScore += 0.10;
    riskFactors.push('Síndrome metabólico');
  }

  // ========== MEDIUM IMPACT FACTORS (Weight: 8% each) ==========
  
  // Lipid abnormalities
  if (formData.ldl_cholesterol_pathological === 'yes') {
    probabilityScore += 0.08;
    riskFactors.push('LDL colesterol patológico');
  }

  if (formData.hdl_cholesterol_pathological === 'yes') {
    probabilityScore += 0.08;
    riskFactors.push('HDL colesterol patológico');
  }

  // Dyslipidemia
  if (formData.personal_history_dyslipidemia === 'yes') {
    probabilityScore += 0.08;
    riskFactors.push('Antecedente personal de dislipidemia');
  }

  // Cardiac/Cerebrovascular disease
  if (formData.personal_history_cardiac_cerebrovascular === 'yes') {
    probabilityScore += 0.08;
    riskFactors.push('Antecedente personal de enfermedad cardíaca/cerebrovascular');
  }

  // ========== MEDIUM-LOW IMPACT FACTORS (Weight: 6% each) ==========
  
  // Obesity/BMI
  if (formData.bmi_category === 'overweight') {
    probabilityScore += 0.04;
    riskFactors.push('Sobrepeso detectado');
  }
  
  if (formData.bmi_category === 'obese') {
    probabilityScore += 0.07;
    riskFactors.push('Obesidad detectada');
  }

  // Thyroid issues
  if (formData.personal_history_hypothyroidism === 'yes') {
    probabilityScore += 0.06;
    riskFactors.push('Antecedente personal de hipotiroidismo');
  }

  if (formData.hypothyroidism_diagnosis === 'yes') {
    probabilityScore += 0.06;
    riskFactors.push('Diagnóstico de hipotiroidismo');
  }

  // ========== LOW IMPACT FACTORS (Weight: 3-4% each) ==========
  
  // Alcohol consumption
  if (formData.alcohol_consumption === 'yes') {
    probabilityScore += 0.03;
    riskFactors.push('Consumo de alcohol reportado');
  }

  // Family history factors
  if (formData.family_history_diabetes === 'yes') {
    probabilityScore += 0.04;
    riskFactors.push('Antecedente familiar de diabetes');
  }

  if (formData.family_history_overweight_obesity === 'yes') {
    probabilityScore += 0.03;
    riskFactors.push('Antecedente familiar de sobrepeso/obesidad');
  }

  if (formData.family_history_thyroid === 'yes') {
    probabilityScore += 0.02;
    riskFactors.push('Antecedente familiar de problemas tiroideos');
  }

  // Fasting glucose (if elevated)
  const glucose = parseInt(formData.fasting_glucose) || 0
  if (glucose >= 126) {
    probabilityScore += 0.07;
    riskFactors.push('Glucosa en ayunas elevada (≥126 mg/dL)');
  } else if (glucose >= 100) {
    probabilityScore += 0.04;
    riskFactors.push('Glucosa en ayunas ligeramente elevada (≥100 mg/dL)');
  }

  // Abdominal perimeter (indicates central obesity)
  const abdominalPerimeter = parseInt(formData.abdominal_perimeter) || 0
  if (abdominalPerimeter > 102) { // Men
    probabilityScore += 0.05;
    riskFactors.push('Perímetro abdominal elevado');
  }

  // ========== CAP PROBABILITY ==========
  // Ensure probability doesn't exceed 95% or go below 5%
  probabilityScore = Math.min(0.95, Math.max(0.05, probabilityScore));

  // Calculate risk level
  let riskLevel;
  let riskDescription;
  
  if (probabilityScore < 0.15) {
    riskLevel = 'Bajo';
    riskDescription = 'Bajo riesgo de enfermedad renal crónica';
  } else if (probabilityScore < 0.35) {
    riskLevel = 'Leve';
    riskDescription = 'Riesgo leve de enfermedad renal crónica';
  } else if (probabilityScore < 0.55) {
    riskLevel = 'Moderado';
    riskDescription = 'Riesgo moderado de enfermedad renal crónica';
  } else if (probabilityScore < 0.75) {
    riskLevel = 'Elevado';
    riskDescription = 'Riesgo elevado de enfermedad renal crónica';
  } else {
    riskLevel = 'Muy Elevado';
    riskDescription = 'Riesgo muy elevado de enfermedad renal crónica';
  }

  return {
    probability: Math.round(probabilityScore * 100),
    probabilityDecimal: probabilityScore,
    riskLevel: riskLevel,
    riskDescription: riskDescription,
    riskFactors: riskFactors,
    isModel: 'mock'
  };
};
