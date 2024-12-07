package com.planetwise.energywise.service;

import com.planetwise.energywise.calculation.CarbonEmissionCalculation;
import com.planetwise.energywise.exception.DataAlreadyExistsException;
import com.planetwise.energywise.exception.UsernameNotFoundException;
import com.planetwise.energywise.model.EnergyConsumption;
import com.planetwise.energywise.repository.EnergyConsumptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Month;
import java.time.Year;
import java.util.List;

@Service
public class EnergyConsumptionServiceImpl implements EnergyConsumptionService {

    @Autowired
    private EnergyConsumptionRepository energyRepo;

    @Autowired
    private CarbonEmissionCalculation logic;

    @Override
    public EnergyConsumption saveEnergyConsumption(String username, EnergyConsumption energyConsumption) {


        if (!energyRepo.existsByUsernameAndMonthAndYear(username, energyConsumption.getMonth(), energyConsumption.getYear())) {

            double emissions = logic.Calculate(energyConsumption.getElectricity_units(), energyConsumption.getNo_of_gas_cylinders());
            energyConsumption.setCarbon_emissions(emissions);
            energyConsumption.setUsername(username);

            return energyRepo.save(energyConsumption);
        } else {
            throw new DataAlreadyExistsException("This Month and Year Data already exists for the user.");
        }
    }


    @Override
    public List<EnergyConsumption> getUserTrendsForEnergyConsumption(String username) {

        LocalDate now = LocalDate.now();
        LocalDate startDate = now.minusMonths(10);


        Month startMonth = startDate.getMonth();
        int startYear = startDate.getYear();
        return energyRepo.findEnergyConsumptionOfLast10Months(username, startYear, startMonth);
    }

    @Override
    public Double getCarbonEmissions(String username, Year year, Month month) {
        if(energyRepo.existsByUsername(username)){
            return energyRepo.findByUsernameAndMonthAndYear(username,year,month).getFirst().getCarbon_emissions();
        }else {
            throw new UsernameNotFoundException(("User with username " + username +" not found"));
        }
    }
}
