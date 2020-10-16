// app
import React, { useState, useEffect } from 'react';
import Moment from 'react-moment';
import moment from 'moment';
import 'moment-timezone';

// components
import Carousel from '../carousel/Carousel';
import { DashboardContainer, ReviewWidget } from '../../utilities';
import LoadingRows from '../../utilities/loading-row/LoadingRow';
import Articles from '../../components/articles/Articles';
import Reviews from '../../components/reviews/Reviews';
import Games from '../../components/games/Games';

// data
import BACKUP from '../../constants/Backup.js';
import API from '../../constants/API.js';

// styles
import './Home.scss';
import '../articles/Articles.scss';

Moment.globalTimezone = 'America/Los_Angeles';

const Home = () => {
    const [articles, setArticles] = useState(null);
    const [upcomingGames, setUpcomingGames] = useState(null);
    const [reviews, setReviews] = useState(null);

    const getArticles = (articles) => {
        setArticles(articles);
    }

    useEffect(() => {
        let format = "YYYY-MM-DD";
        API.GET.GAMES({
            discover: true,
            page: 1,
            page_size: 10,
            ordering: "-rating",
            dates: moment().subtract(1, "months").format(format) + "," + moment().format(format)
        }).then(res => {
            setUpcomingGames(res.isAxiosError ? BACKUP.GAMES : res.data.results);
        })

    }, []);

    const TopUpcomingGames = () => {
        return (
            <div className="upcoming-games">
                <header>
                    <h1>Top rated for the past month</h1>
                </header>
                <div className="upcoming-games-content">
                    {/* {upcomingGames ? TopUpcomingGames() : <LoadingRows />} */}
                    {upcomingGames.map((obj, i) => {
                        return (
                            <div key={i} style={{ display: 'flex' }}>
                                <h1>{i + 1}</h1>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
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

    return (
        <section>
            <DashboardContainer title={{ name: "Latest Articles", link: "/articles" }}>
                <Carousel articles={articles} />
                <div className="articles-container">
                    <Articles isDashboard={true} setArticles={getArticles} />
                    {upcomingGames ? TopUpcomingGames() : <LoadingRows />}
                </div>
            </DashboardContainer>
            <DashboardContainer title={{ name: "Recent Reviews", link: "/reviews" }}>
                <Reviews isDashboard={true} />
            </DashboardContainer>
            <DashboardContainer title={{ name: "New and trending", link: "/games" }}>
                <Games isDashboard={true} />
            </DashboardContainer>
        </section >
    )
}

export default Home
