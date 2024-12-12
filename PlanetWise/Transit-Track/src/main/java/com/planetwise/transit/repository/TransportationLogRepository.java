package com.planetwise.transit.repository;

import com.planetwise.transit.model.FuelType;
import com.planetwise.transit.model.TransportationLog;
import com.planetwise.transit.model.TransportationMode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.Month;
import java.time.Year;
import java.util.List;
import java.util.SequencedCollection;
import java.util.UUID;

public interface TransportationLogRepository extends JpaRepository<TransportationLog, UUID> {

    @Query("SELECT t FROM TransportationLog t WHERE t.username = :username")
    List<TransportationLog> findByUsername(String username);



    // Modified query to filter by both year and month
    @Query(value = """
                SELECT t.year, t.month, SUM(t.carbon_emissions) AS total_emissions
                FROM transportation_log t
                WHERE t.username = :username\s
                  AND (t.year > :startYear  OR (t.year = :startYear AND t.month >= CAST(:startMonth AS TEXT)))
                GROUP BY t.year, t.month\s
                ORDER BY t.year,\s
                         CASE\s
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
    List<Object[]> findMonthlyCarbonEmissionsByUsernameAndDateRange(String username, Year startYear, Month startMonth);

    boolean existsByUsername(String username);

    @Query("SELECT t FROM TransportationLog t WHERE t.username = :username AND t.month = :month AND t.year = :year")
    List<TransportationLog> findByUsernameAndMonthAndYear(String username, Year year, Month month);

    @Query(value = """
            SELECT *\s
               FROM transportation_log\s
               WHERE username = :username\s
                 AND year = (SELECT MAX(year) FROM transportation_log WHERE username = :username)\s
                 AND month = (
                     SELECT MAX(month)\s
                     FROM transportation_log\s
                     WHERE username = :username
                       AND year = (SELECT MAX(year) FROM transportation_log WHERE username = :username)
                     Group BY month
                     order by month desc
               	  LIMIT 1
                 );
        """, nativeQuery = true)
    List<TransportationLog> getLatestData(String username);

    @Query(value = """
          SELECT *\s
          FROM  transportation_log t
          WHERE t.username = :username
          ORDER BY\s
              t.year DESC,
              CASE\s
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
              END DESC;
          """,nativeQuery = true)
    List<TransportationLog> getAllSorted(String username);
}

