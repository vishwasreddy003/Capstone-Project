package com.planetwise.greenscores.service;

import com.planetwise.greenscores.calculation.Logic;
import com.planetwise.greenscores.feignClient.EnergyServiceClient;
import com.planetwise.greenscores.feignClient.TransportServiceClient;
import com.planetwise.greenscores.feignClient.WasteServiceClient;
import com.planetwise.greenscores.model.GreenScores;
import com.planetwise.greenscores.repository.GreenScoresRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Month;
import java.time.Year;
import java.util.List;

@Service
public class GreenScoreServiceImpl implements GreenScoreService {

    @Autowired
    private GreenScoresRepository greenScoresRepo;

    @Autowired
    private Logic logic;

    @Autowired
    private EnergyServiceClient energyServiceClient;

    @Autowired
    private TransportServiceClient transportServiceClient;

    @Autowired
    private WasteServiceClient wasteServiceClient;

    @Override
    public GreenScores saveGreenScores(GreenScores greenScores) {
        return greenScoresRepo.save(greenScores);
    }

    @Override
    public List<GreenScores> getTrendsForGreenScores(String username) {
        LocalDate now = LocalDate.now();
        LocalDate startDate = now.minusMonths(10);


        Month startMonth = startDate.getMonth();
        int startYear = startDate.getYear();


        return greenScoresRepo.findGreenScoresFromLastTenMonths(username, startYear, startMonth);
    }

    @Override
    public Double calculateGreenScore(HttpServletRequest req, String username, Year year, Month month) {
        String token = String.valueOf(req.getHeaders("Authorization"));
        String authToken = token.substring(7);
        double e_emissions = energyServiceClient.getCarbonEmissions(username,authToken, year, month);
        double t_emissions = transportServiceClient.getCarbonEmissions(username,authToken,year,month);
        double w_emissions = wasteServiceClient.getCarbonEmissions(username,authToken,year,month);
        return logic.calculate();
    }
}
