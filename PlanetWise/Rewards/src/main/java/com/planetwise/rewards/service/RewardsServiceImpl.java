package com.planetwise.rewards.service;


import com.planetwise.rewards.exception.RewardDoesNotExistException;
import com.planetwise.rewards.model.Rewards;
import com.planetwise.rewards.repository.RewardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class RewardsServiceImpl implements RewardsService {

    @Autowired
    private RewardRepository rewardRepo;

    @Override
    public Rewards addReward(Rewards reward) {
        if(rewardRepo.findByRewardTitle(reward.getReward_title()) != null){
            throw new RuntimeException("Reward Also Exists");
        }
        return rewardRepo.save(reward);
    }

    @Override
    public void deleteReward(UUID rewardId) {

        if(rewardRepo.existsById(rewardId)){
            rewardRepo.deleteById(rewardId);
        }else {
            throw new RewardDoesNotExistException("Reward Does not exist");
        }
    }

    @Override
    public List<Rewards> getAllRewards() {
        return rewardRepo.findAll();
    }

    @Override
    public List<Rewards> getRewardsLessThanFilterPrice(int price) {
        return rewardRepo.findRewardsLessThanPrice(price);
    }
}
