import React from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import ContentWrapper from "../../components/contentWrapper";

function MemberPage() {
  return (
    <>
      <Header />
      <ContentWrapper>
      <div
            class="client-info col-12 col-md-6 text-center mb-5 mb-md-0 member-info"
          >
            <h2 class="mt-5 mb-5 member-name "></h2>
            <p>
              Your are currently signed up for
              <span class="number-of-classes-taken"><b></b></span> <span class='sentence-text-classes'></span> 
            </p>
            <div class="classes-taken"></div>
        

            <button type="button" class="btn logout-btn mb-5 mt-5">Log Out</button>
          </div>
      </ContentWrapper>

      <ContentWrapper>This Wrapper contains the schedule</ContentWrapper>
      <Footer />
    </>
  );
}

export default MemberPage;
