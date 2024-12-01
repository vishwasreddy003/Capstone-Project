package com.planetwise.transit.repository;

import com.planetwise.transit.model.FuelType;
import com.planetwise.transit.model.TransportationLog;
import com.planetwise.transit.model.TransportationMode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface TransportationLogRepository extends JpaRepository<TransportationLog, UUID> {
    @Query("SELECT t FROM TransportationLog t WHERE t.username = :username")
    List<TransportationLog> findByUsername(String username);

    @Query("SELECT t FROM TransportationLog t WHERE t.username = :username AND t.transportation_mode = :transportationMode")
    List<TransportationLog> findByUsernameAndTransportMode(String username, TransportationMode transportationMode);

    @Query("SELECT t FROM TransportationLog t WHERE t.username = :username AND t.fuel_type = :fuelType")
    List<TransportationLog> findByUsernameAndFuelType(String username, FuelType fuelType);

    @Query("SELECT t.month, SUM(t.carbon_emissions) FROM TransportationLog t WHERE t.username = :username GROUP BY t.month")
    List<Object[]> findMonthlyCarbonEmissionsByUsername(String  username);

}
