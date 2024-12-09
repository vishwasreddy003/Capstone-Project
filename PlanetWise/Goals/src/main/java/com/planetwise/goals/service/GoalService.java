package com.planetwise.goals.service;

import com.planetwise.goals.model.Difficulty;
import com.planetwise.goals.model.Goals;

import java.util.List;
import java.util.UUID;

public interface GoalService {
    public Goals addGoal(Goals goal);

    public List<Goals> getAllGoals();

    public List<Goals> getGoalsByDifficulty(Difficulty difficulty);

    public void deleteGoal(UUID goalId);

    List<Goals> getUserGoals(List<UUID> goalIds);

}
