import { Star } from 'react-star';
import { useEffect, useState, useRef } from 'react';
import ModalImage from "react-modal-image";

const UserReview = ({username, textReview, date, deliciousness, experience, pricingScore, pricingValue, service, reviewId, getReviews}) => {
    const [reviewLikes, setReviewLikes] = useState(0);
    const [reviewImages, setReviewImages] = useState([]);
    const [isReviewActive, setReviewStatus] = useState(true);

    const likeReviewInformation = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          url: '/review/like',
          reviewId: reviewId,
          username: localStorage.getItem('username')
        }),
    }

    console.log(localStorage.getItem('username'));

    const likeReviewRequest = async() => {
        const res = await fetch(`http://localhost:80/api/index.php`, likeReviewInformation)
        console.log(res);
        const data = await res.json()
        console.log(data);
        setReviewLikes(data.response[0].likes);
    }

    const reviewInformation = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }
    }

    const getReviewLikes = async() => {
        const res = await fetch(`http://localhost:80/api/index.php?action=getLikes&reviewId=${reviewId}`, reviewInformation)
        console.log(res);
        const data = await res.json()
        console.log(data);

        setReviewLikes(data.response[0].likes);
    }

    const getReviewImages = async () => {
        const res = await fetch(`http://localhost:80/api/index.php?action=getImages&reviewId=${reviewId}`, reviewInformation);
        const data = await res.json();


        console.log("TESTING START");
        if(data['response'] !== 'No images for this review') {
            setReviewImages(data['response']);
        }
        
        console.log(reviewImages);
        console.log("TESTING END");
    }

    useEffect(() => {
        try {
            getReviewLikes();
            getReviewImages();
        } catch (e) {
            console.log(e);
        }
    }, [])

    useEffect(() => {
        console.log("refreshing images; image count: " + reviewImages.length);
    }, [reviewImages]);

    
    const deleteReviewInfo = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          url: '/review/delete',
          reviewId: reviewId,
          username: localStorage.getItem('username')
        }),
    }

    const deleteUserReview = async() => {
        const res = await fetch(`http://localhost:80/api/index.php`, deleteReviewInfo);
        console.log(res);
        const data = await res.json();
        console.log(data);
        setReviewStatus(false);
       // const data = await res.json();
        getReviews();
    }

    return (
        <div className="user-review-container">
            {
                isReviewActive ? 
                <div>
                     <div className="username-and-date">
                <div className="user-review-username">
                        {username}
                </div>

                <div className="review-date">
                        {date}
                </div>

               {localStorage.getItem('username') === username ? <div className="delete-button" onClick={() => deleteUserReview()}>X</div> : <div></div>} 
            </div>


            <div className="text-review">
                {textReview}
            </div>

            <div>
                <div className="rating-container">
                    <div className="rating-attribute-title">
                        Deliciousness: 
                    </div>

                    <Star readOnly={true} defaultValue={deliciousness}/>
                </div>

                <div className="rating-attribute-title">
                    Service: 
                    <Star readOnly={true} defaultValue={service}/>
                </div>

                <div className="rating-attribute-title">
                    Experience: 
                    <Star readOnly={true} defaultValue={experience}/>
                </div>

                <div className="rating-attribute-title">
                    Pricing: 
                    <Star readOnly={true} defaultValue={pricingScore}/>
                </div>

                <div className="rating-attribute-title">
                    Money Spent: $
                    {pricingValue}
                </div>
                <div className="rating-attribute-title">
                    {/* <button onClick={() => getReviewImages()}>test</button> */}
                    {reviewImages.length > 0 && (
                    <div className="image-preview-container">
                        {reviewImages.map((img) =>
                        <ModalImage
                            small={img.image_encoded}
                            large={img.image_encoded}
                            alt={img.image_name}
                            hideZoom={true}
                            showRotate={false}
                        />
                        )}
                    </div>
                    )}
                </div>
            </div>


            <div className="like-dislike-buttons">
                {reviewLikes}
            <i className='bx bx-like like-button' onClick={() => likeReviewRequest()}></i>
            </div>
                </div>
                : <h2>Your Review Deleted!</h2>
            }
           
        </div>
    )
}

export default UserReview
