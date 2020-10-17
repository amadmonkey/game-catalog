import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Time } from '../../img/time.svg';
import Moment from 'react-moment';
import 'moment-timezone';
import './Carousel.scss';

Moment.globalTimezone = 'America/Los_Angeles';

const Carousel = (props) => {


    const pauseLength = 10; // in seconds
    let activeIndex = 1;
    let timeoutId = null;

    const setTimer = () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => { nextItem(); }, pauseLength * 1000);
    }

    const nextItem = () => {
        let indicatorDom = document.querySelector('.indicator .active');
        let carouselItemDoms = document.querySelectorAll('.carousel-item');
        indicatorDom.style.left = (activeIndex * (indicatorDom.clientWidth + 10)) + 'px';
        carouselItemDoms.forEach((element, i) => {
            element.classList.remove('active');
        });
        carouselItemDoms[activeIndex].classList.add('active');
        activeIndex = activeIndex === (carouselItemDoms.length - 1) ? 0 : (activeIndex + 1);
        setTimer();
    }

    const CarouselItem = (obj, i) => {
        return (
            <article key={i} className={"carousel-item " + (i === 0 ? 'active' : '')}>
                <img loading="lazy" src={obj.image.original} alt="" />
                <div className="description">
                    <Link to={{
                        pathname: `/articles/${obj.title.toLowerCase().replaceAll(/ /g, '-')}`,
                        state: { article: obj }
                    }}><h1 className="title">{obj.title}</h1></Link>
                    <p className="summary">{obj.deck}</p>
                    <div className="date">
                        <Time className="time" />
                        <Moment tz="America/Los_Angeles" fromNow>{obj.publish_date}</Moment>
                    </div>
                </div>
            </article>
        )
    }

    const HandleClick = (i) => {
        activeIndex = i;
        nextItem();
    }

    useEffect(() => {
        let container = document.querySelector('.carousel-container');
        setTimer();
        container.addEventListener('mouseenter', clearTimeout(timeoutId));
        container.addEventListener('mouseleave', setTimer);
        return function cleanup() {
            container.removeEventListener('mouseenter', clearTimeout(timeoutId));
            container.removeEventListener('mouseleave', setTimer);
            clearTimeout(timeoutId);
        }
    })


    return (
        <div>
            <div className="carousel-container">
                {props.articles &&
                    <React.Fragment>
                        {props.articles.map((value, i) => {
                            return CarouselItem(value, i)
                        })}
                        <footer className="indicator">
                            <ul>
                                <li className="active"></li>
                                {props.articles.map((value, i) => {
                                    return <li key={i} onClick={(e) => HandleClick(i)}></li>
                                })}
                            </ul>
                        </footer>
                    </React.Fragment>
                }
            </div>
        </div>
    )
}

export default Carousel
