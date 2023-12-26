import { useQuery } from "react-query";
import { api } from "../../api";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Button, Dropdown, Menu, Space, Typography } from "antd";

import { HiEllipsisVertical } from "react-icons/hi2";

import "./style.css";

const items = [
  {
    key: "1",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        1st menu item
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        2nd menu item
      </a>
    ),
  },
  {
    key: "3",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.luohanacademy.com"
      >
        3rd menu item
      </a>
    ),
  },
];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Cards = () => {
  const { data } = useQuery("", () => {
    return api.get("/categories");
  });
  return (
    <>
      <Grid container columns={12} spacing={4}>
        <div className="cards">
          {data?.data.map((item) => {
            return (
              // <Grid item sm={6} md={4} lg={3}>
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
                  <Typography>{item?.name}</Typography>
                </div>

                <Space wrap>
                  <Dropdown
                    overlay={
                      <Menu>
                        <Menu.Item key="1">
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://www.antgroup.com"
                          >
                            1st menu item
                          </a>
                        </Menu.Item>
                        <Menu.Item key="2">
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://www.aliyun.com"
                          >
                            2nd menu item
                          </a>
                        </Menu.Item>
                        <Menu.Item key="3">
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://www.luohanacademy.com"
                          >
                            3rd menu item
                          </a>
                        </Menu.Item>
                      </Menu>
                    }
                    placement="topleft"
                  >
                    <span className="vertical">
                      <HiEllipsisVertical />
                    </span>
                  </Dropdown>
                </Space>
              </div>
              // {/* </Grid> */}
            );
          })}
        </div>
      </Grid>
    </>
  );
};

export default Cards;
