package com.planetwise.greenscores.controller;

import com.planetwise.greenscores.dto.TrendsDto;
import com.planetwise.greenscores.model.GreenScores;
import com.planetwise.greenscores.service.GreenScoreService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.swing.tree.TreeNode;
import java.util.List;

@RestController
@RequestMapping("/PlanetWise/greenScore")
public class GreenScoreController {

    @Autowired
    private GreenScoreService greenScoreService;

    @PostMapping("/{username}")
    public ResponseEntity<GreenScores> saveOrUpdateGreenScore(@PathVariable String username,@RequestBody GreenScores greenScores) {
        greenScores.setUsername(username);
        GreenScores savedScore = greenScoreService.saveGreenScores(greenScores);
        return new ResponseEntity<>(savedScore, HttpStatus.CREATED);
    }

    @GetMapping("/{username}/analytics")
    public ResponseEntity<List<TrendsDto>> getAnalyticsForGreenScores(@PathVariable String username) {
        List<TrendsDto> scoreTrends = greenScoreService.getTrendsForGreenScores(username);
        return new ResponseEntity<>(scoreTrends, HttpStatus.OK);
    }

    @GetMapping("/{username}/calculate")
    public ResponseEntity<Double> calculateGreenScore(@PathVariable String username, @RequestBody GreenScores greenScores, HttpServletRequest req){

        Double greenScore = greenScoreService.calculateGreenScore(req,username,greenScores.getYear(),greenScores.getMonth());
        return new ResponseEntity<>(greenScore,HttpStatus.OK);
    }
}
