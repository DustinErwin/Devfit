import React from 'react'

function Header() {
    return   <section class="mb-5 background-dark container-fluid ">
    <div class="row align-items-center ">
      <div class="col">
        <h1 class="big-heading-text less-big-heading no-heading text-end ">Dev</h1>
      </div>
      <div class="col text-center ">
        <img
          class="logo"
          src="./assets/images/Color_Logo_dark_background.png"
          alt="funny logo of skinny kid trying to lift a huge weight"
        />
      </div>
      <div class="col">
        <h1 class="big-heading-text less-big-heading no-heading">  Fit</h1> 
      </div>
    </div>
    
  </section>
}

export default Header