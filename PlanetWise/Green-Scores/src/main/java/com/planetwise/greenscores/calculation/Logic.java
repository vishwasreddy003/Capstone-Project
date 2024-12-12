package com.planetwise.greenscores.calculation;

import org.springframework.stereotype.Component;

@Component
public class Logic {
    public Double calculate(double e_emissions,double w_emissions,double t_emissions){
        double result = (e_emissions + w_emissions + t_emissions) / 180.0;
        return Math.round(result * 100.0)*1.00;

    }
}
