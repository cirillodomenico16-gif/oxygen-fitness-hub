/**
 * PlanGenerator.ts
 * Service for generating personalized workout and nutrition plans
 * Uses prompt engineering with client-side LLM simulation or API integration
 */

import { WorkoutQuestionnaireData, NutritionQuestionnaireData } from './PlanStorage';

interface GeneratorConfig {
  apiKey?: string;
  useSimulation?: boolean; // Use deterministic simulation if no API available
}

class PlanGeneratorService {
  private config: GeneratorConfig;

  constructor(config: GeneratorConfig = { useSimulation: true }) {
    this.config = config;
  }

  /**
   * Generate a personalized workout plan (Scheda Settimanale)
   */
  async generateWorkoutPlan(
    userName: string,
    userWeight: number,
    userAge: number,
    questionnaire: WorkoutQuestionnaireData
  ): Promise<string> {
    if (!this.config.useSimulation && this.config.apiKey) {
      return this.generateWithAPI('workout', userName, userWeight, userAge, questionnaire);
    }

    return this.generateWithSimulation('workout', userName, userWeight, userAge, questionnaire);
  }

  /**
   * Generate a personalized nutrition plan (Dieta Settimanale)
   */
  async generateNutritionPlan(
    userName: string,
    userWeight: number,
    userAge: number,
    userGender: 'M' | 'F',
    activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'veryActive',
    questionnaire: NutritionQuestionnaireData
  ): Promise<string> {
    if (!this.config.useSimulation && this.config.apiKey) {
      return this.generateWithAPI('nutrition', userName, userWeight, userAge, { ...questionnaire, userGender, activityLevel });
    }

    return this.generateWithSimulation('nutrition', userName, userWeight, userAge, { ...questionnaire, userGender, activityLevel });
  }

  /**
   * Generate plan using API (placeholder for real API integration)
   */
  private async generateWithAPI(
    planType: 'workout' | 'nutrition',
    userName: string,
    userWeight: number,
    userAge: number,
    data: any
  ): Promise<string> {
    // TODO: Implement real API integration (Claude API, OpenAI, etc.)
    // This would make an actual API call with the questionnaire data
    console.log(`[API] Generating ${planType} plan for ${userName}`);

    // Placeholder: simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Fallback to simulation
    return this.generateWithSimulation(planType, userName, userWeight, userAge, data);
  }

