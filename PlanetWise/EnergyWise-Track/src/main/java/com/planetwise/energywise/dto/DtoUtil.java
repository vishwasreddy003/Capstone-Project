package com.planetwise.energywise.dto;

import com.planetwise.energywise.model.EnergyConsumption;

public class DtoUtil {

    public static TrendsDto convertToDto(EnergyConsumption e){

        return new TrendsDto(
                e.getMonth(),e.getYear(),e.getCarbon_emissions()
        );
    }
}
