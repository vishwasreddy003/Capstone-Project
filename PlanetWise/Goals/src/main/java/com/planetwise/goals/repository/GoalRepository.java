package com.planetwise.goals.repository;

import com.planetwise.goals.model.Difficulty;
import com.planetwise.goals.model.Goals;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface GoalRepository extends JpaRepository<Goals, UUID> {


    @Query("SELECT g FROM Goals g WHERE g.goal_difficulty = :difficulty")
    List<Goals> findGoalsByDifficulty(Difficulty difficulty);

    @Query("SELECT g FROM Goals g WHERE g.goal_title = :title")
    Goals findByGoalTitle(String title);
}
