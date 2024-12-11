package com.planetwise.energywise.service;

import com.planetwise.energywise.calculation.CarbonEmissionCalculation;
import com.planetwise.energywise.dto.DtoUtil;
import com.planetwise.energywise.dto.TrendsDto;
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
import java.util.Optional;
import java.util.stream.Collectors;

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
    public List<TrendsDto> getUserTrendsForEnergyConsumption(String username) {

        LocalDate now = LocalDate.now();
        LocalDate startDate = now.minusMonths(10);


        Month startMonth = startDate.getMonth();
        int startYear = startDate.getYear();
        return energyRepo.findEnergyConsumptionOfLast10Months(username, Year.of(startYear), startMonth).stream().map(DtoUtil::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public Double getCarbonEmissions(String username, Year year, Month month) {
        if(energyRepo.existsByUsername(username)){
            return energyRepo.findByUsernameAndMonthAndYear(username,year,month).stream().mapToDouble(EnergyConsumption::getCarbon_emissions).average().getAsDouble();
        }else {
            throw new UsernameNotFoundException(("User with username " + username +" not found"));
        }
    }

    @Override
    public Double getLatestCarbonEmissions(String username) {
        if (username == null) {
            throw new IllegalArgumentException("Username cannot be null.");
        }

        if (!energyRepo.existsByUsername(username)) {
            throw new UsernameNotFoundException("User with username " + username + " not found.");
        }

        return energyRepo.getLatestData(username).stream()
                .mapToDouble(wp -> Optional.ofNullable(wp.getCarbon_emissions()).orElse(0.0))
                .average()
                .orElse(0.0);
    }
}
