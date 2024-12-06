package com.planetwise.energywise.calculation;

import org.springframework.stereotype.Component;

@Component
public class CarbonEmissionCalculation {
    private static final double ELECTRICITY_EMISSION_FACTOR = 0.85;
    private static final double GAS_CYLINDER_EMISSION = 63.0;

    public double Calculate(Double electricity_units,Double cylinders_used){
        return (electricity_units * ELECTRICITY_EMISSION_FACTOR) +
                (cylinders_used * GAS_CYLINDER_EMISSION);
    }

}
