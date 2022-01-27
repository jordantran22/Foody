import React, { useState, useEffect, useLayoutEffect } from 'react';
import RestaurantReview from './RestaurantReview';
import RestaurantPage from './RestaurantPage';
import { useHistory } from 'react-router';
import { Star } from 'react-star';

const ResturantTab = ({name, phone, address, website, coordinates, restaurant}) => {
    const [resturauntMapUrl, setResturauntMapUrl] = useState('')
    const history = useHistory();
    const [showPostReview, setShowPostReview] = useState(false);
    const [ratings, setRatings] = useState([]);
    
    // const bingMapApiRequest = async () => {
    //     const res = await fetch(`http://dev.virtualearth.net/REST/v1/Imagery/Map/Road/${latitude}, ${longtitude}/16?mapSize=300,300&pp=${latitude}, ${longtitude};47&mapLayer=Basemap,Buildings&key=${BEARER_TOKEN}`)
    //     console.log(res)
    //     const data = await res.url
    //     setResturauntMapUrl(data)
    //     console.log (data)

    // }

    const restaurantRequestInfo = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', },
  }
  

    const restaurantRatingsRequest = async () => {
        // console.log('request sent for ' + name);
      const res = await fetch(`http://localhost:80/api/index.php?action=ratings&restaurantName=${name}&restaurantAddress=${address}`, restaurantRequestInfo)
      const data = await res.json()
   

      if(data.response !== 'No Reviews For This Restaurant!') {
          setRatings(data.response);
        }
      else {
          setRatings([]);
    }
  }

 
    useEffect(() => {
        restaurantRatingsRequest();
    }, [name])

    const onRestaurantTabClicked = () => {
      history.push({
        pathname: "/components/RestaurantPage.js",
        state: {
          restaurantName: name,
          restaurantPhone: phone,
          restaurantAddress: address,
          restaurantWebsite: website,
          restaurantCoords: coordinates
        }
      });
    };


    return (
        <div class="resturaunt-tab-container" onDoubleClick={() => onRestaurantTabClicked()}>


             <img src={resturauntMapUrl} />
             <div className="resturaunt-info">

                <h2>{name} <i class='bx bx-restaurant'></i></h2>
                <h4>{phone} <i class='bx bxs-phone-call' ></i></h4>
                <h4>{address} <i class='bx bxs-map'></i></h4>
                <h4><a href={website} >Website <i class='bx bxs-navigation' ></i></a></h4>
             </div>

             <div>
                 <h2>Ratings!</h2>

                 {ratings.length > 0 ? 

                  <div className="restaurant-ratings">
                      <div className="rating-container">
                          <div className="rating-attribute-title">
                              Deliciousness: 
                          </div>

                          <Star readOnly={true} defaultValue={ratings[0].deliciousness}/>
                      </div>

                      <div className="rating-attribute-title">
                          Service: 
                          <Star readOnly={true} defaultValue={ratings[0].service_score}/>
                      </div>

                      <div className="rating-attribute-title">
                          Experience: 
                          <Star readOnly={true} defaultValue={ratings[0].experience_score}/>
                      </div>

                      <div className="rating-attribute-title">
                          Pricing: 
                          <Star readOnly={true} defaultValue={ratings[0].price_score}/>
                      </div>

                      <div className="rating-attribute-title">
                          Average Money Spent: $
                          {ratings[0].price_value}
                      </div>
                  </div>
                
                 : <div>No reviews for this restaurant!</div>
                }

                <button className="login-form-submit-button" onClick={() => setShowPostReview(!showPostReview)}> {!showPostReview ? 'Post a review' : 'Cancel'}</button>
                {showPostReview && <RestaurantReview
                    restaurantName = { name }
                    restaurantPhone = { phone }
                    restaurantAddress = { address }
                    restaurantWebsite = { website } 
                    ratingsRequest = {() => restaurantRatingsRequest()}
                 />}
             </div>
        

         

        </div>
    )
}

export default ResturantTab
