import React from 'react'

//import Testimonials from '../components/misc/Testimonials'
//import Pricing from '../components/misc/Pricing'
//import Header from '../components/misc/Header'
import MenuBar from '../components/navigations/MenuBar'
import Footer from '../components/navigations/Footer'
import Carosole from '../components/navigations/Carosole'
import './Home.css'
//import star from '../images/star.gif'

const Home = () => {
    return (
        <React.Fragment>
            <MenuBar />

            <Carosole/>
           
            
          
            <Footer />
        </React.Fragment>
    )
}

export default Home;