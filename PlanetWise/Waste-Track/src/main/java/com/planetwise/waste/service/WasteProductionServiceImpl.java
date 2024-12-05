package com.planetwise.waste.service;

import com.planetwise.waste.exception.DataAlreadyExistsException;
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


    @Override
    public WasteProduction saveWasteProduction(String username,WasteProduction wasteProduction) {

        if(!wasteProductionRepo.existsByUsernameWastetypeAndMonth(username,wasteProduction.getWaste_type(),wasteProduction.getMonth(),LocalDate.now().getYear())){
            return wasteProductionRepo.save(wasteProduction);
        }
        else{
            throw new DataAlreadyExistsException("Data Already exists");
        }
    }

    @Override
    public List<WasteProduction> getTrendsForWasteProduction(String username) {
        // Calculate the date 10 months ago
        LocalDate now = LocalDate.now();
        LocalDate startDate = now.minusMonths(10);

        // Extract the start month and year
        Month startMonth = startDate.getMonth();
        int startYear = startDate.getYear();  // This gives the year for the start date

        // Call the repository method with both startYear and startMonth
        return wasteProductionRepo.findWasteProductionFromLastTenMonths(username, startYear, startMonth);
    }

}
