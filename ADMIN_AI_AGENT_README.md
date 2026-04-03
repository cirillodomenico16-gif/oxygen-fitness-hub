# Admin AI Agent Implementation Guide

## Overview

The Oxygen Fitness Hub Admin AI Agent is a fully operational system for generating personalized workout plans (Scheda Settimanale) and nutrition plans (Dieta Settimanale) for gym members. The system integrates seamlessly with the existing Lovable app and uses localStorage for client-side persistence.

## Architecture

### Core Components

1. **AdminAIPage.tsx** - Main admin interface with member selection and plan generation workflow
2. **WorkoutQuestionnaire.tsx** - Interactive form for collecting workout requirements
3. **NutritionQuestionnaire.tsx** - Interactive form for collecting nutrition requirements
4. **PlanGenerator.ts** - Service that generates personalized plans using prompt engineering
5. **PlanStorage.ts** - Service for managing localStorage operations and plan history

### Data Flow

```
Admin -> Member Selection -> Mode Selection (Scheda/Dieta)
  -> Questionnaire Form -> Plan Generation -> Result Display
  -> localStorage Storage -> User Pages (WorkoutPage/ProgressPage)
```

## Features

### 1. Member Management
- Browse all gym members with profiles
- View member details: name, plan type, weight, goal, fitness level, streak
- Select any member for plan generation

### 2. Workout Plan Generation (Scheda Settimanale)
Collects comprehensive data:
- **Fitness Level**: Beginner, Intermediate, Advanced
- **Training Goals**: Muscle Gain, Fat Loss, Strength, Endurance, Toning (multiple selection)
- **Equipment**: Dumbbells, Barbell, Machines, Calisthenics, Cables, Kettlebells
- **Training Frequency**: 3-6 days per week
- **Session Duration**: 30, 45, 60, or 90 minutes
- **Focus Areas**: Chest, Back, Shoulders, Arms, Legs, Glutes, Core, Cardio
- **Exercises to Avoid**: Custom restrictions for injuries/limitations

Generates plans with:
- Weekly structure and split recommendations (PPL, Upper/Lower, Full Body)
- Daily workout details with exercises, sets, reps, and percentages
- Progressive overload guidance
- Rest recommendations
- Cardio guidelines
- General training notes

### 3. Nutrition Plan Generation (Dieta Settimanale)
Collects comprehensive data:
- **Dietary Preference**: Omnivore, Vegetarian, Vegan, Keto, High-Protein
- **Caloric Intake**: With TDEE estimation based on weight, age, activity level
- **Quick Selectors**: Deficit (-20%), Maintenance, Surplus (+15%)
- **Meal Frequency**: 3-6 meals per day
- **Allergies/Intolerances**: Lactose, Nuts, Peanuts, Fish, Shellfish, Eggs, Gluten, Soy
- **Cuisine Preferences**: Italian, Japanese, Spanish, Greek, Indian, Mexican, Thai, American
- **Cooking Skill**: Basic, Intermediate, Advanced

Generates plans with:
- Personalized macronutrient targets (Protein, Carbs, Fats)
- Per-meal calorie and protein allocation
- Daily meal suggestions with specific foods
- Macronutrient breakdown percentages
- General nutrition guidelines
- Hydration recommendations
- Supplement suggestions
- Allergy warnings

### 4. Plan Storage & History
- Plans stored in localStorage with format: `o2_plans_${userId}_workout` and `o2_plans_${userId}_nutrition`
- Each plan includes:
  - `content`: Full generated plan text
  - `generatedAt`: ISO timestamp
  - `metadata`: Questionnaire data and parameters
- History tracking: Up to 10 generations per type per user
- Export functionality for user data backup

### 5. Integration with User Pages
- **WorkoutPage.tsx**: Displays generated workout plan in collapsible section
- **ProgressPage.tsx**: Displays generated nutrition plan in collapsible section
- Plans load automatically from localStorage when user views these pages

## Storage Schema

### Workout Plan
```json
{
  "content": "📋 SCHEDA ALLENAMENTO AI...",
  "generatedAt": "2026-04-03T12:48:00.000Z",
  "metadata": {
    "userId": 1,
    "userName": "Alessandro M.",
    "fitnessLevel": "intermediate",
    "trainingGoals": ["muscle_gain"],
    "equipment": ["dumbbells", "barbell"],
    "trainingFrequency": 4,
    "sessionDuration": 60,
    "focusAreas": ["chest", "back", "arms"],
    "exercisesToAvoid": []
  }
}
```

### Nutrition Plan
```json
{
  "content": "🥗 PIANO NUTRIZIONALE AI...",
  "generatedAt": "2026-04-03T12:48:00.000Z",
  "metadata": {
    "userId": 1,
    "userName": "Alessandro M.",
    "dietaryPreference": "omnivore",
    "caloricIntake": 3100,
    "mealFrequency": 4,
    "allergies": [],
    "cuisinePreferences": ["Italian"],
    "cookingSkillLevel": "intermediate"
  }
}
```

### History Entry
```json
{
  "generatedAt": "2026-04-03T12:48:00.000Z",
  "parameters": { /* questionnaire data */ },
  "contentPreview": "First 100 chars of generated plan"
}
```

## Usage Workflow

### For Admins

1. **Access Admin Panel**
   - Click admin icon in user app to switch to admin mode
   - Navigate to "Schede AI & Diete" section

