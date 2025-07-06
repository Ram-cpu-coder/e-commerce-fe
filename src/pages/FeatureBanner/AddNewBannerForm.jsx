import React, { useRef, useState } from "react";
import {
  Button,
  Col,
  Form,
  Row,
  Modal,
  Table,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { createFeatureBannerAction } from "../../features/featureBanner/featureBannerAction";
import AddProductsInBanner from "./AddProductsInBanner";
import AddedProductsSection from "./AddedProductsSection";

const AddNewBannerForm = ({ form, handleOnChange, setIsCreatingBanner }) => {
  const [featureBannerImageFile, setFeatureBannerImageFile] = useState(null);
  const [featureBannerImagePreview, setFeatureBannerImagePreview] =
    useState("");
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const dispatch = useDispatch();
  const featureBannerImageRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("promoType", form.promoType);
    formData.append("title", form.title);
    formData.append("createdAt", form.from);
    formData.append("expiresAt", form.to);
    selectedProducts.forEach((item) => {
      formData.append("products", item._id);
    });

    if (featureBannerImagePreview) {
      formData.append("featureBannerImgUrl", featureBannerImageFile);
    }

    const response = await dispatch(createFeatureBannerAction(formData));
    if (response) setIsCreatingBanner(false);
  };

  const handleFeatureBannerImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFeatureBannerImageFile(file);
    setFeatureBannerImagePreview(URL.createObjectURL(file));
  };

  const toggleProduct = (product) => {
    const exists = selectedProducts.find((p) => p._id === product._id);
    if (exists) {
      setSelectedProducts((prev) => prev.filter((p) => p._id !== product._id));
    } else {
      setSelectedProducts((prev) => [...prev, product]);
    }
  };

  return (
    <Row
      className="position-absolute bg-white w-100 d-flex flex-column"
      style={{ height: "100%", top: "0", left: "0" }}
    >
      <Col lg={11} md={8} className="mx-auto">
        <Form onSubmit={handleSubmit} className="d-flex flex-column p-5 w-75">
          <Row className="m-0 text-center">
            <strong className="fs-4 mb-5">Create a new Banner</strong>
          </Row>

          <div className="d-flex flex-wrap">
            <Form.Group
              className="mb-3"
              style={{ marginInlineEnd: "auto", width: "40%" }}
            >
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                onChange={handleOnChange}
                required
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              style={{ marginInlineStart: "auto", width: "40%" }}
            >
              <Form.Label>Promo Type</Form.Label>
              <Form.Select
                name="promoType"
                value={form.promoType}
                onChange={handleOnChange}
                required
              >
                <option value="" disabled>
                  Select ...
                </option>
                <option value="new">New</option>
                <option value="seasonal">Seasonal</option>
                <option value="discounted">Discounted</option>
                <option value="clearance">Clearance</option>
              </Form.Select>
            </Form.Group>
          </div>

          <div className="d-flex flex-wrap">
            <Form.Group
              className="mb-3"
              style={{ marginInlineEnd: "auto", width: "40%" }}
            >
              <Form.Label>Starting Date</Form.Label>
              <Form.Control
                type="date"
                name="from"
                onChange={handleOnChange}
                required
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              style={{ marginInlineStart: "auto", width: "40%" }}
            >
              <Form.Label>Expiry Date</Form.Label>
              <Form.Control
                type="date"
                name="to"
                onChange={handleOnChange}
                required
              />
            </Form.Group>
          </div>

          <Form.Group className="mb-3">
            <Form.Label>Upload Banner Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleFeatureBannerImageChange}
              ref={featureBannerImageRef}
              required
            />
            {featureBannerImagePreview && (
              <div className="d-flex flex-wrap gap-2 mb-3">
                <div className="d-flex flex-column position-relative mt-2">
                  <MdDelete
                    onClick={() => {
                      setFeatureBannerImageFile(null);
                      setFeatureBannerImagePreview("");
                      featureBannerImageRef.current.value = "";
                    }}
                    className="position-absolute end-0 text-danger"
                    style={{ cursor: "pointer" }}
                  />
                  <img
                    src={featureBannerImagePreview}
                    alt="Preview"
                    style={{
                      width: 120,
                      height: 120,
                      objectFit: "cover",
                      borderRadius: 8,
                    }}
                  />
                </div>
              </div>
            )}
          </Form.Group>

          {/* Added Products Section */}
          <AddedProductsSection
            selectedProducts={selectedProducts}
            setShowProductModal={setShowProductModal}
            toggleProduct={toggleProduct}
          />

          <div className="d-flex justify-content-between">
            <Button
              style={{ width: "40%" }}
              variant="danger"
              onClick={() => setIsCreatingBanner(false)}
            >
              Cancel
            </Button>
            <Button type="submit" style={{ width: "40%" }}>
              Create Banner
            </Button>
          </div>
        </Form>
      </Col>

      {/* Product Selection Modal */}
      <AddProductsInBanner
        toggleProduct={toggleProduct}
        setShowProductModal={setShowProductModal}
        showProductModal={showProductModal}
        selectedProducts={selectedProducts}
      />
    </Row>
  );
};

export default AddNewBannerForm;
