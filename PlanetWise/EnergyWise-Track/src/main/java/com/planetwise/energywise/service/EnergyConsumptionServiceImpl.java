package com.planetwise.energywise.service;

import com.planetwise.energywise.exception.DataAlreadyExistsException;
import com.planetwise.energywise.model.EnergyConsumption;
import com.planetwise.energywise.repository.EnergyConsumptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;

@Service
public class EnergyConsumptionServiceImpl implements EnergyConsumptionService {

    @Autowired
    private EnergyConsumptionRepository energyRepo;

    @Override
    public EnergyConsumption saveEnergyConsumption(String username, EnergyConsumption energyConsumption) {
        // Check if data already exists for the given month and username
        if (!energyRepo.existsByUsernameAndMonth(username, energyConsumption.getMonth())) {
            energyConsumption.setUsername(username);
            return energyRepo.save(energyConsumption);
        } else {
            throw new DataAlreadyExistsException("This Month Data already Exists");
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
}
