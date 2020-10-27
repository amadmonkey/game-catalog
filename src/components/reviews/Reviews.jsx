// app
import React, { useState, useEffect } from 'react';

// components
import Container from '../../utilities/container/Container';
import ReviewWidget from '../../utilities/review-widget/ReviewWidget';
import LoadingRows from '../../utilities/loading-row/LoadingRow';
import { ModalProvider } from "../../utilities/modal/ModalContext";

// data
import BACKUP from '../../constants/Backup.js';
import API from '../../constants/API.js';

// styles
import './Reviews.scss';

const Reviews = (props) => {
    let pageSize = 9;

    const [isLoading, setIsLoading] = useState(true);
    const [reviews, setReviews] = useState(null);
    const [queryParams, setQueryParams] = useState({
        page: 1,
        sort: 'publish_date:desc',
        limit: props.isDashboard ? 3 : pageSize,
    });

    const getMoreReviews = () => {
        setQueryParams({ ...queryParams, page: queryParams.page + 1 });
    }

    const search = (searchValue) => {
        let search = searchValue
        let newParams = {
            filter: `title:${search}`,
            page: 1,
            sort: 'publish_date:desc',
            limit: props.isDashboard ? 3 : pageSize,
        }
        setReviews(null);
        setQueryParams(newParams);
    }

    useEffect(() => {
        setIsLoading(true);
        API.GET.REVIEWS(queryParams).then(res => {
            let results = props.isDashboard ? res.data.results : (reviews ? [...reviews, ...res.data.results] : res.data.results);
            setReviews(res.isAxiosError ? BACKUP.REVIEWS : results);
            setIsLoading(false);
        }).catch(() => {
            setIsLoading(false);
        })
    }, [queryParams])

    return (
        <Container isDashboard={props.isDashboard} isLoading={isLoading} title="Latest Reviews" handleShowMore={getMoreReviews} handleSearch={search} showFilters={true}>
            <div className="reviews" style={{ textAlign: 'center' }}>
                <ModalProvider>
                    {
                        reviews ?
                            reviews.map((obj, i) => {
                                return <ReviewWidget key={i} data={obj} component={i} />;
                            })
                            : <LoadingRows />
                    }
                </ModalProvider>
            </div>
        </Container>
    )
}

export default Reviews
