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

//  @Query("SELECT *\n" +
//          "FROM WasteProduction\n" +
//          "WHERE username =:username and year = (\n" +
//          "    SELECT MAX(year)\n" +
//          "    FROM your_table\n" +
//          ")\n" +
//          "AND month = (\n" +
//          "    SELECT month\n" +
//          "    FROM your_table\n" +
//          "    WHERE year = (SELECT MAX(year) FROM your_table)\n" +
//          "    ORDER BY \n" +
//          "      CASE month\n" +
//          "        WHEN 'January' THEN 1\n" +
//          "        WHEN 'February' THEN 2\n" +
//          "        WHEN 'March' THEN 3\n" +
//          "        WHEN 'April' THEN 4\n" +
//          "        WHEN 'May' THEN 5\n" +
//          "        WHEN 'June' THEN 6\n" +
//          "        WHEN 'July' THEN 7\n" +
//          "        WHEN 'August' THEN 8\n" +
//          "        WHEN 'September' THEN 9\n" +
//          "        WHEN 'October' THEN 10\n" +
//          "        WHEN 'November' THEN 11\n" +
//          "        WHEN 'December' THEN 12\n" +
//          "      END DESC\n" +
//          "    LIMIT 1\n" +
//          ");\n")
//  List<WasteProduction> getLatestData(String username);
}
