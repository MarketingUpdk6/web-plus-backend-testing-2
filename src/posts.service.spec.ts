import { beforeEach, describe, expect, it } from '@jest/globals';
import { Post, PostsService } from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;

  beforeEach(() => {
    postsService = new PostsService();
  });

  describe('.findMany', () => {
    let createdPosts: Post[];
    const posts = [
      {text: 'Post 1'},
      {text: 'Post 2'},
      {text: 'Post 3'},
      {text: 'Post 4'},
    ];

    beforeEach(() => {
      createdPosts = posts.map((post) => postsService.create(post));
    });

    it('should return all posts if called without options', () => {
      expect(postsService.findMany()).toEqual(createdPosts);
    });

    it('should return correct posts for skip and limit options', () => {
      expect(postsService.findMany({ skip: 1, limit: 2 })).toEqual([
        createdPosts[1],
        createdPosts[2],
      ]);
    });

    it('should return correct posts for skip option', () => {
      expect(postsService.findMany({ skip: 2 })).toEqual([
        createdPosts[2],
        createdPosts[3],
      ]);
    });

    it('should return correct posts for limit option', () => {
      expect(postsService.findMany({ limit: 2 })).toEqual([
        createdPosts[0],
        createdPosts[1],
      ]);
    });
  });
});