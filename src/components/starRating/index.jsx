import { useState } from "react";
import { FaStar } from 'react-icons/fa'
import './styles.css'

export default function StarRating({starCount=5}) {

    // Clicked star
    const [rating, setRating] = useState(0)
    // Star currently being hovered (or -1)
    const [hover, setHover] = useState(-1)

    return <div className="star-rating">
        {
            [...Array(starCount)].map( (_, index) => {
                return <FaStar 
                    key={index}
                    className={`star ${index > (hover || rating) ? 'blank' : 'full'}` }
                    onClick={ () => setRating(index) }
                    onMouseEnter={ () => setHover(index) }
                    onMouseLeave={ () => setHover(rating) }
                    size={40}
                ></FaStar>
            })
        }

    </div>
}