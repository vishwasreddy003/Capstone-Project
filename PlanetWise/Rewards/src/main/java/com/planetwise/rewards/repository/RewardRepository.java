package com.planetwise.rewards.repository;

import com.planetwise.rewards.model.Rewards;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface RewardRepository extends JpaRepository<Rewards, UUID> {

    @Query("SELECT r FROM Rewards r WHERE r.redeem_cost < :price")
    List<Rewards> findRewardsLessThanPrice(int price);

    @Query("SELECT r FROM Rewards r WHERE r.reward_title = :title")
    Rewards findByRewardTitle(String title);
}
