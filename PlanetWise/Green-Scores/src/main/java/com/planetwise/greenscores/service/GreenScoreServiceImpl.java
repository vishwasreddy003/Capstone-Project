package com.planetwise.greenscores.service;

import com.planetwise.greenscores.calculation.Logic;
import com.planetwise.greenscores.dto.DtoUtil;
import com.planetwise.greenscores.dto.TrendsDto;
import com.planetwise.greenscores.exception.DataNotFoundException;
import com.planetwise.greenscores.feignClient.EnergyServiceClient;
import com.planetwise.greenscores.feignClient.TransportServiceClient;
import com.planetwise.greenscores.feignClient.WasteServiceClient;
import com.planetwise.greenscores.model.GreenScores;
import com.planetwise.greenscores.repository.GreenScoresRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Month;
import java.time.Year;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class GreenScoreServiceImpl implements GreenScoreService {

    private static final Logger log = LoggerFactory.getLogger(GreenScoreServiceImpl.class);
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
    public List<TrendsDto> getTrendsForGreenScores(String username) {
        LocalDate now = LocalDate.now();
        LocalDate startDate = now.minusMonths(12);

        Month startMonth = startDate.getMonth();
        int startYear = startDate.getYear();

        List<Object[]> scoreLogs =
                greenScoresRepo.findGreenScoresFromLastTenMonths(username, Year.of(startYear), startMonth);

        if (scoreLogs.isEmpty()) {
            throw new DataNotFoundException("No transportation data found for user: " + username);
        }

        return scoreLogs.stream()
                .map(result -> {
                    int year = (int) result[0];
                    String monthString = (String) result[1];
                    double carbonEmissions = ((Number) result[2]).doubleValue();

                    Year trendYear = Year.of(year);
                    Month trendMonth = Month.valueOf(monthString.toUpperCase());

                    return new TrendsDto(trendMonth, trendYear, carbonEmissions);
                })
                .collect(Collectors.toList());
    }

    @Override
    public Double calculateGreenScore(HttpServletRequest req, String username, Year yearStr, Month monthStr) {
        String token = String.valueOf(req.getHeaders("Authorization"));
        String authToken = token.substring(7);

        System.out.println(username + " " + yearStr + " " + monthStr);

        double e_emissions = energyServiceClient.getCarbonEmissions(authToken,username, yearStr, monthStr);
        double t_emissions = transportServiceClient.getCarbonEmissions(authToken,username,yearStr,monthStr);
        double w_emissions = wasteServiceClient.getCarbonEmissions(authToken,username,yearStr,monthStr);
        double score = logic.calculate(e_emissions,w_emissions,t_emissions);
        GreenScores newscore = new GreenScores();
        newscore.setUsername(username);
        newscore.setYear(yearStr);
        newscore.setMonth(monthStr);
        newscore.setScore_value(score);
        greenScoresRepo.save(newscore);
        return score;

    }
}
