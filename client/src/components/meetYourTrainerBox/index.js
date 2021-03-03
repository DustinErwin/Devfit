import React from 'react'
import Col from 'react-bootstrap/Col'



//TODO: Basic Framework Created. Still need to add Api Call and show classes signed up for.
function MeetYourTrainerBox() {
    return  <Col class="col-12 col-md-6 text-center background-dark">
    <h2 class="div text-red my-3">Meet Your Trainers!</h2>
    <div
      id="carouselExampleSlidesOnly"
      class="carousel slide"
      data-bs-ride="carousel"
    >
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img
            src="./assets/images/trainer_abeer.jpg"
            class="d-block w-50 center max-height"
            alt="cover photo of trainer abeer"
          />
          <div
            class="carousel-caption d-none d-md-block center background-t-red"
          >
            <h5>Abeer</h5>
            <p>Zumba</p>
          </div>
        </div>
        <div class="carousel-item">
          <img
            src="./assets/images/trainer_arav.jpg"
            class="d-block w-50 center max-height"
            alt="cover photo of trainer arav"
          />
          <div
            class="carousel-caption d-none d-md-block center background-t-red"
          >
            <h5>Arav</h5>
            <p>Spin</p>
          </div>
        </div>
        <div class="carousel-item">
          <img
            src="./assets/images/trainer_felicia.jfif"
            class="d-block w-50 center max-height"
            alt="cover photo of trainer felicia"
          />
          <div
            class="carousel-caption d-none d-md-block center background-t-red"
          >
            <h5>Felicia</h5>
            <p>Barbell Blast</p>
          </div>
        </div>
      </div>
    </div>
  </Col>
}

export default MeetYourTrainerBox