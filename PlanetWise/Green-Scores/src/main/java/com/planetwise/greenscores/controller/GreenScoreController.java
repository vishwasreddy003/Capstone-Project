package com.planetwise.greenscores.controller;

import com.planetwise.greenscores.model.GreenScores;
import com.planetwise.greenscores.service.GreenScoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/PlanetWise/greenScore")
public class GreenScoreController {

    @Autowired
    private GreenScoreService greenScoreService;

    @PostMapping("/{username}")
    public ResponseEntity<GreenScores> saveOrUpdateGreenScore(@PathVariable String username,@RequestBody GreenScores greenScores) {
        GreenScores savedScore = greenScoreService.saveGreenScores(greenScores);
        return new ResponseEntity<>(savedScore, HttpStatus.CREATED);
    }

    @GetMapping("/{username}/analytics")
    public ResponseEntity<List<GreenScores>> getAnalyticsForGreenScores(@PathVariable String username) {
        List<GreenScores> scoreTrends = greenScoreService.getTrendsForGreenScores(username);
        return new ResponseEntity<>(scoreTrends, HttpStatus.OK);
    }
}
