package com.planetwise.greenscores.repository;

import com.planetwise.greenscores.model.GreenScores;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.Month;
import java.util.List;
import java.util.UUID;

public interface GreenScoresRepository extends JpaRepository<GreenScores, UUID> {

    @Query("SELECT g FROM GreenScores g WHERE g.username = :username " +
            "AND (g.year > :startYear OR (g.year = :startYear AND g.month >= :startMonth))")
    List<GreenScores> findGreenScoresFromLastTenMonths(String username, int startYear, Month startMonth);

}
