package com.planetwise.greenscores.repository;

import com.planetwise.greenscores.model.GreenScores;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.Month;
import java.time.Year;
import java.util.List;
import java.util.UUID;

public interface GreenScoresRepository extends JpaRepository<GreenScores, UUID> {

    @Query(value = """
                SELECT t.year, t.month, SUM(t.score_value) AS GreenScore
                FROM green_scores t
                WHERE t.username = :username
                AND (t.year > :startYear OR (t.year = :startYear AND t.month >= CAST(:startMonth AS TEXT)))
                GROUP BY t.year, t.month
                ORDER BY t.year,
                         CASE
                           WHEN t.month = 'JANUARY' THEN 1
                           WHEN t.month = 'FEBRUARY' THEN 2
                           WHEN t.month = 'MARCH' THEN 3
                           WHEN t.month = 'APRIL' THEN 4
                           WHEN t.month = 'MAY' THEN 5
                           WHEN t.month = 'JUNE' THEN 6
                           WHEN t.month = 'JULY' THEN 7
                           WHEN t.month = 'AUGUST' THEN 8
                           WHEN t.month = 'SEPTEMBER' THEN 9
                           WHEN t.month = 'OCTOBER' THEN 10
                           WHEN t.month = 'NOVEMBER' THEN 11
                           WHEN t.month = 'DECEMBER' THEN 12
                         END;
            """,nativeQuery = true
    )
    List<Object[]> findGreenScoresFromLastTenMonths(String username, Year startYear, Month startMonth);

}
