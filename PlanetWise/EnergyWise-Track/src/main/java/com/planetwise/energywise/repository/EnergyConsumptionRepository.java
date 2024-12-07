package com.planetwise.energywise.repository;

import com.planetwise.energywise.model.EnergyConsumption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.Month;
import java.time.Year;
import java.util.List;
import java.util.UUID;

public interface EnergyConsumptionRepository extends JpaRepository<EnergyConsumption, UUID> {

    @Query("SELECT e FROM EnergyConsumption e WHERE e.username = :username " +
            "AND (e.year > :startYear OR (e.year = :startYear AND e.month >= :startMonth))")
    List<EnergyConsumption> findEnergyConsumptionOfLast10Months(String username, int startYear, Month startMonth);

    @Query("SELECT count(*) > 0 FROM EnergyConsumption e WHERE e.username = :username AND e.month = :month AND e.year = :year")
    Boolean existsByUsernameAndMonthAndYear(String username, Month month, Year year);


    EnergyConsumption findByUsername(String username);

    boolean existsByUsername(String username);
}
