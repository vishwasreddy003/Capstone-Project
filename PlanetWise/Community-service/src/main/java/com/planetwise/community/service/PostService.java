package com.planetwise.community.service;

import com.planetwise.community.model.Post;

import java.util.List;

public interface PostService {
    public Post addPost(Post post);

    public List<Post> getPostsByUsername(String username);

    public List<Post> getAllPosts(String username);
}
