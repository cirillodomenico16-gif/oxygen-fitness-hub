# Admin AI Agent - Example Usage Guide

## Complete Walkthrough: Generating Plans for Alessandro M.

### Scenario
You want to generate both a workout plan and nutrition plan for Alessandro M., an Elite member who wants to gain muscle mass.

---

## Step 1: Access Admin Panel

1. Open the Oxygen Fitness Hub app in your browser
2. Navigate to the home page
3. Look for the admin icon or settings button in the bottom navigation
4. Click to switch to Admin Mode
5. You'll see an admin badge at the top of the screen
6. Navigate to "Schede AI & Diete" from the admin menu

**Expected Result**: You see the Admin AI Page with member selection

---

## Step 2: Select Member - Alessandro M.

The screen shows:
```
👤 Seleziona Socio
├─ 👨‍💪 Alessandro M.
│  Elite · Obiettivo: Massa Muscolare · 82kg
│  [Elite badge]
│
├─ 👩‍💪 Giulia R.
│  Premium · Obiettivo: Dimagrimento · 63kg
│  [Premium badge]
│
└─ ... (more members)
```

**Action**: Click on "Alessandro M." to select him

**Expected Result**:
- Alessandro's card is highlighted with primary color border
- His parameters appear below in stat badges:
  - Peso: 82 kg
  - Livello: Lv.12
  - Streak: 28gg
  - Obiettivo: Massa Muscolare
  - Plan: Elite

---

## Step 3: Select Mode - Workout Plan

Current mode is "🏋️ Scheda Allenamento" (already selected)

**Action**: Confirm this is the mode you want, or click "🥗 Piano Nutrizionale" to switch

**Expected Result**: The selected mode shows gradient background and blue shadow

---

## Step 4: Generate Workout Plan

**Action**: Click "➕ Nuova Scheda"

**Expected Result**: Screen transitions to questionnaire state with form displayed

---

## Step 5: Complete Workout Questionnaire

You see the form with these sections:

### 5.1 Fitness Level
```
📊 Livello di Fitness
├─ Principiante (< 1 anno) - Nuovo al fitness
├─ Intermedio (1-3 anni) - Esperienza di base [NOT SELECTED]
└─ Avanzato (> 3 anni) - Allenamento regolare [NOT SELECTED]
```
**Action**: Since Alessandro is Lv.12, select "Avanzato" (Advanced)
**Expected Result**: Button gets red border and filled background

### 5.2 Training Goals
```
🎯 Obiettivi di Allenamento (seleziona almeno 1)
├─ 💪 Guadagno Muscolare [CLICK THIS]
├─ 🔥 Perdita Grasso
├─ ⚡ Forza Massima [ALSO CLICK THIS for variation]
├─ 🏃 Resistenza
└─ ✨ Tonificazione
```
**Action**: Click "💪 Guadagno Muscolare" (muscle gain is the goal)
**Expected Result**: Button highlights with primary color

### 5.3 Equipment
```
🏋️ Attrezzatura Disponibile (seleziona almeno 1)
├─ 🏋️ Manubri [CLICK THIS]
├─ 🏋️‍♂️ Bilanciere [CLICK THIS]
├─ 🤖 Macchine
├─ 💪 Calisthenics
├─ 🔗 Cavi [CLICK THIS]
└─ 🎯 Kettlebell
```
**Action**: Select dumbbells, barbell, and cables (most complete gym setup)
**Expected Result**: Three buttons highlighted with red borders

### 5.4 Training Frequency
```
📅 Frequenza di Allenamento: 4x per settimana

[────────●────────]
   3x    4x    5x    6x
```
**Action**: The slider should already be at 4. Verify it matches "LUNEDÌ - MARTEDÌ - GIOVEDÌ - VENERDÌ"
**Expected Result**: Shows "4x per settimana"

### 5.5 Session Duration
```
⏱️ Durata per Sessione
┌────────┬────────┬────────┬────────┐
│  30'   │  45'   │  60'   │  90'   │
└────────┴────────┴────────┴────────┘
                [60' selected]
```
**Action**: Click "60'" (60 minutes is standard for strength training)
**Expected Result**: Button shows gradient background

