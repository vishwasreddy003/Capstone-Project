export interface Task {
  goalId: string;            // Unique ID for the goal
  goalTitle: string;         // Title of the goal
  goalDescription: string;   // Detailed description of the goal
  goalDifficulty: string;    // Difficulty level (e.g., "EASY", "MEDIUM", "HARD")
  goalFrequency: string;     // Frequency of the goal (e.g., "DAILY", "WEEKLY")
  greenCoins: number;        // Number of green coins associated with the goal
  startDate: string;         // Start date of the goal (ISO 8601 format, e.g., "2024-12-10")
  endDate: string;           
}
