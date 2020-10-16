// app
import React, { useState, useEffect } from 'react'

// components
import GameWidget from '../../utilities/game-widget/GameWidget';
import LoadingRows from '../../utilities/loading-row/LoadingRow';
import Container from '../../utilities/container/Container';

//data
import BACKUP from '../../constants/Backup.js';
import API from '../../constants/API.js';

const Games = (props) => {
    let pageSize = 9;
    const [isLoading, setIsLoading] = useState(true);
    const [games, setGames] = useState(null);
    const [queryParams, setQueryParams] = useState({
        search: "",
        discover: true,
        ordering: "-relevance",
        page: 1,
        page_size: pageSize
    });

    const getMoreGames = () => {
        let newPage = queryParams.page;
        let newParams = queryParams;
        newParams.page = newPage + 1;
        setQueryParams(newParams);
        getGames();
    }

    const search = (searchValue) => {
        let search = searchValue
        let newParams = {
            search: search,
            discover: true,
            ordering: "-relevance,rating",
            page: 1,
            page_size: pageSize
        }
        setGames(null);
        setQueryParams(newParams);
    }

    const getGames = () => {
        setIsLoading(true);
        if (props.isDashboard) {
            API.GET.GAMES_MAIN(queryParams).then(res => {
                setGames(res.isAxiosError ? BACKUP.GAMES.slice(0, 9) : (games ? [...games, ...res.data.results] : res.data.results));
                setIsLoading(false);
            }).catch((err) => {
                setIsLoading(false);
            });
        } else {
            API.GET.GAMES(queryParams).then(res => {
                setGames(res.isAxiosError ? BACKUP.GAMES.slice(0, 9) : (games ? [...games, ...res.data.results] : res.data.results));
                setIsLoading(false);
            }).catch((err) => {
                setIsLoading(false);
            });
        }
    }

    useEffect(() => {
        getGames();
    }, [queryParams])

    return (
        <Container isDashboard={props.isDashboard} isLoading={isLoading} title="Games" handleShowMore={getMoreGames} handleSearch={search} showFilters={true}>
            <div className="games" style={{ textAlign: 'center' }}>
                {
                    games ?
                        games.map((obj, i) => {
                            return <GameWidget key={i} data={obj} />;
                        }) : <LoadingRows />
                }
            </div>
        </Container>
    )

}

export default Games
