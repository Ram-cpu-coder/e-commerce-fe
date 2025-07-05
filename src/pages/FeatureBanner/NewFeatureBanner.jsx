import { Card } from "react-bootstrap";
const AddNewFeatureBanner = ({ setIsCreatingBanner }) => {
  return (
    <div>
      <Card
        className="shadow-sm rounded-4"
        style={{
          width: "18rem",
          height: "18rem",
          border: "1px dashed #000",
          cursor: "pointer",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
        }}
        onClick={() => setIsCreatingBanner(true)}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.02)";
          e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.15)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
        }}
      >
        <Card.Body className="d-flex justify-content-center align-items-center fs-1">
          +
        </Card.Body>
      </Card>
    </div>
  );
};

export default AddNewFeatureBanner;
