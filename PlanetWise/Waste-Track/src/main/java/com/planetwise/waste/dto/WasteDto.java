package com.planetwise.waste.dto;

import com.planetwise.waste.model.WasteType;

import java.time.Month;
import java.time.Year;

public record WasteDto(Month month, Year year, WasteType wasteType, double qty, double emissions){

}
