'use client';

import './movieDetails.css'

export const MovieDetails = ({movie}) => {
  return (
    <div>
          <div key={movie?.show?.id ?? movie?.id}>
            <div>
              <img
                src={
                  movie?.show?.image?.medium ??
                  movie?.image?.medium ??
                  '/default-image.jpg'
                }
                alt={movie?.show?.name ?? movie?.name ?? 'Default image'}
                layout="responsive"
                width={300}
                height={420}
              />
            </div>
            <div>
              <h2>{movie?.show?.name ?? movie?.name ?? 'No name'}</h2>
              <p>
                <strong>Release Date:</strong>{' '}
                {movie?.show?.premiered ?? movie?.premiered}
              </p>
              <p>
                <strong>Genre:</strong>{' '}
                {movie?.show?.genres?.join(', ') ?? movie?.genres?.join(', ')}
              </p>
              <p>
                <strong>Language:</strong>{' '}
                {movie?.show?.language ?? movie?.language}
              </p>
              <p>
                <strong>Runtime:</strong>{' '}
                {movie?.show?.runtime ?? movie?.runtime}
              </p>
              <p>
                <strong>Rating:</strong>{' '}
                {movie?.show?.rating?.average ?? movie?.rating?.average}
              </p>
            </div>
      </div>
    </div>
  );
};