package com.planetwise.transit.dto;

import com.planetwise.transit.model.TransportationLog;

public class DtoUtil {
    public TrendsDto convertToDto(TransportationLog t){
        return new TrendsDto(t.getMonth(),t.getYear(),t.getCarbon_emissions());
    }
}
