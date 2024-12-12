package com.planetwise.energywise.repository;

import com.planetwise.energywise.model.EnergyConsumption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.Month;
import java.time.Year;
import java.util.List;
import java.util.UUID;

public interface EnergyConsumptionRepository extends JpaRepository<EnergyConsumption, UUID> {

    @Query(value = """
                SELECT t.year, t.month, SUM(t.carbon_emissions) AS total_emissions
                FROM energy_consumption t
                WHERE t.username = :username\s
                  AND (t.year > :startYear OR (t.year = :startYear AND t.month >= CAST(:startMonth AS TEXT)))
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
            """, nativeQuery = true
    )
    List<Object[]> findEnergyConsumptionOfLast10Months(String username, Year startYear, Month startMonth);

    @Query("SELECT count(*) > 0 FROM EnergyConsumption e WHERE e.username = :username AND e.month = :month AND e.year = :year")
    Boolean existsByUsernameAndMonthAndYear(String username, Month month, Year year);

    @Query("SELECT e FROM EnergyConsumption e WHERE e.username = :username AND e.month = :month AND e.year = :year")
    List<EnergyConsumption> findByUsernameAndMonthAndYear(String username,Year year,Month month);

    boolean existsByUsername(String username);

    @Query(value = """
            SELECT *\s
                   FROM energy_consumption\s
                   WHERE username = :username\s
                     AND year = (SELECT MAX(year) FROM energy_consumption WHERE username = :username)\s
                     AND month = (
                         SELECT MAX(month)\s
                         FROM energy_consumption\s
                         WHERE username = :username
                           AND year = (SELECT MAX(year) FROM energy_consumption WHERE username = :username)
                         Group BY month
                         order by month desc
                   	  LIMIT 1
                     );
        """, nativeQuery = true)
    List<EnergyConsumption> getLatestData(String username);

    @Query(value = """
          SELECT *\s
          FROM  energy_consumption t
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
    List<EnergyConsumption> getAllSorted(String username);
}
