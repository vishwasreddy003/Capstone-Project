package com.planetwise.greenscores.service;

import com.planetwise.greenscores.model.GreenScores;

import java.util.List;

public interface GreenScoreService {

    GreenScores saveGreenScores(GreenScores greenScores);

    List<GreenScores> getTrendsForGreenScores(String username);

}
