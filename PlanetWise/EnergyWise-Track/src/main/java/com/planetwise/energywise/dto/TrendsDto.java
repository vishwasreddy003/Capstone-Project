package com.planetwise.energywise.dto;

import java.time.Month;
import java.time.Year;

public record TrendsDto (Month month, Year  year,Double emissions){
}
