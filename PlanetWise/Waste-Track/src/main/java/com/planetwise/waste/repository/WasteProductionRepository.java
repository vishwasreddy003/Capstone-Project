package com.planetwise.waste.repository;

import com.planetwise.waste.model.WasteProduction;
import com.planetwise.waste.model.WasteType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.Month;
import java.util.List;
import java.util.UUID;

public interface WasteProductionRepository extends JpaRepository<WasteProduction, UUID> {
  @Query("SELECT w FROM WasteProduction w WHERE w.username = :username AND w.month >= :startMonth")
  List<WasteProduction> findWasteProductionFromLastTenMonths(String username,Month startMonth);

  @Query("Select count(*) > 0 from WasteProduction w where w.username = :username and (w.waste_type = :wasteType and w.month = :month)")
  Boolean existsByUsernameWastetypeAndMonth(String username, WasteType wasteType,Month month);
}
