import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

// import required modules
import {
  Pagination,
  Navigation,
  FreeMode,
  Thumbs,
  Autoplay,
} from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeatureBannerAction } from "../../features/featureBanner/featureBannerAction";

export default function CarouselHomePage() {
  const sampleCarouselImg = ["./1.jpg", "./2.jpeg", "./3.jpeg", "./4.jpeg"];

  const pagination = {
    clickable: true,
  };

  const dispatch = useDispatch();
  const { featureBanner } = useSelector((state) => state.featureBannerInfo);

  useEffect(() => {
    const fetchBanners = async () => {
      await dispatch(fetchFeatureBannerAction());
    };
    fetchBanners();
  }, []);

  if (!featureBanner || featureBanner.length === 0) return null;

  return (
    <>
      <Swiper
        key={featureBanner.length}
        slidesPerView={1}
        spaceBetween={1}
        centeredSlides={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={pagination}
        navigation={true}
        modules={[Pagination, Navigation, Thumbs, FreeMode, Autoplay]}
        className="mySwiper"
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
      >
        {featureBanner?.map((item, index) => (
          <SwiperSlide key={index}>
            <img
              src={item.featureBannerImgUrl}
              alt="Carousel"
              style={{ backgroundSize: "contain" }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
