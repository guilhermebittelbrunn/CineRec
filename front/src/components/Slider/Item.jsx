import React, { useEffect } from 'react';
import cx from 'classnames';
import SliderContext from './context'
import './Item.scss'

export default function  Item({ movie, setModalSettings }){
  
  const main = document.getElementById('main-home');
  const cardWitdh = main.offsetWidth > 500 ? '0 0 17.7%' : '0 0 27.0%'
  
  return (
    <SliderContext.Consumer>
      {({ currentSlide, elementRef }) => {
        const isActive = currentSlide && currentSlide.id === movie.id;

        return (
          <div
            ref={elementRef}
            onClick={() => setModalSettings({id: movie.id, status:true})}
            className={cx('item', {
              'item--open': isActive,
            })}
            style={{position: 'relative', flex: cardWitdh}}
          >
            {/* <img src={'https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg'} alt={movie.title}/> */}
            <img src={movie.image} alt={movie.title}/>
            {/* <span className='absolute bottom-0 left-0 text-center w-full'>
              {movie.title}
            </span> */}
          </div>
        );
      }}
    </SliderContext.Consumer>
  )
}

