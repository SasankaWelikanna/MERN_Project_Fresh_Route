import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import "./partners.css";

import img1 from "../../assets/keellslogo.png";
import img2 from "../../assets/Glomark.png";
import img3 from "../../assets/MDlogo.png";
import img4 from "../../assets/foodcity.png";
import img5 from "../../assets/arpico.png";

const Partners = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Dynamically determine if the viewport is mobile
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Mobile threshold
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="section section_partners">
      <div className="container d-flex align-items-center justify-content-center">
        <div className="row text-center">
          <div className="col-12">
            <p className="subheading">
              <span>our</span> Partners
            </p>
          </div>
          <div className="col-lg-12 logo-col flex_center">
            {isMobile ? (
              <Swiper
                spaceBetween={90} // Adjust gap between slides
                slidesPerView={3} // Display 3 logos at a time
                loop={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
              >
                <SwiperSlide>
                  <img src={img1} alt="Keells Logo" className="img1" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={img5} alt="Arpico Logo" className="img5" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={img3} alt="MD Logo" className="img3" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={img4} alt="Food City Logo" className="img4" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={img2} alt="Glomark Logo" className="img2" />
                </SwiperSlide>
              </Swiper>
            ) : (
              <div className="row text-align-center">
                <img
                  src={img1}
                  alt="Keells Logo"
                  className="img1 col-md-4 px-lg-4"
                />
                <img
                  src={img2}
                  alt="Glomark Logo"
                  className="img2 col-md-4 px-lg-4"
                />
                <img src={img3} alt="MD Logo" className="img3 col-md-4" />
                <img
                  src={img4}
                  alt="Food City Logo"
                  className="img4 col-md-4 px-lg-4"
                />
                <img
                  src={img5}
                  alt="Arpico Logo"
                  className="img5 col-md-4 px-lg-4"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partners;
