import React from 'react';
import Slider from 'react-slick';
import Nalumcard from './Nalumcard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Nota = ({ people }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 625,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // 3 seconds
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="p-4 w-full max-w-screen-lg mx-auto">
      <Slider {...settings}>
        {people.map((person, index) => (
          <div key={index} className="p-2">
            <Nalumcard name={person.name} imageFileName={person.imageFileName} year={person.year} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Nota;