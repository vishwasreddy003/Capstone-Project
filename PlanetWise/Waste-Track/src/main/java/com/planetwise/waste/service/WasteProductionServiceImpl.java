package com.planetwise.waste.service;

import com.planetwise.waste.calculation.CarbonEmissionCalculation;
import com.planetwise.waste.dto.TrendsDto;
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
import java.util.Map;
import java.util.stream.Collectors;

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
    public List<TrendsDto> getTrendsForWasteProduction(String username) {
        LocalDate now = LocalDate.now();
        LocalDate startDate = now.minusMonths(12);


        Month startMonth = startDate.getMonth();
        int startYear = startDate.getYear();
        Year y = Year.of(startYear);


        List<WasteProduction> wasteProductions = wasteProductionRepo.findWasteProductionFromLastTenMonths(username, y, startMonth);

        // Group by month and year, and sum up carbon emissions
        Map<String, Double> aggregatedData = wasteProductions.stream()
                .collect(Collectors.groupingBy(
                        // Group by a composite key of year and month
                        wp -> wp.getYear() + "-" + wp.getMonth(),
                        // Summing the carbon emissions for each group
                        Collectors.summingDouble(WasteProduction::getCarbon_emissions)
                ));

        // Convert the aggregated data to TrendsDto
        return aggregatedData.entrySet().stream()
                .map(entry -> {
                    String[] yearMonth = entry.getKey().split("-");
                    Year year = Year.of(Integer.parseInt(yearMonth[0]));
                    Month month = Month.valueOf(yearMonth[1].toUpperCase());
                    double carbonEmissions = entry.getValue();

                    return new TrendsDto(month, year, carbonEmissions);
                })
                .collect(Collectors.toList());
    }

    @Override
    public Double getCarbonEmissions(String username,Year year,Month month) {
        if(wasteProductionRepo.existsByUsername(username)){
            return wasteProductionRepo.findByUsernameAndYearAndMonth(username,year,month).stream().mapToDouble(i->i.getCarbon_emissions()).average().getAsDouble();
        }else{
            throw new UsernameNotFoundException("User with username " + username +" not found");
        }
    }

    @Override
    public Double getLatestCarbonEmissions(String username) {
//        if(wasteProductionRepo.existsByUsername(username)){
//            return wasteProductionRepo.getLatestData(username).stream().mapToDouble(i->i.getCarbon_emissions()).average().getAsDouble();
//        }else{
//            throw new UsernameNotFoundException("User with username " + username +" not found");
//        }
        return  0.0d;
    }

}
