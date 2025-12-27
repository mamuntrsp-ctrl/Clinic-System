import doctorImage from "../assets/doctor-image.jpg";

const DoctorSlide = () => {
  return (
    <div className="slide-content">
      <img src={doctorImage} alt="Doctor" className="doctor-image" />

      <h2 className="doctor-name">Dr. Ershadul Haque</h2>

      <p className="doctor-degree">MBBS, BCS (Health), MD (Oncology)</p>

      <div className="doctor-specialty">Cancer Specialist & Chemotherapist</div>

      <div className="schedule-box">
        <p className="schedule-box-info">Today's Schedule</p>
        <p>10:00 AM - 02:00 PM</p>
        <p>05:00 PM - 09:00 PM</p>
      </div>
    </div>
  );
};

export default DoctorSlide;
