// app
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// components
import GameWidget from '../../utilities/game-widget/GameWidget';
import LoadingRow from '../../utilities/loading-row/LoadingRow';
import YoutubeContainer from '../../utilities/youtube-container/YoutubeContainer';
import { ReactComponent as Play } from '../../img/play.svg';

// data
import API from '../../constants/API.js';
import ICON from '../../constants/Constants.js';

// styles
import './Game.scss';

const Game = (props) => {
    const gameId = props.match.params.id;
    const history = useHistory();
    const [game, setGame] = useState(null);
    const [screenshots, setScreenshots] = useState(null);
    const [movies, setMovies] = useState(null);
    const [youtubeVideos, setYoutubeMovies] = useState(null);
    const [similarGames, setSimilarGames] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);
    !props.match.params.id && history.push('/games');

    const openVideoModal = (obj) => {
        document.getElementsByTagName("html")[0].style.overflowY = (obj ? 'hidden' : 'auto');
        document.getElementsByClassName("main-header")[0].style.zIndex = (obj ? 2 : 3);
        setSelectedVideo(obj);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        setGame(null);

        const getGame = () => {
            API.GET.GAME({ id: gameId }).then(res => {
                setGame(res.data);
            }).catch((err) => {
            });
        }

        const getScreenshots = () => {
            API.GET.GAME_SCREENSHOTS({ id: gameId }).then(res => {
                setScreenshots(res.data.count ? res.data.results : null);
            }).catch((err) => {
            });
        }

        const getMovies = () => {
            API.GET.GAME_MOVIES({ id: gameId }).then(res => {
                setMovies(res.data.count ? res.data.results : null);
            }).catch((err) => {
            });
        }

        const getSimilarGames = () => {
            API.GET.GAME_SIMILAR_GAMES({ id: gameId }).then(res => {
                setSimilarGames(res.data.count ? res.data.results.slice(0, 6) : null);
            }).catch((err) => {
            });
        }

        const getYoutube = () => {
            API.GET.GAME_DETAILS({ id: gameId, endpoint: "youtube" }).then(res => {
                setYoutubeMovies(res.data.count ? res.data.results : null);
            }).catch((err) => {
            });
        }

        getGame();
        getScreenshots();
        getMovies();
        getYoutube();
        getSimilarGames();

    }, [gameId])

    return (
        <div className="game-container">
            {
                game ?
                    <React.Fragment>
                        <header className="game-header">
                            <button className="back" onClick={(e) => { history.push(`/games`) }}>&lt;</button>
                            <h1 className="name">{game.name}</h1>
                            <ul className="platforms">
                                {ICON.GET_PLATFORMS(game.parent_platforms)}
                            </ul>
                            <img loading="lazy" src={game.background_image} />
                            <button className="header-collapse" onClick={(e) => document.querySelector('.game-header').classList.toggle('active')}><span>^</span></button>
                        </header>
                        <div className="body">
                            <div className="details">
                                <div className="details-description">
                                    <h1>About</h1>
                                    <p dangerouslySetInnerHTML={{ __html: game.description }}></p>
                                </div>

                                <div className="details-card">
                                    <div className="details-card-section">
                                        <h1>Publishers</h1>
                                        <p>
                                            {
                                                game.publishers.map((obj, i) => {
                                                    return (obj.name + ", ")
                                                })
                                            }
                                        </p>
                                    </div>
                                    <div className="details-card-section">
                                        <h1>Developers</h1>
                                        <p>
                                            {
                                                game.developers.map((obj, i) => {
                                                    return (obj.name + ", ")
                                                })
                                            }
                                        </p>
                                    </div>
                                    <div className="details-card-section">
                                        <h1>Rating</h1>
                                        <p>{game.rating}</p>
                                    </div>
                                    {
                                        game.esrb_rating &&
                                        <div className="details-card-section">
                                            <h1>ESRB Rating</h1>
                                            <p>{game.esrb_rating.name}</p>
                                        </div>
                                    }
                                    {
                                        game.metacritic &&
                                        <div className="details-card-section">
                                            <h1>Metacritic</h1>
                                            <p>{game.metacritic}</p>
                                        </div>
                                    }
                                    <div className="details-card-section">
                                        <h1>Official Website</h1>
                                        <a href={game.website}>{game.website}</a>
                                    </div>
                                    {
                                        game.reddit_url &&
                                        <div className="details-card-section">
                                            <h1>Reddit</h1>
                                            <a href={game.reddit_url}>{game.reddit_url}</a>
                                        </div>
                                    }
                                    <div className="details-card-section">
                                        <h1>Stores</h1>
                                        <ul>
                                            {ICON.GET_STORES(game.stores)}
                                        </ul>
                                    </div>
                                    <div className="details-card-section">
                                        <h1>Genres</h1>
                                        <div className="tag-container">
                                            {
                                                game.genres.map((obj, i) => {
                                                    return <span className="tag" key={i}>{obj.name}</span>
                                                })
                                            }
                                        </div>
                                    </div>
                                    <div className="details-card-section">
                                        <h1>Tags</h1>
                                        <div className="tag-container">
                                            {
                                                game.tags.map((obj, i) => {
                                                    return <span className="tag" key={i}>{obj.name}</span>
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                screenshots &&
                                <div className="additional-section screenshots">
                                    <h1>Screenshots</h1>
                                    <ul>
                                        {
                                            screenshots.map((obj, i) => {
                                                return <li key={i}><img loading="lazy" src={obj.image} /></li>
                                            })
                                        }
                                    </ul>
                                </div>
                            }
                            {
                                movies &&
                                <div className="additional-section videos">
                                    <h1>Videos</h1>
                                    <ul>
                                        {
                                            movies.map((obj, i) => {
                                                return (
                                                    <li className="video-item" onClick={(e) => openVideoModal({ data: obj.data.max })} key={i}>
                                                        <img loading="lazy" src={obj.preview} />
                                                        <Play />
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            }
                            {
                                youtubeVideos &&
                                <div className="additional-section videos">
                                    <h1>Youtube Videos</h1>
                                    <ul>
                                        {
                                            youtubeVideos.map((obj, i) => {
                                                return (
                                                    <li className="video-item" onClick={(e) => openVideoModal({ id: obj.external_id })} key={i}>
                                                        <img loading="lazy" src={obj.thumbnails.medium.url} />
                                                        <Play />
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            }
                            {
                                similarGames &&
                                <div className="additional-section similar-games">
                                    <h1>Similar Games</h1>
                                    <div style={{ textAlign: "center" }}>
                                        {
                                            similarGames.map((obj, i) => {
                                                return <GameWidget key={i} data={obj} />
                                            })
                                        }
                                    </div>
                                </div>
                            }
                        </div>
                        <div className={`video-modal ${selectedVideo ? 'active' : ''}`} onClick={(e) => openVideoModal(null)}>
                            <div className="content video-modal-content">
                                {
                                    selectedVideo &&
                                    <React.Fragment>
                                        {selectedVideo.data && <video src={selectedVideo.data} controls>Your browser does not support the video tag.</video>}
                                        {selectedVideo.id && <YoutubeContainer id={selectedVideo.id} />}
                                    </React.Fragment>
                                }
                            </div>
                        </div>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <LoadingRow />
                        <LoadingRow />
                        <LoadingRow />
                        <LoadingRow />
                        <LoadingRow />
                    </React.Fragment>
            }
            {/* <pre>{JSON.stringify(youtubeVideos, '-', 5)}</pre> */}
        </div>
    )
}

export default Game
