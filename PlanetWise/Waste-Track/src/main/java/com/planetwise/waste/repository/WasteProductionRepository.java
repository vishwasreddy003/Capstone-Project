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
  List<WasteProduction> findWasteProductionFromLastTenMonths(String username, int startYear, Month startMonth);


  @Query("SELECT count(*) > 0 FROM WasteProduction w WHERE w.username = :username " +
          "AND w.waste_type = :wasteType AND w.month = :month AND w.year = :year")
  Boolean existsByUsernameWastetypeAndMonth(String username, WasteType wasteType, Month month, Year year);

  boolean existsByUsername(String username);

  WasteProduction findByUsername(String username);
}
