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
import { useNavigate } from "react-router";
import { useForm } from "antd/es/form/Form";

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

const Cards = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [form] = useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(0);
  const [category, setCategory] = useLocalStorageState("edit-category-info", {
    defaultValue: null,
  });

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const { data } = useQuery("categories-data", () => {
    return api.get("/categories");
  });

  const { mutate: categoryDelete } = useMutation(
    () => {
      return api.delete(`categories/${deleteId}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["categories-data"]);
        handleCancel();
      },
    }
  );

  const { mutate: categoryEdit } = useMutation(
    (data) => {
      return api.put(`categories/${data?.id}`, data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["categories-data"]);
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
                onClick={() => {
                  navigate(`${item?.id}`);
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
                          setCategory(item);
                          setEditModalOpen(true);
                          form.resetFields();
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
          <Button className="delete-btn" onClick={categoryDelete}>
            O’chirish
          </Button>
        </div>
      </Modal>

      <EditCategory
        item={category}
        editModalOpen={editModalOpen}
        setEditModalOpen={setEditModalOpen}
      />
    </>
  );
};

export default Cards;
