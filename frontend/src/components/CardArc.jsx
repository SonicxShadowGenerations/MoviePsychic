// CardArc.jsx
import React from 'react';
import MovieCard from './MovieCard';

export default function CardArc({ onProject, onPick }) {
  const movies = [
    { title: 'Inception', image: '/images/inception.jpg' },
    { title: 'Interstellar', image: '/images/interstellar.jpg' },
    { title: 'Tenet', image: '/images/tenet.jpg' },
    { title: 'Dune', image: '/images/dune.jpg' },
    { title: 'Matrix', image: '/images/matrix.jpg' },
  ];

  const total = movies.length;
  const middleIndex = Math.floor(total / 2);

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        height: '300px',
        gap: '25px',
        perspective: '1000px',
        zIndex: 3,
        transform: 'translateY(-140px)',
      }}
    >
      {movies.map((m, i) => {
        const offset = i - middleIndex;
        const rotate = offset * 6;
        const translateY = Math.pow(Math.abs(offset), 1.4) * 8 + 5;

        return (
          <div
            key={m.title}
            style={{
              transform: `rotate(${rotate}deg) translateY(${translateY}px)`,
              transformOrigin: 'center top',
              transition: 'transform 0.5s ease',
            }}
          >
            <MovieCard
              title={m.title}
              image={m.image}
              onProject={onProject}
              onPick={onPick}     
            />
          </div>
        );
      })}
    </div>
  );
}
