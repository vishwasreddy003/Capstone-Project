package com.planetwise.waste.model;

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
public class WasteProduction {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID waste_id;
    private String username;
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Month month;
    private Year year;
    @Enumerated(EnumType.STRING)
    private WasteType waste_type;
    private Double quantity_kgs;
    private Double carbon_emissions;

}
