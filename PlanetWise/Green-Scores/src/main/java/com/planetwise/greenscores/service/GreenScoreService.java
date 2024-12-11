package com.planetwise.greenscores.service;

import com.planetwise.greenscores.dto.TrendsDto;
import com.planetwise.greenscores.model.GreenScores;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpRequest;

import java.time.Month;
import java.time.Year;
import java.util.List;

public interface GreenScoreService {

    GreenScores saveGreenScores(GreenScores greenScores);

    List<TrendsDto> getTrendsForGreenScores(String username);

    Double calculateGreenScore(HttpServletRequest req, String username, Year year, Month month);
}
