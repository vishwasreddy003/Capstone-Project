package com.planetwise.rewards.service;

import com.planetwise.rewards.model.Rewards;

import java.util.List;
import java.util.UUID;

public interface RewardsService {

    public Rewards addReward(Rewards reward);

    public void deleteReward(UUID rewardId);

    public List<Rewards> getAllRewards();

    public List<Rewards> getRewardsLessThanFilterPrice(int price);
}
