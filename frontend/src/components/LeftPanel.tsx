import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import DoctorSlide from "./DoctorSlide";
import PromoSlide from "./PromoSlide";

const LeftPanel = () => {
  return (
    <div className="left-panel">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 5000, // 5 seconds
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        loop={true}
        className="left-slider"
      >
        <SwiperSlide>
          <DoctorSlide />
        </SwiperSlide>

        <SwiperSlide>
          <PromoSlide />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default LeftPanel;
