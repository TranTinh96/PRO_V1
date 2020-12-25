import React from "react";
import { Result, Button } from "antd";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

function Page404() {
  //Router
  const history = useHistory();
  return (
    <div className="container-spinners">
      <div className="spinners">
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={<Button type="primary"  onClick={()=>history.goBack()}>Back Home</Button>}
        />
      </div>
    </div>
  );
}

export default Page404;