  /**
   * Generate plan using deterministic simulation
   * This creates consistent, realistic plans based on input parameters
   */
  private async generateWithSimulation(
    planType: 'workout' | 'nutrition',
    userName: string,
    userWeight: number,
    userAge: number,
    data: any
  ): Promise<string> {
    // Simulate generation delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (planType === 'workout') {
      return this.generateWorkoutSimulation(userName, userWeight, userAge, data as WorkoutQuestionnaireData);
    } else {
      return this.generateNutritionSimulation(userName, userWeight, userAge, data);
    }
  }

  /**
   * Generate workout plan using simulation
   */
  private generateWorkoutSimulation(
    userName: string,
    userWeight: number,
    userAge: number,
    questionnaire: WorkoutQuestionnaireData
  ): string {
    const { fitnessLevel, trainingGoals, equipment, trainingFrequency, sessionDuration, focusAreas } = questionnaire;

    const goalText = trainingGoals.length > 0 ? trainingGoals[0] : 'Fitness Generale';
    const levelText = fitnessLevel === 'beginner' ? 'Principiante' : fitnessLevel === 'intermediate' ? 'Intermedio' : 'Avanzato';
    const durationText = sessionDuration === 30 ? '30 minuti' : sessionDuration === 45 ? '45 minuti' : sessionDuration === 60 ? '60 minuti' : '90 minuti';

    // Generate workout splits based on frequency
    let days = this.generateWorkoutDays(trainingFrequency, fitnessLevel, focusAreas, equipment);

    // Build the plan text
    let plan = `📋 SCHEDA ALLENAMENTO AI — ${userName}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 Obiettivo: ${goalText}
📊 Livello: ${levelText}
📅 Frequenza: ${trainingFrequency}x per settimana
⏱️ Durata sessione: ${durationText}
💪 Peso corporeo: ${userWeight} kg

`;

    // Add weekly structure
    plan += `STRUTTURA SETTIMANALE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${days.structure}

`;

    // Add individual days
    plan += days.details;

    // Add general notes
    plan += `⚡ NOTE GENERALI:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Incrementa i carichi del 2.5-5% ogni 2-3 settimane
• Mantieni una frequenza di ripetizioni controllata (2-3 secondi eccentrica)
• Riposa 48h prima di allenare lo stesso gruppo muscolare
• Se i pesi sono insufficienti, aumenta le ripetizioni di 2-3
• Adatta gli esercizi in base ai tuoi dolori/limitazioni
• Registra i tuoi carichi per monitorare la progressione

Generato per ${userName} — ${new Date().toLocaleDateString('it-IT')}`;

    return plan;
  }

  /**
   * Generate nutrition plan using simulation
   */
  private generateNutritionSimulation(
    userName: string,
    userWeight: number,
    userAge: number,
    questionnaire: NutritionQuestionnaireData & { userGender?: 'M' | 'F'; activityLevel?: string }
  ): string {
    const { dietaryPreference, caloricIntake, mealFrequency, allergies, cookingSkillLevel } = questionnaire;

    // Calculate macros based on goal and weight
    const proteinGrams = Math.round(userWeight * 1.8); // 1.8g per kg standard
    const carbGrams = Math.round((caloricIntake * 0.45) / 4);
    const fatGrams = Math.round((caloricIntake * 0.30) / 9);

    let plan = `🥗 PIANO NUTRIZIONALE AI — ${userName}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 Obiettivo: ${questionnaire.dietaryPreference === 'omnivore' ? 'Onnivoro' : questionnaire.dietaryPreference.charAt(0).toUpperCase() + questionnaire.dietaryPreference.slice(1)}
⚖️ Peso: ${userWeight} kg | Target calorico: ${caloricIntake} kcal
🍽️ Frequenza pasti: ${mealFrequency} al giorno

`;

    plan += `📊 MACRONUTRIENTI TARGET:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Calorie: ${caloricIntake} kcal/giorno
• Proteine: ${proteinGrams}g (${Math.round((proteinGrams * 4 / caloricIntake) * 100)}% - 1.8g/kg)
• Carboidrati: ${carbGrams}g (${Math.round((carbGrams * 4 / caloricIntake) * 100)}%)
• Grassi: ${fatGrams}g (${Math.round((fatGrams * 9 / caloricIntake) * 100)}%)

`;

    // Generate meals based on frequency
    const caloriePerMeal = Math.round(caloricIntake / mealFrequency);
    const proteinPerMeal = Math.round(proteinGrams / mealFrequency);

    plan += `🍽️ PIANO PASTI (${mealFrequency} PASTI AL GIORNO):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Per pasto target: ~${caloriePerMeal} kcal, ~${proteinPerMeal}g proteine

`;

    const mealNames = ['COLAZIONE', 'SPUNTINO MATTINA', 'PRANZO', 'SPUNTINO POMERIGGIO', 'CENA', 'SPUNTINO SERALE'];
    const mealExamples = this.generateMealExamples(dietaryPreference, cookingSkillLevel, mealFrequency);

    for (let i = 0; i < Math.min(mealFrequency, mealNames.length); i++) {
      plan += `${i + 1}. ${mealNames[i]} (~${caloriePerMeal} kcal)\n`;
      plan += mealExamples[i] || '   • Opzione proteica + fonti di carboidrati + grassi salutari\n';
      plan += '\n';
    }

    // Add notes
    plan += `💡 CONSIGLI GENERALI:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Bevi almeno 2.5-3 litri di acqua al giorno
• Mangia i carboidrati principali intorno ai tuoi allenamenti
• Distribuisci le proteine uniformemente nei pasti
• Prendi un multivitaminico se il tuo piano è restrittivo
• Pesa il cibo per le prime 2-3 settimane, poi impara le porzioni
• Se senti fame eccessiva, aggiungi 100-200 kcal da proteine/fibre
• Fai una ricarica di carboidrati (refeed) ogni 5-7 giorni se in deficit

⚠️ LIMITAZIONI E ALLERGIE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${questionnaire.allergies && questionnaire.allergies.length > 0 ? questionnaire.allergies.join(', ') : 'Nessuna allergia registrata'}\n

Generato per ${userName} — ${new Date().toLocaleDateString('it-IT')}`;

    return plan;
  }

  /**
   * Helper: Generate workout day splits
   */
  private generateWorkoutDays(
    frequency: number,
    level: string,
    focusAreas: string[],
    equipment: string[]
  ): { structure: string; details: string } {
    let structure = '';
    let details = '';

    if (frequency === 3) {
      structure = `• LUNEDÌ - Parte Alta (Petto, Spalle, Dorsali, Bicipiti)
• MERCOLEDÌ - Gambe & Glutei
• VENERDÌ - Parte Alta Heavy (con barre libere e compound)`;

      details = `LUNEDÌ — PARTE ALTA (VOLUME)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Panca piana o Push: 4×8-10 @70-75%
2. Trazioni o Lat pulldown: 4×8-10
3. Spalle (Shoulder Press o Laterali): 3×10-12
4. Rematore: 3×10-12
5. Bicipiti Curl: 3×12-15
6. Cardio leggero: 10 min

MERCOLEDÌ — GAMBE & GLUTEI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Squat o Leg Press: 4×8-10 @75%
2. Stacco Rumeno: 3×10-12
3. Leg Curl o Leg Extensions: 3×12
4. Calf Raise: 3×15-20
5. Glutei Bridge: 3×15
6. Addominali: 3 serie

VENERDÌ — PARTE ALTA HEAVY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Deadlift: 3×3-5 @85%
2. Bench Press Heavy: 4×5-6
3. Barbell Row: 4×6-8
4. Overhead Press: 3×8
5. Pull-ups pesate: 3×6-8
6. Accessori leggeri: 2×12
`;
    } else if (frequency === 4) {
      structure = `• LUNEDÌ - Gambe A
• MARTEDÌ - Parte Alta A
• GIOVEDÌ - Gambe B
• VENERDÌ - Parte Alta B`;

      details = `LUNEDÌ — GAMBE A (COMPOUND HEAVY)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Squat: 4×5 @80%
2. Hack Squat: 3×10
3. Leg Curl: 3×12
4. Calf: 3×15

MARTEDÌ — PARTE ALTA A
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Panca Piana: 4×6 @78%
2. Trazioni: 4×6-8
3. Overhead Press: 3×8
4. Cable Row: 3×12

GIOVEDÌ — GAMBE B (VOLUME)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Leg Press: 4×10
2. Bulgarian Split Squat: 3×10
3. Leg Extension: 3×15
4. Leg Curl: 3×15
5. Glutei Bridge: 3×15

VENERDÌ — PARTE ALTA B (VOLUME)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Incline Bench: 4×8-10
2. Lat Pulldown: 4×10-12
3. Cable Fly: 3×12
4. Face Pull: 3×15
5. Bicipiti + Tricipiti: 2×12
`;
    } else if (frequency === 5) {
      structure = `• LUNEDÌ - Push
• MARTEDÌ - Pull
• MERCOLEDÌ - Gambe
• GIOVEDÌ - Push + Accessori
• VENERDÌ - Pull + Accessori`;

      details = `LUNEDÌ — PUSH
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Panca Piana: 4×6-8
2. Incline Dumbbell: 3×8-10
3. Shoulder Press: 3×8-10
4. Lateral Raise: 3×12
5. Tricip Dips: 3×8-10

MARTEDÌ — PULL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Deadlift: 4×3-5
2. Trazioni: 4×6-8
3. Barbell Row: 3×8
4. Face Pull: 3×15
5. Bicipiti Curl: 3×10-12

MERCOLEDÌ — GAMBE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Squat: 4×6-8
2. Leg Press: 3×10
3. Leg Curl: 3×12
4. Glutei Bridge: 3×12
5. Calf Raise: 3×20

GIOVEDÌ — PUSH + ACCESSORI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Incline Bench: 4×8
2. Machine Chest Press: 3×12
3. Cable Fly: 3×15
4. Tricip Machine: 3×12
5. Overhead Extension: 3×12

VENERDÌ — PULL + ACCESSORI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Lat Pulldown: 4×10
2. Seal Row: 3×10
3. Machine Row: 3×12
4. Shrug: 3×15
5. Bicip + Reverse Curl: 2×12
`;
    }

    return { structure, details };
  }

  /**
   * Helper: Generate meal examples
   */
  private generateMealExamples(dietaryPreference: string, cookingSkillLevel: string, mealCount: number): string[] {
    const examples: Record<string, string[]> = {
      omnivore: [
        '   • 3 uova + 50g avena + banana + miele\n   • 50g yogurt greco + granola\n',
        '   • 30g frutta secca + banana\n',
        '   • 200g pollo al forno + 150g riso integrale + verdure\n   • 1 cucchiaio olio EVO\n',
        '   • 150g ricotta + frutta\n',
        '   • 200g salmone/carne rossa + 200g patate dolci + broccoli\n',
        '   • 200g yogurt greco + mandorle\n',
      ],
      vegetarian: [
        '   • Porridge 50g avena + noci + banana\n   • 2 fette pane integrale + burro arachidi\n',
        '   • Mela + 30g frutta secca\n',
        '   • 200g legumi (cotti) + 150g riso integrale + verdure\n   • 1 uovo sodo\n',
        '   • 150g ricotta + banana + miele\n',
        '   • 150g tofu/tempeh alla piastra + 200g patate + spinaci\n   • 1 cucchiaio olio\n',
        '   • 200g yogurt + granola + mirtilli\n',
      ],
      vegan: [
        '   • 50g avena + latte di soia + banana + semi chia\n',
        '   • Banana + 30g frutta secca\n',
        '   • 200g legumi + 150g riso integrale + verdure\n   • 1 cucchiaio olio EVO\n',
        '   • Smoothie: banana + latte soia + burro arachidi\n',
        '   • 200g tofu/tempeh + 200g patate dolci + broccoli\n   • Semi sesamo\n',
        '   • 200g yogurt di soia + granola\n',
      ],
      keto: [
        '   • 4 uova al burro + avocado\n   • Caffè con olio di cocco\n',
        '   • Formaggio + noci\n',
        '   • 250g carne rossa/pesce + insalata con olio EVO\n',
        '   • Uova sode + avocado\n',
        '   • 250g pesce grasso + verdure cotte in burro\n',
        '   • Formaggio a fette + mandorle\n',
      ],
      'high-protein': [
        '   • 150g ricotta + 50g avena + uova\n   • Proteine in polvere\n',
        '   • 40g proteine in polvere + banana\n',
        '   • 250g petto di pollo + riso + verdure\n   • Olio EVO\n',
        '   • Barretta proteica + banana\n',
        '   • 200g salmone + 150g riso integrale + broccoli\n',
        '   • Casein + frutta secca\n',
      ],
    };

    return examples[dietaryPreference] || examples['omnivore'];
  }
}

export const planGenerator = new PlanGeneratorService();