### 5.6 Focus Areas
```
🎯 Gruppi Muscolari da Enfatizzare
├─ Petto [CLICK THIS]
├─ Schiena [CLICK THIS]
├─ Spalle [CLICK THIS]
├─ Braccia [CLICK THIS]
├─ Gambe
├─ Glutei
├─ Core
└─ Cardio
```
**Action**: Select chest, back, shoulders, and arms (upper body focus for mass gain)
**Expected Result**: Four buttons highlighted

### 5.7 Exercises to Avoid
```
⚠️ Esercizi da Evitare (per infortuni/dolori)
├─ Squat
├─ Deadlift
├─ Panca Piana
├─ Trazioni
├─ Spalle
├─ Ginocchia
├─ Schiena
└─ Anca
```
**Action**: Leave all unchecked (Alessandro has no injuries)
**Expected Result**: No buttons selected (all light gray)

---

## Step 6: Submit Workout Form

**Action**: Click "🚀 Genera Scheda Allenamento"

**Expected Result**:
- Button shows loading state with spinner
- Text changes to "⚙️ Generazione in corso..."
- Form becomes disabled
- Wait 1.5 seconds for generation to complete

---

## Step 7: View Generated Workout Plan

After generation, you see:

```
✅ Scheda Generato con Successo
                                [📤 Invia a Alessandro M.]

Generato: giovedì 3 aprile 2026

📋 SCHEDA ALLENAMENTO AI — Alessandro M.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 Obiettivo: Guadagno Muscolare
📊 Livello: Avanzato
📅 Frequenza: 4x per settimana
⏱️ Durata sessione: 60 minuti
💪 Peso corporeo: 82 kg

STRUTTURA SETTIMANALE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• LUNEDÌ - Parte Alta (Petto, Spalle, Dorsali, Bicipiti)
• MARTEDÌ - Gambe & Glutei
• GIOVEDÌ - Parte Alta Heavy (con barre libere e compound)

LUNEDÌ — PARTE ALTA (VOLUME)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Panca piana o Push: 4×8-10 @70-75%
2. Trazioni o Lat pulldown: 4×8-10
3. Spalle (Shoulder Press o Laterali): 3×10-12
4. Rematore: 3×10-12
5. Bicipiti Curl: 3×12-15
6. Cardio leggero: 10 min

MARTEDÌ — GAMBE & GLUTEI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[... additional workout details ...]

GIOVEDÌ — PARTE ALTA HEAVY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[... heavy lift details ...]

⚡ NOTE GENERALI:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Incrementa i carichi del 2.5-5% ogni 2-3 settimane
• Mantieni una frequenza di ripetizioni controllata
• Riposa 48h prima di allenare lo stesso gruppo muscolare
[... more notes ...]
```

**Action**: Review the plan. If satisfied, click "📤 Invia a Alessandro M."

**Expected Result**: Alert confirms "Piano di allenamento inviato a Alessandro M.!"

---

## Step 8: Generate Nutrition Plan

After sending workout plan:

**Action**: Click "← Nuova Generazione"

**Expected Result**: Returns to member selection screen

**Action**: Select "🥗 Piano Nutrizionale" mode

**Expected Result**: Mode toggle shows nutrition icon selected

**Action**: Click "➕ Nuova Dieta"

**Expected Result**: Nutrition questionnaire appears

---

## Step 9: Complete Nutrition Questionnaire

### 9.1 Dietary Preference
```
🍽️ Preferenza Dietetica
├─ 🥩🥗 Onnivoro - Tutto, senza restrizioni [SELECTED]
├─ 🥚🥗 Vegetariano - Senza carne
├─ 🥗 Vegano - Solo vegetale
├─ 🥓🥬 Chetogenico - Basso carb, alto grasso
└─ 🍗💪 Alto Proteico - Massima proteina
```
**Action**: Keep "Onnivoro" selected (standard choice)
**Expected Result**: Button highlighted

### 9.2 Caloric Intake
```
🔥 Intake Calorico Giornaliero

TDEE stimato: 2850 kcal/giorno

┌─────────────────┬──────────────────┬────────────────┐
│ Deficit (-20%)  │ Mantenimento (0%)│ Surplus (+15%) │
│  2280 kcal      │   2850 kcal      │   3277 kcal    │
└─────────────────┴──────────────────┴────────────────┘

[                    3100 kcal input field                ]
```
**Action**: Click "Surplus (+15%)" or manually enter 3100 (lean bulk)
**Expected Result**: Shows ~3100 kcal selected with macro breakdown showing increased carbs and protein

