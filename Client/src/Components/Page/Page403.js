import React from "react";
import { Result, Button } from "antd";
import { useHistory } from "react-router-dom";

function Page403() {
  //Router
  const history = useHistory();
  return (
    <div className="container-spinners">
      <div className="spinners">
        <Result
            status="403"
            title="403"
            subTitle="Sorry, you are not authorized to access this page."
            extra={<Button type="primary" onClick={()=>history.push("/")}>Back Home</Button>}
        />,
      </div>
    </div>
  );
}

export default Page403;
