package com.planetwise.energywise.repository;

import com.planetwise.energywise.model.EnergyConsumption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.Month;
import java.util.List;
import java.util.UUID;

public interface EnergyConsumptionRepository extends JpaRepository<EnergyConsumption, UUID> {
    @Query("SELECT COUNT(e) > 0 FROM EnergyConsumption e WHERE e.username = :username AND e.month = :month")
    boolean existsByUsernameAndMonth(String username, Month month);

    @Query("SELECT e FROM EnergyConsumption e WHERE e.username =:username AND e.month >= :startMonth")
    List<EnergyConsumption> findEnergyConsumptionOfLast10Months(String username,Month startMonth);

}