### 9.3 Meal Frequency
```
🍽️ Frequenza Pasti: 4 pasti al giorno

┌──────────┬──────────┬──────────┬──────────┐
│ 3 pasti  │ 4 pasti  │ 5 pasti  │ 6 pasti  │
└──────────┴──────────┴──────────┴──────────┘
                      [4 pasti selected]

≈ 775 kcal per pasto
```
**Action**: Keep 4 meals selected (balanced frequency)
**Expected Result**: Shows 4 meals with per-meal breakdown

### 9.4 Allergies
```
⚠️ Allergie / Intolleranze
├─ Lattosio
├─ Noci
├─ Arachidi
├─ Pesce
├─ Crostacei
├─ Uova
├─ Gluten
└─ Soia
```
**Action**: Leave all unchecked (Alessandro has no allergies)
**Expected Result**: No allergies selected

### 9.5 Cuisine Preferences
```
🌍 Preferenze Culinarie
├─ 🇮🇹 Italiana [CLICK THIS]
├─ 🇯🇵 Giapponese
├─ 🇪🇸 Spagnola
├─ 🇬🇷 Greca
├─ 🇮🇳 Indiana
├─ 🇲🇪 Messicana
├─ 🇹🇭 Tailandese
└─ 🇺🇸 Americana
```
**Action**: Select Italian (fits local preferences)
**Expected Result**: Button highlighted with primary color

### 9.6 Cooking Skill
```
👨‍🍳 Livello di Cucina
┌──────────────────┬──────────────────┬──────────────────┐
│ 🆕 Base          │ 👨‍🍳 Intermedio    │ 🥘 Avanzato      │
│ Ricette semplici │ Un po' esperienza │ Cuoco esperto    │
└──────────────────┴──────────────────┴──────────────────┘
                      [Intermedio selected]
```
**Action**: Keep "Intermedio" selected
**Expected Result**: Button shows gradient

---

## Step 10: Submit Nutrition Form

**Action**: Click "🚀 Genera Piano Nutrizionale"

**Expected Result**:
- Loading state with spinner
- Text "⚙️ Generazione in corso..."
- Wait for completion

---

## Step 11: View Generated Nutrition Plan

After generation:

```
✅ Piano Generato con Successo
                           [📤 Invia a Alessandro M.]

Generato: giovedì 3 aprile 2026

🥗 PIANO NUTRIZIONALE AI — Alessandro M.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 Obiettivo: Onnivoro
⚖️ Peso: 82 kg | Target calorico: 3100 kcal
🍽️ Frequenza pasti: 4 al giorno

📊 MACRONUTRIENTI TARGET:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Calorie: 3100 kcal/giorno
• Proteine: 148g (19% - 1.8g/kg)
• Carboidrati: 412g (53%)
• Grassi: 86g (25%)

🍽️ PIANO PASTI (4 PASTI AL GIORNO):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Per pasto target: ~775 kcal, ~37g proteine

1. COLAZIONE (~775 kcal)
   • 3 uova + 50g avena + banana + miele
   • 50g yogurt greco + granola

2. SPUNTINO MATTINA (~775 kcal)
   • 30g frutta secca + banana

3. PRANZO (~775 kcal)
   • 200g pollo al forno + 150g riso integrale + verdure
   • 1 cucchiaio olio EVO

4. CENA (~775 kcal)
   • 200g salmone/carne rossa 2×/sett
   • 200g patate dolci + broccoli

💡 CONSIGLI GENERALI:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Bevi almeno 2.5-3 litri di acqua al giorno
• Mangia i carboidrati principali intorno ai tuoi allenamenti
• Distribuisci le proteine uniformemente nei pasti
[... more nutrition tips ...]

Generato per Alessandro M. — giovedì 3 aprile 2026
```

**Action**: Review and click "📤 Invia a Alessandro M."

**Expected Result**: Confirmation alert shows

---

## Step 12: Verify Plans Appear in User Pages

1. **Switch back to User Mode**: Click admin icon or navigate away
2. **Go to Workout Page**:
   - Should see "📋 Scheda Settimanale" section
   - Plan content visible with "Generata: 3 aprile 2026"
3. **Go to Progress Page**:
   - Should see "🥗 Dieta Settimanale" section
   - Nutrition plan visible with "Generata: 3 aprile 2026"

**Expected Result**: Both plans appear automatically without any additional actions

---

## Step 13: View Plan History

Back in Admin Mode:

