import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  findOne: jest.fn((entity) => entity),
  // ...
}));

type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

describe('MoviesService', () => {
  let service: MoviesService;
  let repository: MockType<Repository<Movie>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: getRepositoryToken(Movie),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    repository = module.get(Repository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find a movie', async () => {
    const movie = { id: '2' };
    repository.findOne.mockReturnValue(movie);
    expect(service.findOne('2')).toEqual(movie);
    expect(repository.findOne).toHaveBeenCalledWith(movie.id);
  });
});
