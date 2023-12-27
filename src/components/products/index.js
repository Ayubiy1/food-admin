import { useMutation, useQuery, useQueryClient } from "react-query";
import { api } from "../../api";
import { styled } from "@mui/material/styles";
import { Button, Dropdown, Menu, Modal, Space, Typography } from "antd";

import { HiEllipsisVertical } from "react-icons/hi2";
import { FaTrashAlt } from "react-icons/fa";
import { LuPenLine } from "react-icons/lu";

import "./style.css";
import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import { useState } from "react";
import EditCategory from "../edit-category";
import { useLocalStorageState } from "ahooks";
import { useNavigate, useParams } from "react-router";
import EditProdeuct from "./edit-product";

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

const Products = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productId, setProductId] = useState(0);
  const [deleteId, setDeleteId] = useState(0);
  const [product, setProduct] = useLocalStorageState("edit-product-info", {
    defaultValue: null,
  });
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const { data } = useQuery("products-data", () => {
    return api.get(`/products?categoryId=${id}`);
  });

  const { mutate: productDelete } = useMutation(
    () => {
      return api.delete(`products/${deleteId}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["products-data"]);
        handleCancel();
      },
    }
  );

  const { mutate: categoryEdit } = useMutation(
    (data) => {
      return api.put(`products/${data?.id}`, data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["products-data"]);
      },
    }
  );

  return (
    <>
      <h1>Menu</h1>
      <div className="cards">
        {data?.data.map((item) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                fontFamily: "FF Nort",
                fontSize: "30px",
                fontWeight: "900",
                background: "#F4F4F4",
                with: "350px",
                borderRadius: "6px",
                padding: "10px",
              }}
              className="card"
              key={item?.id}
            >
              <img
                src={item?.img}
                className=""
                style={{
                  maxWidth: "110px",
                  height: "110px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />

              <div>
                {item?.status == true ? (
                  <Typography style={{ fontWeight: "900", fontSize: "22px" }}>
                    {item?.name}
                  </Typography>
                ) : (
                  <Typography
                    style={{
                      fontWeight: "900",
                      fontSize: "22px",
                      color: "#5B5B5B",
                    }}
                  >
                    {item?.name}
                  </Typography>
                )}
              </div>

              <div style={{ display: "flex", margin: "6px 0" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  fill="none"
                >
                  <path
                    d="M10.25 19.6667C6.79822 19.6667 4 16.8684 4 13.4167C4 11.6218 4.75655 10.0037 5.96816 8.86383C7.08669 7.81146 9.83333 5.91626 9.41667 1.75C14.4167 5.08333 16.9167 8.41667 11.9167 13.4167C12.75 13.4167 14 13.4167 16.0833 11.358C16.3081 12.0027 16.5 12.6954 16.5 13.4167C16.5 16.8684 13.7017 19.6667 10.25 19.6667Z"
                    fill="#F9A201"
                  />
                </svg>

                <Typography style={{ color: "#5B5B5B" }}>
                  {item?.kcal} Kcal
                </Typography>
              </div>

              <Typography>{item?.price} so'm</Typography>

              <Space wrap>
                <Dropdown
                  overlay={
                    <Menu>
                      <Menu.Item
                        key="1"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          fontFamily: "FF Nort",
                          color: "#5B5B5B",
                          fontWeight: "900",
                          fontSize: "17px",
                        }}
                        onClick={() => {
                          setIsModalOpen(true);
                          setDeleteId(item?.id);
                        }}
                      >
                        <FaTrashAlt />
                        <span style={{}}>O’chirish</span>
                      </Menu.Item>
                      <Menu.Item
                        key="2"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          fontFamily: "FF Nort",
                          color: "#5B5B5B",
                          fontWeight: "900",
                          fontSize: "17px",
                        }}
                        onClick={() => {
                          setProduct(item);
                          setIsModalOpenEdit(true);
                          setProductId(item?.id);
                        }}
                      >
                        <LuPenLine />
                        <span style={{}}>O’zgartirish</span>
                      </Menu.Item>
                      <Menu.Item
                        key="3"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          fontFamily: "FF Nort",
                          color: "#5B5B5B",
                          fontWeight: "bold",
                        }}
                      >
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <IOSSwitch
                                sx={{ m: 1 }}
                                defaultChecked={item?.status}
                              />
                            }
                            label="Active"
                            onChange={(event) => {
                              const newData = {
                                ...item,
                                status: !item?.status,
                              };
                              categoryEdit(newData);
                            }}
                          />
                        </FormGroup>
                      </Menu.Item>
                    </Menu>
                  }
                  placement="left"
                >
                  <Button className="vertical">
                    <HiEllipsisVertical />
                  </Button>
                </Dropdown>
              </Space>

              <EditProdeuct
                setIsModalOpen={setIsModalOpenEdit}
                isModalOpen={isModalOpenEdit}
                product={product}
                productId={productId}
              />
            </div>
          );
        })}
      </div>

      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        style={{ textAlign: "center" }}
        footer={false}
      >
        <Typography className="title">
          Ovqatni rostan ham o’chirmoqchimisiz
        </Typography>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
            marginTop: "10px",
          }}
        >
          <Button className="delete-btn1">Orqaga</Button>
          <Button className="delete-btn" onClick={productDelete}>
            O’chirish
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default Products;
