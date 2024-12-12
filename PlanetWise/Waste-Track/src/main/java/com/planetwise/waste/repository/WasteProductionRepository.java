package com.planetwise.waste.repository;

import com.planetwise.waste.model.WasteProduction;
import com.planetwise.waste.model.WasteType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.Month;
import java.time.Year;
import java.util.List;
import java.util.UUID;

public interface WasteProductionRepository extends JpaRepository<WasteProduction, UUID> {

  @Query("SELECT w FROM WasteProduction w WHERE w.username = :username " +
          "AND (w.year > :startYear OR (w.year = :startYear AND w.month >= :startMonth))")
  List<WasteProduction> findWasteProductionFromLastTenMonths(String username, Year startYear, Month startMonth);


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

}
