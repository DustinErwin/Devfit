import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import CarouselImageItem from "../../components/CarouselImageItem";
// import ContentWrapper from "../../components/contentWrapper";
import AuthenticationButton from "../../components/authenticationButton";
import "./styles.css";
import "../../components/button/styles.css";
import { useAuth0 } from "@auth0/auth0-react";
import { Redirect } from "react-router";
import UserContext from "../../utilities/userContext";
import Carousel from "react-bootstrap/Carousel";
import "../../components/button/styles.css";
import DevBtn from "../../components/button";


function LoginPage() {
  const [userInfo, setUserInfo] = useState();
  const [userRole, setUserRole] = useState(null);
  // const [isAuthenticated, setisAuthenticated] = useState(false)

  const { isAuthenticated } = useAuth0();
  const { user } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      const { email } = user;

      fetch(`/api/user/${email}`)
        .then((response) => response.json())
        .then((currentUser) => {
          setUserInfo({ ...userInfo, currentUser });
          if (currentUser) {
            setUserRole(<Redirect to={`/${currentUser.role}`} />);
          } else {
            setUserRole(<Redirect to={`/registration`} />);
          }
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <>
      <Header />

      <Container className="loginPage">
        <AuthenticationButton className="btn-dark" />
        {userRole ? userRole : null}
        <Row>
          <Col className="align-self-stretch background-dark">
            <Container className="my-5 py-3">
              <Container className="text-center">
                <h1 className="text-red">Refactor your body!</h1>
                <CarouselImageItem
                  imgUrl1="/images/girlfeetwaterbottle.jpg"
                  altText1="Girl sitting on floor next to water bottle"
                  carouselHeader1="Stretching your mind"
                  carouselCaption1="but need to stretch your body?"
                  imgUrl2="/images/gym-coronavirus.jpg"
                  altText2="Man picking up weight from weight rack"
                  carouselHeader2="Found your inner strength"
                  carouselCaption2="but still discovering your outer
              strength?"
                />
              </Container>
            </Container>
          </Col>
          <Col className="align-self-stretch justify-content-center text-center background-red">
            <Container className="my-5 py-3">
              <h2 className="pt-5 text-white">
                "I think it's important not to compare yourself to others."
                Georgie Massey"
              </h2>
              <AuthenticationButton />
            </Container>
          </Col>
        </Row>
        <Row className=" align-items-center justify-content-center text-center">
          <Col className="align-self-stretch background-red">
            <Container className="my-5 py-3">
              <h2 className="pt-5 text-white">
                Whatever your fitness needs, <br />
                we've got you covered. <br />
                Ready to become a member?
              </h2>
              <DevBtn styleClass="btn-dark">Sign up</DevBtn>
            </Container>
          </Col>
          <Col className="align-self-stretch background-dark">
            <Container className="my-5 py-3">
              <Container className="text-center">
                <h1 className="text-red">Increase Your Stamina!</h1>
                <CarouselImageItem
                  imgUrl1="/images/bench.jpg"
                  altText1="Man on weight bench"
                  carouselHeader1="Looking for personal training
                  facilities"
                  carouselCaption1="to help you meet your fitness goals?"
                  imgUrl2="/images/equipmentroom.jpg"
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
