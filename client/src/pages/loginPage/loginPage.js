import React from "react";
import Header from "../../components/commonComponents/header/header";
import Footer from "../../components/commonComponents/footer/footer";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import AdCarousel from "../../components/loginPageComponents/AdCarousel";
import AuthenticationButton from "../../components/authenticationButton";
import "./styles.css";
import girlFeet from "../../images/girlfeetwaterbottle.jpg";
import gymCoronavirus from "../../images/gym-coronavirus.jpg";
import bench from "../../images/bench.jpg";
import equipmentRoom from "../../images/equipmentroom.jpg";
import SignUpButton from "../../components/signupButton/signupButton";

function LoginPage() {
  return (
    <>
      <Header />
      <Container className="loginPage">
        <Row>
          <Col className="align-self-stretch background-dark">
            <Container className="my-5 py-3">
              <Container className="text-center">
                <h1 className="text-red">Refactor your body!</h1>
                <AdCarousel
                  className="adCarousel"
                  //Image Credit:  https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.firstpost.com%2Fhealth%2Fcovid-19-precautions-should-you-be-heading-back-to-your-gym-now-that-it-will-be-allowed-to-reopen-8661361.html&psig=AOvVaw0u3LCRxcuz5rHgFpSVFb_Q&ust=1609792245944000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJC0mczNgO4CFQAAAAAdAAAAABAO
                  imgUrl1={girlFeet}
                  altText1="Girl sitting on floor next to water bottle"
                  carouselHeader1="Stretching your mind"
                  carouselCaption1="but need to stretch your body?"
                  // Image credit:  https://time.com/5795492/gym-fitness-studio-coronavirus/
                  imgUrl2={gymCoronavirus}
                  altText2="Man picking up weight from weight rack"
                  carouselHeader2="Found your inner strength"
                  carouselCaption2="but still discovering your outer
              strength?"
                />
              </Container>
            </Container>
          </Col>
          <Col className="align-self-stretch justify-content-center text-center background-red">
            <Container className="my-5 py-4">
              <h3 className="text-white">
                "Master your mindset <br />
                and <br />
                you'll master your body."
              </h3>
              <p className="text-white mb-5">-GYMQUOTES.CO</p>
              <h4 className="py-3 text-white">Already a Member?</h4>
              <AuthenticationButton />
              <br />
              <br />
            </Container>
          </Col>
        </Row>
        <Row className=" align-items-center justify-content-center text-center">
          <Col className="align-self-stretch background-red">
            <Container className="my-5 py-3">
              <h2 className="py-5 text-white">
                Whatever your fitness needs, <br />
                we've got you covered. <br />
                Ready to become a member?
              </h2>
              <SignUpButton />
            </Container>
          </Col>
          <Col className="align-self-stretch background-dark">
            <Container className="my-5 py-3">
              <Container className="text-center">
                <h1 className="text-red">Increase Your Stamina!</h1>
                <AdCarousel
                  className="adCarousel"
                  // Image Credit:  https://www.seattletimes.com/nation-world/will-you-go-back-to-the-gym-when-coronavirus-shutdown-ends-heres-what-you-need-to-consider/
                  imgUrl1={bench}
                  altText1="Man on weight bench"
                  carouselHeader1="Looking for personal training
                  facilities"
                  carouselCaption1="to help you meet your fitness goals?"
                  // Image credit:  https://www.tampabay.com/news/health/2020/05/15/florida-gyms-reopen-monday-will-people-go/
                  imgUrl2={equipmentRoom}
                  altText2="Equipment Room"
                  carouselHeader2="Looking for a clean, comfortable
                  atmosphere"
                  carouselCaption2="to work out and de-stress?"
                />
              </Container>
            </Container>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default LoginPage;
