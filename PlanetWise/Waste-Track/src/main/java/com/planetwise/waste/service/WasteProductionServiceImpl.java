package com.planetwise.waste.service;

import com.planetwise.waste.exception.DataAlreadyExistsException;
import com.planetwise.waste.model.WasteProduction;
import com.planetwise.waste.repository.WasteProductionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;

@Service
public class WasteProductionServiceImpl implements WasteProductionService{

    @Autowired
    private WasteProductionRepository wasteProductionRepo;


    @Override
    public WasteProduction saveWasteProduction(String username,WasteProduction wasteProduction) {

        if(!wasteProductionRepo.existsByUsernameWastetypeAndMonth(username,wasteProduction.getWaste_type(),wasteProduction.getMonth())){
            return wasteProductionRepo.save(wasteProduction);
        }
        else{
            throw new DataAlreadyExistsException("Data Already exists");
        }
    }

    @Override
    public List<WasteProduction> getTrendsForWasteProduction(String username) {
        Month startDate = LocalDate.now().minusMonths(10).getMonth();
        return wasteProductionRepo.findWasteProductionFromLastTenMonths(username,startDate);
    }
}
