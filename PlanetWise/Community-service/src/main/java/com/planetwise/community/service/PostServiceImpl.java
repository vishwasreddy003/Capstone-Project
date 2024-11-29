package com.planetwise.community.service;

import com.planetwise.community.model.Post;
import com.planetwise.community.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostServiceImpl implements PostService{

    @Autowired
    private PostRepository postRepo;

    @Override
    public Post addPost(Post post) {
        return  postRepo.save(post);
    }

    @Override
    public List<Post> getPostsByUsername(String username) {
        return postRepo.getByUsername(username);
    }

    @Override
    public List<Post> getAllPosts(String username) {
        return postRepo.findAll();
    }
}
