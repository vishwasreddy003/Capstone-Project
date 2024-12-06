package com.planetwise.transit.Caluculation;


import com.planetwise.transit.model.FuelType;
import com.planetwise.transit.model.TransportationLog;
import com.planetwise.transit.model.TransportationMode;
import org.springframework.stereotype.Component;

@Component
public class CarbonEmissionCalculation {

    public  double calculateEmissions(TransportationLog log) {
        int frequencyFactor = switch (log.getFrequency()) {
            case DAILY -> 30;
            case WEEKLY -> 4;
            case MONTHLY -> 1;
        };

        double emissionFactor = getEmissionFactor(log.getTransportation_mode(), log.getFuel_type());

        return log.getDistance_km() * emissionFactor * frequencyFactor;
    }

    private static double getEmissionFactor(TransportationMode mode, FuelType fuelType) {
        return switch (mode) {
            case BIKE -> switch (fuelType) {
                case PETROL -> 0.05;
                case DIESEL -> 0.06;
                case EV -> 0.00;
                default -> throw new IllegalArgumentException("Invalid fuel type for BIKE");
            };
            case CAR -> switch (fuelType) {
                case PETROL -> 0.192;
                case DIESEL -> 0.216;
                case EV -> 0.00;
                default -> throw new IllegalArgumentException("Invalid fuel type for CAR");
            };
            case BUS -> switch (fuelType) {
                case PETROL -> 0.03;
                case DIESEL -> 0.04;
                case EV -> 0.00;
                default -> throw new IllegalArgumentException("Invalid fuel type for BUS");
            };
            case TRAIN -> switch (fuelType) {
                case PETROL -> 0.02;
                case DIESEL -> 0.03;
                case EV -> 0.00;
                default -> throw new IllegalArgumentException("Invalid fuel type for TRAIN");
            };
            case FLIGHT -> {
                if (fuelType == FuelType.JET_FUEL) yield 0.24;
                else throw new IllegalArgumentException("Invalid fuel type for FLIGHT");
            }
            case AUTO -> switch (fuelType) {
                case PETROL -> 0.1;
                case DIESEL -> 0.12;
                case EV -> 0.00;
                default -> throw new IllegalArgumentException("Invalid fuel type for AUTO");
            };
        };
    }
}
