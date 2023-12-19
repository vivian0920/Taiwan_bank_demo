import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect, useContext } from "react";
import * as ExternalApi from "./api/api.js";
var address = "0x921db87f8e0a889e8f1c245ebae96b179be12605";
var token = "U2FsdGVkX1/gbFPx27PaO3n8LhUAaVV/G0uN+ujhiqQ=";
var user_phone = "0900000000";
var amount = 100;
var party_phone = "";

function App() {
  const [carbonPoint, setCarbonPoint] = useState(0);
  const [userPhone, setUserPhone] = useState("");
  const [userAddress, setUserAddress] = useState("");
  // const [tempPointResult, setTempPointResult] = useState("");
  useEffect(
    function () {
      getCurrentPoints();
      // getTempPointsRecord();
    },
    [userAddress]
  );

  const getCurrentPoints = async () => {
    try {
      if (userAddress) {
        const result = await ExternalApi.getCurrentPoints(userAddress, token);
        console.log("Debug: getCurrentPoints=", result.message);
        setCarbonPoint(result.message);
      }
    } catch (error) {
      console.log("Error: getCurrentPoints=", error);
    }
  };
  const getExtrnalConsumer = async () => {
    try {
      alert(userPhone);
      const result = await ExternalApi.getExtrnalConsumer(userPhone);
      console.log("Debug: getExtrnalConsumer=", result.message, address);
      setUserAddress(result.message.address);
      setCarbonPoint(0);
    } catch (error) {
      console.log("Error: getExtrnalConsumer=", error);
    }
  };
  // const getTotalAmount = () => {
  //   if (tempPointResult && tempPointResult.length > 0) {
  //     return tempPointResult.reduce(
  //       (total, record) => total + record.amount,
  //       0
  //     );
  //   }
  //   return 0;
  // };
  // const getTempPointsRecord = async () => {
  //   try {
  //     const tempPointResults = await ExternalApi.getTempPointsRecord();
  //     if (tempPointResults.code === 200) {
  //       var resultArr = tempPointResults.message;
  //       console.log("Debug: getTempPointsRecord=", resultArr);
  //       resultArr.forEach((element) => {
  //         var tmp = new Date(element.timestamp);
  //         element.timestamp = tmp.toLocaleString();
  //       });
  //       // resultArr = resultArr.sort((a, b) => b.timestamp - a.timestamp);
  //       resultArr.sort((a, b) => a.timestamp.localeCompare(b.timestamp));
  //       console.log("Debug: getTempPointsRecord=", resultArr);
  //       setTempPointResult(resultArr);
  //     } else {
  //       throw new Error(tempPointResults.message);
  //     }
  //   } catch (e) {
  //     console.log("Debug: getTempPointsRecord error=", e.message);
  //     return;
  //   }
  // };
  const transferFrom = async () => {
    try {
      alert("碳權點數轉移中，請稍候");
      const result = await ExternalApi.transferFrom(
        token,
        userPhone,
        amount,
        party_phone
      );
      console.log("Debug: transferFrom=", result.message);
      getCurrentPoints();
      if (result.message == "Successfully transfer carbon points") {
        alert("您已成功取得碳權點數！");
      } else {
        alert("碳權點數將轉為暫存點數");
      }
    } catch (error) {
      console.log("Error: transferFrom=", error);
    }
  };
  const handlePhoneChange = (event) => {
    setUserPhone(event.target.value);
  };

  return (
    <div className="App">
      <h1>台銀模擬應用</h1>
      <div>
        <h3>使用者登入資訊：</h3>
        <p>台銀於碳權平台申請之token:</p>
        <p>{token}</p>
        <p>
          手機：
          <input
            type="text"
            placeholder="請輸入使用者手機號"
            value={userPhone}
            onChange={handlePhoneChange}
          />
          <button onClick={getExtrnalConsumer}>更新</button>
        </p>
        <p>您的地址是：</p>
        {userAddress}
        <p>
          目前擁有的碳權點數：
          {carbonPoint ? carbonPoint : 0} 點
        </p>
        {/* <p>
          目前暫存的碳權點數：
          {getTotalAmount()} 點
        </p> */}
      </div>

      <button onClick={transferFrom}>付款</button>
    </div>
  );
}

export default App;
