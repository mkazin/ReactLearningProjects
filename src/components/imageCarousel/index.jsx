import { useEffect, useState } from "react"
import { BsArrowLeftCircleFill , BsArrowRightCircleFill} from "react-icons/bs"
import "./styles.css"

export default function ImageCarousel({url, limit}) {

    const [images, setImages] = useState([])
    const [currentSlide, setCurrentSlide] = useState(0)
    const [errorMsg, setErrorMsg] = useState(null)
    const [loading, setLoading] = useState(false)

    async function fetchImages(url) {
        try {
            console.log(`Fetching image data from ${url}`)
            setLoading(true)

            const response = await fetch(url)
            const data = await response.json()

            if (data) {
                setImages(data)
                setLoading(false)
            } 
        } catch(e) {
            setErrorMsg(e.message)
            setLoading(false)
        }
    }

    useEffect( () => {
         if (url !== '') fetchImages(url)
    }, [url])

    if (loading) {
        return <div>Loading image data...</div>
    }

    if (errorMsg) {
        return <div>Error loading image data: {errorMsg}</div>
    }
    
    return <div className="container">
        <BsArrowLeftCircleFill 
            className="arrow arrow-left"
            onClick={ () => setCurrentSlide((currentSlide > 0 ? currentSlide : images.length) - 1) }
            />
        {

            images && images.length ?
                images.map( (imageData, index) => {
                    return <img 
                        key={imageData.id}
                        index={index}
                        className={ index !== currentSlide ? "hidden-image" : "current-image" }
                        src={imageData.download_url}
                        alt={imageData.author}
                        >
                    </img>
                    
            })
            : null
        }
        <BsArrowRightCircleFill 
            className="arrow arrow-right"
            onClick={ () => setCurrentSlide(currentSlide >= images.length - 1 ? 0 : currentSlide + 1) }

            />

        <span className="circle-indicators">
            {
                images && images.length ?
                images.map( (_, index) =>
                <button 
                    key={index}
                    className={"circle-indicator " + (index===currentSlide ? "current-indicator" : "")}
                    onClick={ () => setCurrentSlide(index) }
                />
                )

                : null
            }
        </span>
    </div>
}