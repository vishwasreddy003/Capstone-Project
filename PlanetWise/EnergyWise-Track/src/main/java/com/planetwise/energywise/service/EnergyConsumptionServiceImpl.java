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
public class EnergyConsumptionServiceImpl implements EnergyConsumptionService{

    @Autowired
    private EnergyConsumptionRepository energyRepo;


    @Override
    public EnergyConsumption saveEnergyConsumption(EnergyConsumption energyConsumption) {
        String username = energyConsumption.getUsername();

        if(!energyRepo.existsByUsernameAndMonth(username,energyConsumption.getMonth())){
            return energyRepo.save(energyConsumption);
        }else {
            throw new DataAlreadyExistsException("This Month Data already Exists");
        }
    }

    @Override
    public List<EnergyConsumption> getUserTrendsForEnergyConsumption(String username) {
        Month startMonth = LocalDate.now().minusMonths(10).getMonth();
        return energyRepo.findEnergyConsumptionOfLast10Months(username,startMonth);
    }
}
