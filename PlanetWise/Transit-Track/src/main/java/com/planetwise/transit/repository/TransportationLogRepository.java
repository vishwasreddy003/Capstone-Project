package com.planetwise.transit.repository;

import com.planetwise.transit.model.FuelType;
import com.planetwise.transit.model.TransportationLog;
import com.planetwise.transit.model.TransportationMode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.Month;
import java.time.Year;
import java.util.List;
import java.util.SequencedCollection;
import java.util.UUID;

public interface TransportationLogRepository extends JpaRepository<TransportationLog, UUID> {

    @Query("SELECT t FROM TransportationLog t WHERE t.username = :username")
    List<TransportationLog> findByUsername(String username);



    // Modified query to filter by both year and month
    @Query("SELECT t.month, SUM(t.carbon_emissions) FROM TransportationLog t WHERE t.username = :username " +
            "AND (t.year > :startYear OR (t.year = :startYear AND t.month >= :startMonth)) " +
            "GROUP BY t.month")
    List<Object[]> findMonthlyCarbonEmissionsByUsernameAndDateRange(String username, int startYear, Month startMonth);

    boolean existsByUsername(String username);

    @Query("SELECT t FROM TransportationLog t WHERE t.username = :username AND t.month = :month AND t.year = :year")
    List<TransportationLog> findByUsernameAndMonthAndYear(String username, int year, Month month);
}

