package com.planetwise.rewards.controller;

import com.planetwise.rewards.model.Rewards;
import com.planetwise.rewards.service.RewardsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/rewards")
public class RewardController {

    @Autowired
    private RewardsService rewardsService;

    @PostMapping("/addReward")
    public Rewards addReward(@RequestBody  Rewards reward){
        return rewardsService.addReward(reward);
    }

    @GetMapping
    public List<Rewards> getAllRewards(){
        return  rewardsService.getAllRewards();
    }

    @DeleteMapping("/deleteReward")
    public void deleteReward(UUID rewardId){
        rewardsService.deleteReward(rewardId);
    }

}
