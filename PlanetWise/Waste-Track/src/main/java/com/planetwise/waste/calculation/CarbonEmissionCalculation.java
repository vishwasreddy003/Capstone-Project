package com.planetwise.waste.calculation;

import com.planetwise.waste.model.WasteProduction;
import com.planetwise.waste.model.WasteType;
import org.springframework.stereotype.Component;

@Component
public class CarbonEmissionCalculation {

    private static final double FOOD_WASTE_EMISSION_FACTOR = 0.5;
    private static final double NON_FOOD_WASTE_EMISSION_FACTOR = 0.25;

    public double calculateCarbonEmissions(double waste_qty, WasteType type) {

        double emissionFactor = switch (type) {
            case WasteType.FOODWASTE -> FOOD_WASTE_EMISSION_FACTOR;
            case WasteType.NONFOODWASTE -> NON_FOOD_WASTE_EMISSION_FACTOR;
        };

        return waste_qty*emissionFactor;
    }

}
