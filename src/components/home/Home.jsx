import React, { useState, useEffect } from 'react';
import TimeAgo from 'react-timeago';
import Carousel from '../carousel/Carousel';
import { DashboardContainer, GameWidget, ReviewWidget } from '../../utilities';
import { ReactComponent as Time } from '../../img/time.svg';
import LoadingGrid from '../../utilities/loading-grid/LoadingGrid';
import LoadingRows from '../../utilities/loading-row/LoadingRow';

import BACKUP from '../../constants/Backup.js';
import API from '../../constants/API.js';

import './Home.scss';

const Home = () => {
    const [articles, setArticles] = useState(null);
    const [games, setGames] = useState(null);
    const [upcomingGames, setUpcomingGames] = useState(null);
    const [reviews, setReviews] = useState(null);

    useEffect(() => {

        API.GET.ARTICLES({
            sort: 'publish_date:desc',
            limit: 10
        }).then(res => {
            setArticles(res.isAxiosError ? BACKUP.ARTICLES : res.data.results);
        })

        API.GET.GAMES({
            dates: '2018-10-22,2019-10-22',
            page_size: 9
        }).then(res => {
            setGames(res.isAxiosError ? BACKUP.GAMES.slice(0, 9) : res.data.results);
        })

        API.GET.GAMES({
            dates: '2019-09-22,2020-10-22',
            page_size: 10
        }).then(res => {
            setUpcomingGames(res.isAxiosError ? BACKUP.GAMES : res.data.results);
        })

        API.GET.REVIEWS({
            sort: 'publish_date:desc',
            limit: 3
        }).then(res => {
            setReviews(res.isAxiosError ? BACKUP.REVIEWS : res.data.results);
        })

    }, []);



    const OtherArticles = () => {
        return (
            <div className="other-articles">
                {
                    articles.slice(5, 10).map((obj, i) => {
                        return (
                            <article key={i} className="other-articles-item">
                                <div className="image">
                                    <img src={obj.image.original} alt="" />
                                </div>
                                <div className="text">
                                    <h1 className="title">{obj.title}</h1>
                                    <p className="summary">{obj.deck}</p>
                                    <div className="date">
                                        <Time className="time" />
                                        <TimeAgo date={obj.publish_date} />
                                    </div>
                                </div>
                            </article>
                        )
                    })
                }
                <button>View More</button>
            </div>
        )
    }

    const TopUpcomingGames = () => {
        return (
            <div className="upcoming-games">
                <header>
                    <h1>Top Upcoming Games</h1>
                </header>
                <div className="upcoming-games-content">
                    {/* {upcomingGames ? TopUpcomingGames() : <LoadingRows />} */}
                    {upcomingGames.map((obj, i) => {
                        return (
                            <div key={i} style={{ display: 'flex' }}>
                                <h1>{i + 1}</h1>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    {/* <img src={obj.background_image} alt="" /> */}
                                    <div>
                                        <h1 className="title">{obj.name}</h1>
                                        <span className="date">{obj.released}</span>
                                    </div>

                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }

    const RecentReviews = ({ title }) => {
        return (
            <div style={{ textAlign: 'center' }}>
                {reviews.map((obj, i) => {
                    return <ReviewWidget key={i} data={obj} container={title} />;
                })}
                <button>View More</button>
            </div>
        )
    }

    const NewGames = ({ title }) => {
        return (
            <div style={{ textAlign: 'center' }}>
                {games.map((obj, i) => {
                    return <GameWidget key={i} data={obj} container={title} />;
                })}
                <button>View More</button>
            </div>
        )
    }

    return (
        <section>
            <DashboardContainer>
                <Carousel articles={articles} />
                <div className="other-articles-container">
                    {articles ? OtherArticles() : <LoadingRows />}
                    {upcomingGames ? TopUpcomingGames() : <LoadingRows />}
                </div>
            </DashboardContainer>
            <DashboardContainer title="Recent Reviews">
                {reviews ? RecentReviews({ title: 'Recent Reviews' }) : <LoadingGrid />}
            </DashboardContainer>
            <DashboardContainer title="New Games">
                {games ? NewGames({ title: 'New Games' }) : <LoadingGrid />}
            </DashboardContainer>
        </section >
    )
}

export default Home