1. Select Alessandro M. again
2. Click "📜 Cronologia"
3. See:
```
📜 Cronologia Piani di Alessandro M.

🏋️ Schede di Allenamento (1)
  giovedì 3 aprile 2026
  Frequenza: 4x/sett · Durata: 60'

🥗 Piani Nutrizionali (1)
  giovedì 3 aprile 2026
  Calorie: 3100 kcal · Pasti: 4
```

**Expected Result**: History shows all generated plans with timestamps and key parameters

---

## Example Output Samples

### Generated Workout Plan Format
```
📋 SCHEDA ALLENAMENTO AI — [Name]
━━━━━━━━━━━━━━━━━━━━━━
🎯 Obiettivo: [Goal]
📊 Livello: [Level]
📅 Frequenza: [Frequency]x per settimana
⏱️ Durata sessione: [Duration] minuti
💪 Peso corporeo: [Weight] kg

STRUTTURA SETTIMANALE:
[Split structure based on frequency]

[GIORNO A — Description]
1. Exercise: Sets×Reps @Percentage
[continues with exercises]

[Additional days as needed]

⚡ NOTE GENERALI:
• Training guidance
• Progressive overload
• Rest recommendations
```

### Generated Nutrition Plan Format
```
🥗 PIANO NUTRIZIONALE AI — [Name]
━━━━━━━━━━━━━━━━━━━━
🎯 Obiettivo: [Dietary Preference]
⚖️ Peso: [Weight] kg | Target calorico: [Calories] kcal
🍽️ Frequenza pasti: [Meals] al giorno

📊 MACRONUTRIENTI TARGET:
• Calorie: [Total] kcal/giorno
• Proteine: [Grams]g ([Percent]%)
• Carboidrati: [Grams]g ([Percent]%)
• Grassi: [Grams]g ([Percent]%)

🍽️ PIANO PASTI:
[For each meal]
[Meal name] (~[Calories] kcal)
  • Food 1
  • Food 2
  • Food 3

💡 CONSIGLI GENERALI:
• Hydration recommendation
• Meal timing advice
• Supplement suggestions
```

---

## Common Scenarios

### Scenario A: Member with Injury
- Select member
- In "Esercizi da Evitare": Check "Ginocchia" and "Gambe"
- Generate plan
- Plan will exclude leg exercises and focus on upper body

### Scenario B: High-Frequency Training
- Select member
- Set frequency to 5x per week
- Plan generates PPL (Push/Pull/Legs) + Accessory structure
- More detailed daily breakdowns

### Scenario C: Dietary Restrictions
- Select "Vegetariano" in nutrition questionnaire
- Plan automatically suggests vegetarian protein sources
- Includes beans, lentils, tofu, eggs, dairy

### Scenario D: Limited Equipment
- Select only "Dumbbells" and "Bodyweight"
- Plan uses only dumbbell exercises and calisthenics
- No barbell or machine references

---

## Tips for Best Results

1. **Review Questionnaire Data**: Ensure all form fields match member profile
2. **Complete All Required Fields**: Forms require at least 1 selection in key areas
3. **Match Member Level**: Use fitness level that matches member's experience
4. **Consider Goals Holistically**: Combine related goals for better results
5. **Generate When Ready**: Once sent, can regenerate with new parameters anytime
6. **Use History**: Check history to avoid duplicate plans on same day
7. **Communicate with Member**: Let them know their new plan is ready

---

## Troubleshooting

### Plan Not Appearing in WorkoutPage/ProgressPage?
- Check localStorage: Open DevTools → Application → Local Storage
- Look for `o2_plans_${userId}_workout` or `o2_plans_${userId}_nutrition`
- If missing, regenerate the plan

### Questionnaire Form Won't Submit?
- Ensure at least 1 option selected in required fields
- For equipment: Must select at least 1 type
- For goals: Must select at least 1 goal
- Check browser console for error messages

### localStorage Full?
- Each plan is ~3-5KB with history
- Browser localStorage typically has 5-10MB quota
- 100+ plans would use only ~500KB

---

## Success Indicators

✅ Plan appears in both Admin and User pages
✅ Timestamps show correct generation date
✅ Parameters match questionnaire inputs
✅ Macro breakdown calculations are accurate
✅ Exercise selection matches fitness level
✅ Meal suggestions match dietary preference
✅ History tracking works correctly
✅ Multiple plans can be generated without conflicts

---

This completes a full example workflow for the Admin AI Agent system!
