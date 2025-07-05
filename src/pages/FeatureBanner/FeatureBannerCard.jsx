import { Card } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const FeatureBannerCard = ({ item }) => {
  const {
    featureBannerImgUrl,
    _id,
    category,
    promoType,
    expiresAt,
    createdAt,
  } = item;

  return (
    <Card className="shadow-sm border-0 rounded-4" style={{ width: "18rem" }}>
      {featureBannerImgUrl && (
        <Card.Img
          variant="top"
          src={featureBannerImgUrl}
          alt={category}
          style={{
            height: "160px",
            objectFit: "cover",
            borderTopLeftRadius: "1rem",
            borderTopRightRadius: "1rem",
          }}
        />
      )}
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-2">
          <Card.Title className="mb-0 fs-5">name</Card.Title>
          <Link to={`/admin/banner/${_id}`}>
            <FaEdit className="text-secondary cursor-pointer" />
          </Link>
        </div>
        {/* 
        <div className="text-muted mb-3">
          {productCount} product{productCount !== 1 ? "s" : ""}
        </div> */}

        <div className="d-flex gap-2">
          <Link
            to={`/admin/banner/products`}
            className="btn btn-outline-primary btn-sm"
          >
            View Products
          </Link>
          <Link
            to={`/admin/products/new`}
            className="btn btn-outline-secondary btn-sm"
            onClick={() => handleCategoryClick(category)}
          >
            + Add Product
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default FeatureBannerCard;
