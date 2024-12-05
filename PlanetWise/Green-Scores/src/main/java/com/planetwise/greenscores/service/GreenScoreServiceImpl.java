package com.planetwise.greenscores.service;

import com.planetwise.greenscores.model.GreenScores;
import com.planetwise.greenscores.repository.GreenScoresRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;

@Service
public class GreenScoreServiceImpl implements GreenScoreService{

    @Autowired
    private GreenScoresRepository greenScoresRepo;


    @Override
    public GreenScores saveGreenScores(GreenScores greenScores) {

        return greenScoresRepo.save(greenScores);
    }

    @Override
    public List<GreenScores> getTrendsForGreenScores(String username) {
        Month startDate = LocalDate.now().minusMonths(10).getMonth();
        return greenScoresRepo.findGreenScoresFromLastTenMonths(username,startDate);
    }
}
