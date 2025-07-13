import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import useForm from "../../hooks/useForm";

const ControlBarFeatureBanner = ({
  featureBanner,
  setDisplayData,
  setIsFiltering,
}) => {
  const { form, handleOnChange } = useForm({
    searchQuery: "",
    status: "all",
    date: "newest",
  });

  const filterFunctionFeatureBanner = (data, { searchQuery, status, date }) => {
    let filtered = [...data];
    // Filter by Orders' status
    if (status !== "all") {
      filtered = filtered.filter((item) => item.status === status);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (banner) =>
          banner.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          banner._id.includes(searchQuery)
      );
    }

    switch (date) {
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "oldest":
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
    }
    return filtered;
  };

  useEffect(() => {
    form.searchQuery.trim().length > 0
      ? setIsFiltering(true)
      : setIsFiltering(false);
  }, [form.searchQuery]);

  useEffect(() => {
    setDisplayData(filterFunctionFeatureBanner(featureBanner, form || []));
  }, [form]);

  return (
    <Form>
      <Row>
        {/* searching feature */}
        <Col md={6}>
          <Form.Control
            name="searchQuery"
            type="text"
            placeholder="Search Banners ..."
            onChange={handleOnChange}
          />
        </Col>

        {/* status and the date sorting orders */}
        <Col className="d-flex justify-content-end gap-1 gap-sm-2 mt-3 mt-sm-0">
          {/* sorting acc to status */}
          <Form.Group>
            <Form.Select
              name="status"
              value={form.status}
              onChange={handleOnChange}
            >
              <option value="all">All</option>
              <option value="active" className="text-primary">
                Active
              </option>
              <option value="inactive" className="text-secondary">
                Inactive
              </option>
            </Form.Select>
          </Form.Group>

          {/* sorting acc to date */}
          <Form.Group>
            <Form.Select
              name="date"
              value={form.date}
              onChange={handleOnChange}
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
};

export default ControlBarFeatureBanner;
