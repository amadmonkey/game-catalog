// app
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import 'moment-timezone';
import { ReactComponent as Time } from '../../img/time.svg';

// components
import LoadingRows from '../../utilities/loading-row/LoadingRow';
import Container from '../../utilities/container/Container';
import { ModalProvider } from "../../utilities/modal/ModalContext";

// data
import BACKUP from '../../constants/Backup.js';
import API from '../../constants/API.js';

// styles
import './Articles.scss';

const Articles = (props) => {
    let pageSize = 20;
    const [isLoading, setIsLoading] = useState(true);
    const [articles, setArticles] = useState(null);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [queryParams, setQueryParams] = useState({
        page: 1,
        sort: 'publish_date:desc',
        limit: props.isDashboard ? 15 : pageSize,
    });

    const getMoreArticles = () => {
        setQueryParams({ ...queryParams, page: queryParams.page + 1 });
    }

    const search = (searchValue) => {
        let search = searchValue
        let newParams = {
            filter: `title:${search}`,
            page: 1,
            sort: 'publish_date:desc',
            limit: props.isDashboard ? 15 : pageSize,
        }
        setArticles(null);
        setQueryParams(newParams);
    }


    const updateModal = (article) => {
        document.getElementsByTagName("html")[0].style.overflowY = (article ? 'hidden' : 'auto');
        document.getElementsByClassName("main-header")[0].style.zIndex = (article ? 2 : 3);
        setSelectedArticle(article);
    }

    useEffect(() => {
        setIsLoading(true);
        API.GET.ARTICLES(queryParams).then(res => {
            setIsLoading(false);
            let results = props.isDashboard ? res.data.results : (articles ? [...articles, ...res.data.results] : res.data.results);
            setArticles(res.isAxiosError ? BACKUP.ARTICLES : results);
            if (props.isDashboard) {
                props.setArticles(results.slice(0, 10));
            }
            props.location && updateModal(props.location.state.article);
        }).catch((err) => {
            setIsLoading(false);
        });
    }, [queryParams, props])

    useEffect(() => {
        let container = document.querySelector('.articles-modal');
        let modalClick = (e) => {
            let path = e.path[0];
            if (path.className.search('articles-modal') >= 0) {
                updateModal(null);
            } else if (path.className.search('pinbox__hide-link') >= 0) {
                let nodes = document.getElementsByClassName('hide');
                for (var x = 0; x < nodes.length; x++) {
                    nodes.item(x).classList.remove('hide');
                }
                path.classList.add('hide');
            }
        }
        container.addEventListener("click", modalClick);
        return function cleanUp() {
            container.removeEventListener("click", modalClick);
        }
    }, [])

    return (
        <Container isDashboard={props.isDashboard} isLoading={isLoading} title="Latest Articles" handleShowMore={getMoreArticles} handleSearch={search} showFilters={true}>
            <div className="articles">
                <ModalProvider>
                    {
                        articles ?
                            articles.length ?
                                articles.slice(props.isDashboard ? 10 : 0, props.isDashboard ? 15 : articles.length).map((obj, i) => {
                                    return (
                                        <article key={i} className="articles-item">
                                            <div className="image">
                                                <img loading="lazy" src={obj.image.screen_tiny} alt="" />
                                            </div>
                                            <div className="description">
                                                {
                                                    props.isDashboard ?
                                                        <Link to={{
                                                            pathname: `/articles/${obj.title.toLowerCase().replaceAll(/ /g, '-')}/${obj.id}`,
                                                            state: { article: obj }
                                                        }}><h1 className="title">{obj.title}</h1></Link> :
                                                        <h1 className="title" onClick={(e) => updateModal(obj)}>{obj.title}</h1>
                                                }
                                                <h2>By {obj.authors}</h2>
                                                <p className="summary">{obj.deck}</p>
                                                <div className="date">
                                                    <Time className="time" />
                                                    <Moment tz="America/Los_Angeles" fromNow>{obj.publish_date}</Moment>
                                                </div>
                                            </div>
                                        </article>
                                    )
                                })
                                : <span className="no-results-found">No results found</span>
                            : <LoadingRows />
                    }
                </ModalProvider>
            </div>
            <div className={`articles-modal${!selectedArticle ? ' hidden' : ''}`}>
                <button onClick={(e) => updateModal(null)}>X</button>
                <div className="content">
                    <div className="image">
                        <img loading="lazy" src={selectedArticle && selectedArticle.image.original} alt="" />
                    </div>
                    <div className="description">
                        <header>
                            <h1 className="title">{selectedArticle && selectedArticle.title}</h1>
                            <h2>By {selectedArticle && selectedArticle.authors} on {}</h2>
                            <div className="date">
                                <Time className="time" />
                                <Moment tz="America/Los_Angeles" fromNow>{selectedArticle && selectedArticle.publish_date}</Moment>
                            </div>
                        </header>
                        <div className="modal-body" dangerouslySetInnerHTML={{ __html: selectedArticle && selectedArticle.body }}></div>
                    </div>
                </div>
                <footer>
                    <span className="to-gamespot">Click <a target="_blank" rel="norefferer noopener" href={selectedArticle && selectedArticle.site_detail_url}>here</a> to view original article</span>
                </footer>
            </div>
        </Container >
    )
}

export default Articles
