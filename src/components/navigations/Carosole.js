import React from 'react'

const Carosole =() =>{

    return(

        
        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
  <ol class="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="1"class="active"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="2"class="active"></li>
  </ol>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img class="d-block w-100" src="/assets/images/home/image1.jpg" alt="Iphone" height="500px"/>
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src="/assets/images/home/image2.jpg" alt="Iphone"height="500px"/>
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src="/assets/images/home/image3.jpg" alt="Iphone"height="500px"/>
    </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>
        
    
    )

}

export default Carosole

