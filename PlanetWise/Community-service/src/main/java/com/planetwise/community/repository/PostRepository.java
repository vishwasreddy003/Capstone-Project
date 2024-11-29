package com.planetwise.community.repository;

import com.planetwise.community.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface PostRepository extends JpaRepository<Post, UUID> {
    List<Post> getByUsername(String username);
}
