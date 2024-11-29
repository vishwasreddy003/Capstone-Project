package com.planetwise.transit.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Month;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class TransportationLog {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID log_id;
    private String username;
    @Enumerated(EnumType.STRING)
    private TransportationMode transportation_mode;
    @Enumerated(EnumType.STRING)
    private FuelType fuel_type;
    private float distance_km;
    @Enumerated(EnumType.STRING)
    private Frequency frequency;
    private Month month;
    private Double carbon_emissions;
}
