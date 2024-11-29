package com.planetwise.rewards.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Rewards {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID rewardId;
    @Column(unique = true)
    private String reward_title;
    private String brand_name;
    private int redeem_cost;
}
