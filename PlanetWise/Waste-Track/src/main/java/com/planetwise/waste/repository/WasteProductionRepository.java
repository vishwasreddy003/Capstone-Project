package com.planetwise.waste.repository;

import com.planetwise.waste.dto.TrendsDto;
import com.planetwise.waste.model.WasteProduction;
import com.planetwise.waste.model.WasteType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.Month;
import java.time.Year;
import java.util.List;
import java.util.UUID;

public interface WasteProductionRepository extends JpaRepository<WasteProduction, UUID> {

  @Query(value = """
           SELECT t.year, t.month, SUM(t.carbon_emissions) AS total_emissions
              FROM transportation_log t
              WHERE t.username = 'pillu07'\s
              AND (t.year > 2023 OR (t.year = 2023 AND t.month >= 'DECEMBER'))
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
  List<Object[]> findWasteProductionFromLastTenMonths(String username, Year startYear, Month startMonth);


  @Query("SELECT count(*) > 0 FROM WasteProduction w WHERE w.username = :username " +
          "AND w.waste_type = :wasteType AND w.month = :month AND w.year = :year")
  Boolean existsByUsernameWastetypeAndMonth(String username, WasteType wasteType, Month month, Year year);

  boolean existsByUsername(String username);

  List<WasteProduction> findByUsernameAndYearAndMonth(String username,Year year,Month month);

  @Query(value = """
           SELECT *\s
           FROM waste_production\s
           WHERE username = :username\s
             AND year = (SELECT MAX(year) FROM waste_production WHERE username = :username)\s
             AND month = (
                 SELECT MAX(month)\s
                 FROM waste_production\s
                 WHERE username = :username
                   AND year = (SELECT MAX(year) FROM waste_production WHERE username = :username)
                 Group BY month
                 order by month desc
           	  LIMIT 1
             );
        """, nativeQuery = true)
  List<WasteProduction> getLatestData(String username);


  @Query(value = """
          SELECT *\s
          FROM  waste_production t
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
  List<WasteProduction> getAllSorted(String username);

}
