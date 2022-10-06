import React from 'react'
import Card from './Card';

export default function CardSlider({ title, data}) {
  return (
    <div>
      {data.map((movie, index) => (
        <Card movie={movie} index={index} key={movie.id} />
      ))}
    </div>
  )
}
