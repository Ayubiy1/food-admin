import { Input } from "antd";
import Typography from "antd/es/typography/Typography";

import { AudioOutlined } from "@ant-design/icons";

import { FaRegBell } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa6";

const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);

const HeaderComponent = () => {
  return (
    <div
      style={{
        height: "55px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Typography>Title</Typography>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <FaRegBell />
          <FaRegClock />

          <Search
            placeholder="input search text"
            onSearch={onSearch}
            enterButton
            className="search"
          />
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
