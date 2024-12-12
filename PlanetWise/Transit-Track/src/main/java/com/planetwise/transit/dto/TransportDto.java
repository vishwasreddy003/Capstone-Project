package com.planetwise.transit.dto;

import com.planetwise.transit.model.FuelType;
import com.planetwise.transit.model.TransportationMode;

import java.time.Month;
import java.time.Year;

public record TransportDto(Month month, Year year, TransportationMode mode, FuelType type,float distance,double emissions) {
}
