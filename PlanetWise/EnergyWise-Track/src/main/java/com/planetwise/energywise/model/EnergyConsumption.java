package com.planetwise.energywise.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.time.Month;
import java.time.Year;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class EnergyConsumption {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID entry_id;
    private String username;
    @Enumerated(EnumType.STRING)
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Month month;
    private Year year;
    private Double electricity_units;
    private Double no_of_gas_cylinders;
    private Double carbon_emissions;
}
