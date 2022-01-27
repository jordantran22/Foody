import { useState, useRef } from 'react';
import { Star } from 'react-star';
import FileBase64 from 'react-file-base64';

const RestaurantReview = ({
  restaurantName,
  restaurantPhone,
  restaurantAddress,
  restaurantWebsite,
  ratingsRequest
}) => {
  const [textReview, setTextReview] = useState('');
  const [deliciousnessScore, setDeliciousnessScore] = useState(0);
  const [serviceScore, setServiceScore] = useState(0);
  const [experienceScore, setExperienceScore] = useState(0);
  const [pricingScore, setPricingScore] = useState(0);
  const [pricingValue, setPricingValue] = useState(0);
  const [images, setImages] = useState([]);
  const [textAreaStatus, changeTextAreaStatus] = useState(false);
  const [submitIsDisabled, setSubmitBtnStatus] = useState(false);

  const infoMsgRef = useRef();
  const maxImgSize = 2048;
  const maxImgCount = 5;


  // review functions start
  const appendInfoMsg = (string, addString) => {
    let processedString = '';

    if (string.length === 0 && addString.length > 0) {
      processedString = addString;
    }
    if (string.length > 0 && addString.length === 0) {
      processedString = string;
    }
    if (string.length > 0 && addString.length > 0) {
      processedString = string + '; ' + addString;

    }
      return processedString;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    let infoMsg = '';
    if (textReview.length === 0 || (pricingValue === 0 || pricingValue.length === 0)) {

      if (textReview.length === 0) {
        infoMsg = appendInfoMsg(infoMsg, 'Review cannot be blank');
      }
      if (pricingValue === 0 || pricingValue.length === 0) {
        infoMsg = appendInfoMsg(infoMsg, 'Pricing value cannot be blank');
      }

      infoMsgRef.current.style.color = "red";
      infoMsgRef.current.innerHTML = infoMsg;
    }

    if (images.length > 0) {
      if (images[0].length > maxImgCount) {
        infoMsg = appendInfoMsg(infoMsg, 'Maximum number (' + maxImgCount + ') of images exceeded');
      }
      infoMsg = appendInfoMsg(infoMsg, validateImageSize(images[0]));

      infoMsgRef.current.style.color = "red";
      infoMsgRef.current.innerHTML = infoMsg;
    }

    if (infoMsg.length === 0) {
      infoMsgRef.current.innerHTML = '';
      setSubmitBtnStatus(true);

      const restaurantReview = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          url: '/review/save',
          username: localStorage.getItem('username'),
          restaurantName: restaurantName,
          restaurantPhone: restaurantPhone,
          restaurantAddress: restaurantAddress,
          restaurantWebsite: restaurantWebsite,
          textReview: textReview,
          deliciousnessScore: deliciousnessScore,
          serviceScore: serviceScore,
          experienceScore: experienceScore,
          pricingScore: pricingScore,
          pricingValue: pricingValue,
          images: images.length > 0 ? images[0] : [],
        })
      }
      sendUserReview(restaurantReview);
    }
  }

  const validateImageSize = (imgs) => {
    let msg = '';
    imgs.map((img) => {
      if (parseInt(img['size'].split(' ')[0]) > maxImgSize) {
        msg = 'Image size exceeds ' + maxImgSize / 1024 + 'MB';
      }
    });

    return msg;
  }

  const sendUserReview = async (restaurantReview) => {
    const res = await fetch(
      'http://localhost:80/api/index.php',
      restaurantReview
    );

    const data = await res.json();

    if (res['status'] === 200) {
      infoMsgRef.current.style.color = "green";
      infoMsgRef.current.innerHTML = data['response'];
      changeTextAreaStatus(true);
      ratingsRequest();
    }
  }
  // review functions end

  return (
    <form className="form-group" onSubmit={handleSubmit}>
      <div ref={infoMsgRef}></div>
      <div>
        <textarea
          readOnly={textAreaStatus}
          name="review"
          maxLength="500"
          onChange={(e) => setTextReview(e.target.value)}
          rows="5"
          cols="40"
          placeholder="Add review (500 characters limit)"
        />
      </div>
      <div className="review-form-grid">
        <div className="review-grid-one-row">
          <sup>{textReview.length}/500</sup>
        </div>
        <div className="review-grid-two-row">
          <label>Deliciousness</label>
          <Star onChange={(value) => setDeliciousnessScore(value)} />
        </div>
        <div className="review-grid-two-row">
          <label>Service</label>
          <Star onChange={(value) => setServiceScore(value)} />
        </div>
        <div className="review-grid-two-row">
          <label>Experience</label>
          <Star onChange={(value) => setExperienceScore(value)} />
        </div>
        <div className="review-grid-two-row">
          <label>Pricing</label>
          <Star onChange={(value) => setPricingScore(value)} />
        </div>
        <div className="review-grid-one-row">
          <label></label>
          $
          <input
            name="pricingValue"
            type="number"
            min="1"
            step="0.01"
            onChange={(e) => setPricingValue(e.target.value)}
          />{" "}
          spent
        </div>
        <div className="review-grid-one-row">
           <div className="div-hover-text">
             <FileBase64
              type="file"
              multiple={true}
              onDone={(base64) => setImages([base64])}
              />
           </div>
           <div className="hover-hide"><sup>5 images, each smaller than 2mb</sup></div>
        </div>
        <div className="review-grid-one-row">
          <input className="login-form-submit-button" type="submit" value="Submit" disabled={submitIsDisabled} />
        </div>
      </div>
    </form>
  );
}

export default RestaurantReview;