2. **Generate Workout Plan**
   - Select member from list
   - Ensure "🏋️ Scheda Allenamento" is selected
   - Click "➕ Nuova Scheda"
   - Complete workout questionnaire
   - Review generated plan
   - Click "📤 Invia a [Member Name]" to confirm

3. **Generate Nutrition Plan**
   - Select member from list
   - Switch to "🥗 Piano Nutrizionale"
   - Click "➕ Nuova Dieta"
   - Complete nutrition questionnaire
   - Review generated plan
   - Click "📤 Invia a [Member Name]" to confirm

4. **View Plan History**
   - Select member from list
   - Click "📜 Cronologia" button
   - See all previous plans generated with parameters and dates

### For Members

Plans appear automatically in:
- **WorkoutPage**: Under "Scheda Settimanale" section
- **ProgressPage**: Under "Dieta Settimanale" section

## Implementation Details

### Plan Generation Algorithm

The `PlanGenerator` uses deterministic simulation to create realistic, personalized plans:

**Workout Plans:**
- Selects training split based on frequency and fitness level
- Generates exercise combinations matching available equipment
- Assigns sets, reps, and rest periods based on fitness level and goals
- Includes progressive overload guidance
- Provides specific notes for injury prevention

**Nutrition Plans:**
- Calculates macronutrient targets based on weight and goals
- Generates meal examples matching dietary preference
- Accounts for allergies and cuisine preferences
- Adjusts meal distribution based on meal frequency
- Provides cooking-level-appropriate suggestions

### localStorage Keys

```typescript
// Workout plan
`o2_plans_${userId}_workout`

// Nutrition plan
`o2_plans_${userId}_nutrition`

// Plan history
`o2_plans_${userId}_history`
```

### State Management

AdminAIPage uses local state for workflow:
- `selectedMember`: Current member being managed
- `mode`: 'scheda' or 'dieta'
- `adminState`: 'member-select' | 'questionnaire' | 'result' | 'history'
- `generating`: Boolean for loading state
- `result`: Generated plan text
- `history`: Plan generation history for selected member

## Styling & Theme

Uses the existing COLORS theme from `/config/theme.ts`:
- Primary gradient: #ff4444 to #cc0000
- Dark backgrounds with red accents
- Accessible color contrast ratios
- Responsive grid layouts

## Error Handling

- Input validation on questionnaire forms
- Try-catch blocks in localStorage operations
- User-friendly error alerts
- Graceful fallbacks for missing data

## Future Enhancement Opportunities

1. **API Integration**
   - Connect to Claude API or OpenAI for more sophisticated generation
   - Add real-time LLM streaming
   - Support dynamic image generation for exercise references

2. **Advanced Features**
   - PDF export of plans
   - Email delivery to members
   - Plan comparison and A/B testing
   - Member feedback on plan effectiveness
   - Automatic plan adjustments based on feedback

3. **Data Analytics**
   - Track which plan variations are most popular
   - Measure member adherence rates
   - A/B test different plan parameters
   - Generate insights on fitness goals

4. **Mobile Optimization**
   - Push notifications when plans are generated
   - Offline plan viewing
   - Plan sharing with personal trainers
   - Integration with wearables for real-time tracking

## Testing Checklist

- [x] Member selection works correctly
- [x] Mode toggle (Scheda/Dieta) functions
- [x] Workout questionnaire form validation
- [x] Nutrition questionnaire form validation
- [x] Plan generation and display
- [x] localStorage persistence
- [x] Plan history tracking
- [x] Integration with WorkoutPage
- [x] Integration with ProgressPage
- [x] Responsive design on mobile
- [x] Animation and UI/UX flow
- [x] Error handling and edge cases

## File Locations

```
src/
├── components/
│   ├── AdminAIPage.tsx                    (Main admin interface)
│   ├── WorkoutQuestionnaire.tsx           (Workout form)
│   ├── NutritionQuestionnaire.tsx         (Nutrition form)
│   ├── WorkoutPage.tsx                    (User workout display)
│   └── ProgressPage.tsx                   (User nutrition display)
├── services/
│   ├── PlanGenerator.ts                   (Plan generation logic)
│   └── PlanStorage.ts                     (localStorage management)
├── config/
│   └── theme.ts                           (Color theme)
├── data/
│   └── members.ts                         (Member data)
└── index.css                              (Global styles with animations)
```

## Dependencies

- React 18.3.1
- React DOM 18.3.1
- TypeScript 5.5.3
- No external libraries required (all built-in)

## Performance Considerations

- Plans generated client-side (instant, no API latency)
- localStorage operations are synchronous but fast (<1ms)
- Plan history limited to 10 entries per type to reduce storage
- Images/exercises handled via Unsplash URLs (cached by browser)

## Security Notes

- No sensitive data is transmitted
- All plans stored locally in user's browser
- No authentication required (admin access controlled by app routing)
- No API keys or credentials stored
- Questionnaire data is never sent externally

## Support & Maintenance

- Check browser console for any errors
- Clear localStorage if plans don't appear: `localStorage.clear()`
- Verify member data in `/data/members.ts`
- Monitor localStorage usage (typically <100KB per member)

---

**Status**: Production Ready
**Last Updated**: April 3, 2026
**Version**: 1.0.0
