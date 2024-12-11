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
    @Query("SELECT t.year, t.month, SUM(t.carbon_emissions) FROM TransportationLog t WHERE t.username = :username " +
            "AND (t.year > :startYear OR (t.year = :startYear AND t.month >= :startMonth)) " +
            "GROUP BY t.year, t.month ORDER BY t.year, t.month")
    List<Object[]> findMonthlyCarbonEmissionsByUsernameAndDateRange(String username, Year startYear, Month startMonth);

    boolean existsByUsername(String username);

    @Query("SELECT t FROM TransportationLog t WHERE t.username = :username AND t.month = :month AND t.year = :year")
    List<TransportationLog> findByUsernameAndMonthAndYear(String username, int year, Month month);

    @Query(value = """
        SELECT * 
        FROM transportation_log 
        WHERE username = :username 
        AND year = (SELECT MAX(year) FROM transportation_log) 
        AND month = (
            SELECT month 
            FROM transportation_log 
            WHERE year = (SELECT MAX(year) FROM transportation_log) 
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
    List<TransportationLog> getLatestData(String username);
}

