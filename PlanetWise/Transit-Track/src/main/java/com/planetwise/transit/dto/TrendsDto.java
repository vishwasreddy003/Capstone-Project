package com.planetwise.transit.dto;

import java.time.Month;
import java.time.Year;

public record TrendsDto (Month month, Year year,double emissions){
}
