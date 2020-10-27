import React from 'react'

const YoutubeContainer = (props) => {
    return (
        <React.Fragment>
            {
                props.id &&
                <iframe
                    width="100%"
                    height="700px"
                    src={`https://www.youtube.com/embed/${props.id}`}
                    frameborder="0"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"></iframe>
            }
        </React.Fragment>
    )
}

export default YoutubeContainer
