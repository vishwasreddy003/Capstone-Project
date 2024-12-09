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
        SELECT * 
        FROM WasteProduction 
        WHERE username = :username 
        AND year = (SELECT MAX(year) FROM WasteProduction) 
        AND month = (
            SELECT month 
            FROM WasteProduction 
            WHERE year = (SELECT MAX(year) FROM WasteProduction) 
            ORDER BY 
                CASE month 
                    WHEN 'January' THEN 1 
                    WHEN 'February' THEN 2 
                    WHEN 'March' THEN 3 
                    WHEN 'April' THEN 4 
                    WHEN 'May' THEN 5 
                    WHEN 'June' THEN 6 
                    WHEN 'July' THEN 7 
                    WHEN 'August' THEN 8 
                    WHEN 'September' THEN 9 
                    WHEN 'October' THEN 10 
                    WHEN 'November' THEN 11 
                    WHEN 'December' THEN 12 
                END DESC 
            LIMIT 1
        )
        """, nativeQuery = true)
  List<WasteProduction> getLatestData(String username);

}
