package com.planetwise.energywise.dto;

import java.time.Month;
import java.time.Year;

public record EnergyDto (Month month, Year year,double units,double cylinders,double emissions) {
}
