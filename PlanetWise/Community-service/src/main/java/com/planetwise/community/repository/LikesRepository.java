package com.planetwise.community.repository;

import com.planetwise.community.model.Likes;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface LikesRepository extends JpaRepository<Likes, UUID> {

}
