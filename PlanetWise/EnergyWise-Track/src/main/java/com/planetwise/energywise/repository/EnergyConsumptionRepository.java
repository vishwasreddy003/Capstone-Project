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

    @Query("SELECT e FROM EnergyConsumption e WHERE e.username = :username AND e.month = :month AND e.year = :year")
    List<EnergyConsumption> findByUsernameAndMonthAndYear(String username,Year year,Month month);

    boolean existsByUsername(String username);

    @Query(value = """
        SELECT * 
        FROM energy_consumption 
        WHERE username = :username 
        AND year = (SELECT MAX(year) FROM energy_consumption) 
        AND month = (
            SELECT month 
            FROM energy_consumption 
            WHERE year = (SELECT MAX(year) FROM energy_consumption) 
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
    List<EnergyConsumption> getLatestData(String username);
}
