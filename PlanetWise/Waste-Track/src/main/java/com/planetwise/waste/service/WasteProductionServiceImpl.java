package com.planetwise.waste.service;

import com.planetwise.waste.calculation.CarbonEmissionCalculation;
import com.planetwise.waste.exception.DataAlreadyExistsException;
import com.planetwise.waste.exception.UsernameNotFoundException;
import com.planetwise.waste.model.WasteProduction;
import com.planetwise.waste.repository.WasteProductionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Month;
import java.time.Year;
import java.time.YearMonth;
import java.util.List;

@Service
public class WasteProductionServiceImpl implements WasteProductionService{

    @Autowired
    private WasteProductionRepository wasteProductionRepo;

    @Autowired
    private CarbonEmissionCalculation logic;


    @Override
    public WasteProduction saveWasteProduction(String username,WasteProduction wasteProduction) {

        if(!wasteProductionRepo.existsByUsernameWastetypeAndMonth(username,wasteProduction.getWaste_type(),wasteProduction.getMonth(),wasteProduction.getYear())){
            double emissions = logic.calculateCarbonEmissions(wasteProduction.getQuantity_kgs(), wasteProduction.getWaste_type());
            wasteProduction.setCarbon_emissions(emissions);
            return wasteProductionRepo.save(wasteProduction);
        }
        else{
            throw new DataAlreadyExistsException("Data Already exists");
        }
    }

    @Override
    public List<WasteProduction> getTrendsForWasteProduction(String username) {
        LocalDate now = LocalDate.now();
        LocalDate startDate = now.minusMonths(12);


        Month startMonth = startDate.getMonth();
        int startYear = startDate.getYear();


        return wasteProductionRepo.findWasteProductionFromLastTenMonths(username, startYear, startMonth);
    }

    @Override
    public Double getCarbonEmissions(String username,Year year,Month month) {
        if(wasteProductionRepo.existsByUsername(username)){
            return wasteProductionRepo.findByUsernameAndYearAndMonth(username,year,month).stream().mapToDouble(i->i.getCarbon_emissions()).average().getAsDouble();
        }else{
            throw new UsernameNotFoundException("User with username " + username +" not found");
        }
    }

}
