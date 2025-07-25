import React, { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import useForm from "../../hooks/useForm";
import { filterFunctionOrders } from "../../utils/filterProducts";
import AccordionHeaderTopPart from "../ordersComponent/AccordionHeaderTopPart";
import AccordionHeaderImageSection from "../ordersComponent/AccordionHeaderImageSection";
import AccordionActions from "../ordersComponent/AccordionActions";
import ActionsForItems from "../ordersComponent/ActionsForItems";
import ItemPriceQuantity from "../ordersComponent/ItemPriceQuantity";
import ControlBar from "../ordersComponent/ControlBar";

const AdminOrdersCard = ({ orders, user }) => {
  const [activeKey, setActiveKey] = useState(null);
  const [displayOrders, setDisplayOrders] = useState([]);
  const [isReviewing, setIsReviewing] = useState(null);
  const { form, handleOnChange } = useForm({
    searchQuery: "",
    status: "all",
    date: "newest",
  });

  const toggleAccordion = (key) => {
    setActiveKey((prev) => (prev === key ? null : key));
  };
  const handleToggleReview = (id) => {
    setIsReviewing((prevId) => (prevId === id ? null : id));
  };

  useEffect(() => {
    const data = orders?.docs || [];
    const response = filterFunctionOrders(form, data);
    setDisplayOrders(response);
  }, [form, orders]);

  console.log(displayOrders, 999);
  return (
    <div className="w-100 d-flex flex-column gap-2">
      {/* controls bar */}
      <ControlBar form={form} handleOnChange={handleOnChange} />
      <hr />
      {displayOrders.length <= 0 && (
        <p className="text-center" style={{ minHeight: "80vh" }}>
          No orders here yet...
        </p>
      )}

      {displayOrders?.map((item, index) => {
        const key = item._id.toString();
        const isOpen = activeKey === key;
        return (
          <Accordion
            activeKey={activeKey}
            key={key}
            style={{ zIndex: 9 }}
            className="position-relative"
          >
            <Accordion.Item eventKey={key} className="d-flex flex-column w-100">
              <Accordion.Header
                as="div"
                className="justify-items-around align-items-center row w-100 orderAccordion"
                style={{ minHeight: "12rem" }}
                onClick={(e) => e.preventDefault()}
              >
                <div className="d-flex flex-column gap-2 w-100">
                  <div className="d-flex flex-column gap-2 align-items-between w-100">
                    {/* status and the creation date  */}
                    <AccordionHeaderTopPart item={item} user={user} />

                    {/* images in the accordion header*/}
                    <AccordionHeaderImageSection
                      item={item}
                      isOpen={isOpen}
                      toggleAccordion={toggleAccordion}
                    />

                    {/* total amounts and action buttons*/}
                    <AccordionActions item={item} user={user} />
                  </div>
                </div>
              </Accordion.Header>
              <Accordion.Body className="d-flex flex-column gap-2">
                {item.products.map((product, index) => {
                  return (
                    <div
                      className="d-flex align-items-center justify-content-between"
                      key={index}
                    >
                      {/* images of the items */}
                      <div className="d-flex flex-row gap-2" key={index}>
                        <img
                          src={product.images}
                          alt=""
                          srcSet=""
                          className="border"
                          style={{ height: "80px", width: "80px" }}
                        />
                        {/* product quantity and the unit price */}
                        <ItemPriceQuantity product={product} />
                      </div>
                      {/* actions for the particular product within the order */}
                      <ActionsForItems
                        user={user}
                        item={item}
                        product={product}
                        handleToggleReview={handleToggleReview}
                        setIsReviewing={setIsReviewing}
                        isReviewing={isReviewing}
                      />
                    </div>
                  );
                })}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        );
      })}
    </div>
  );
};

export default AdminOrdersCard;
