/**
 * PlanStorage.ts
 * Service for managing workout and nutrition plan storage in localStorage
 */

export interface StoredPlan {
  content: string;
  generatedAt: string;
  metadata: {
    userId: number;
    userName: string;
    goals?: string[];
    preferences?: Record<string, any>;
    [key: string]: any;
  };
  history?: PlanGenerationHistory[];
}

export interface PlanGenerationHistory {
  generatedAt: string;
  parameters: Record<string, any>;
  contentPreview: string;
}

export interface WorkoutQuestionnaireData {
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  trainingGoals: string[];
  equipment: string[];
  trainingFrequency: number;
  sessionDuration: number;
  focusAreas: string[];
  exercisesToAvoid: string[];
}

export interface NutritionQuestionnaireData {
  dietaryPreference: 'omnivore' | 'vegetarian' | 'vegan' | 'keto' | 'high-protein';
  caloricIntake: number;
  mealFrequency: number;
  allergies: string[];
  cuisinePreferences: string[];
  cookingSkillLevel: 'basic' | 'intermediate' | 'advanced';
}

const PLAN_KEY_WORKOUT = (userId: number) => `o2_plans_${userId}_workout`;
const PLAN_KEY_NUTRITION = (userId: number) => `o2_plans_${userId}_nutrition`;
const PLAN_HISTORY_KEY = (userId: number) => `o2_plans_${userId}_history`;

class PlanStorageService {
  /**
   * Save a workout plan to localStorage
   */
  saveWorkoutPlan(userId: number, userName: string, content: string, metadata: any = {}): void {
    const plan: StoredPlan = {
      content,
      generatedAt: new Date().toISOString(),
      metadata: {
        userId,
        userName,
        ...metadata,
      },
    };

    const key = PLAN_KEY_WORKOUT(userId);
    localStorage.setItem(key, JSON.stringify(plan));
    this.addToHistory(userId, 'workout', metadata);
  }

  /**
   * Save a nutrition plan to localStorage
   */
  saveNutritionPlan(userId: number, userName: string, content: string, metadata: any = {}): void {
    const plan: StoredPlan = {
      content,
      generatedAt: new Date().toISOString(),
      metadata: {
        userId,
        userName,
        ...metadata,
      },
    };

    const key = PLAN_KEY_NUTRITION(userId);
    localStorage.setItem(key, JSON.stringify(plan));
    this.addToHistory(userId, 'nutrition', metadata);
  }

  /**
   * Get a stored workout plan
   */
  getWorkoutPlan(userId: number): StoredPlan | null {
    try {
      const key = PLAN_KEY_WORKOUT(userId);
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (err) {
      console.error('Error retrieving workout plan:', err);
      return null;
    }
  }

  /**
   * Get a stored nutrition plan
   */
  getNutritionPlan(userId: number): StoredPlan | null {
    try {
      const key = PLAN_KEY_NUTRITION(userId);
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (err) {
      console.error('Error retrieving nutrition plan:', err);
      return null;
    }
  }

  /**
   * Delete a workout plan
   */
  deleteWorkoutPlan(userId: number): void {
    const key = PLAN_KEY_WORKOUT(userId);
    localStorage.removeItem(key);
  }

  /**
   * Delete a nutrition plan
   */
  deleteNutritionPlan(userId: number): void {
    const key = PLAN_KEY_NUTRITION(userId);
    localStorage.removeItem(key);
  }

  /**
   * Add generation to history
   */
  private addToHistory(userId: number, planType: 'workout' | 'nutrition', parameters: Record<string, any>): void {
    try {
      const historyKey = PLAN_HISTORY_KEY(userId);
      let history: Record<string, PlanGenerationHistory[]> = { workout: [], nutrition: [] };

      const stored = localStorage.getItem(historyKey);
      if (stored) {
        history = JSON.parse(stored);
      }

      const entry: PlanGenerationHistory = {
        generatedAt: new Date().toISOString(),
        parameters,
        contentPreview: parameters.contentPreview || '',
      };

      if (!history[planType]) {
        history[planType] = [];
      }

      history[planType].push(entry);
      // Keep only last 10 generations per type
      if (history[planType].length > 10) {
        history[planType] = history[planType].slice(-10);
      }

      localStorage.setItem(historyKey, JSON.stringify(history));
    } catch (err) {
      console.error('Error adding to history:', err);
    }
  }

  /**
   * Get generation history
   */
  getHistory(userId: number): Record<string, PlanGenerationHistory[]> {
    try {
      const historyKey = PLAN_HISTORY_KEY(userId);
      const data = localStorage.getItem(historyKey);
      return data ? JSON.parse(data) : { workout: [], nutrition: [] };
    } catch (err) {
      console.error('Error retrieving history:', err);
      return { workout: [], nutrition: [] };
    }
  }

  /**
   * Clear all user plans
   */
  clearAllPlans(userId: number): void {
    this.deleteWorkoutPlan(userId);
    this.deleteNutritionPlan(userId);
    const historyKey = PLAN_HISTORY_KEY(userId);
    localStorage.removeItem(historyKey);
  }

  /**
   * Export all user data
   */
  exportUserData(userId: number): string {
    const workout = this.getWorkoutPlan(userId);
    const nutrition = this.getNutritionPlan(userId);
    const history = this.getHistory(userId);

    return JSON.stringify(
      {
        exportedAt: new Date().toISOString(),
        userId,
        workout,
        nutrition,
        history,
      },
      null,
      2
    );
  }
}

export const planStorage = new PlanStorageService();
