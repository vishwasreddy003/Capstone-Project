package com.planetwise.greenscores.model;

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
public class GreenScores {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID score_id;
    private String username;
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    @Enumerated(EnumType.STRING)
    private Month month;
    private Year year;
    private Double score_value;
    private String feedback;

}
