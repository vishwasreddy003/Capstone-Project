export interface Task {
    goalId : string; 
    goalTitle: string;        // Title of the goal
    goalDescription: string;  // Detailed description of the goal
    goalDifficulty: string;   // Difficulty level (e.g., "EASY", "MEDIUM", "HARD")
    goalFrequency: string;    // Frequency of the goal (e.g., "DAILY", "WEEKLY")
    greenCoins: number;       // Number of green coins associated with the goal       
  }