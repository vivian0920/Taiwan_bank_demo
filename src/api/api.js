import request from "./request";

//轉移碳權點數
export async function transferFrom(token, user_phone, amount, party_phone) {
  try {
    const { data } = await request.post(
      `/carbonExternal/external/transferFrom`,
      {
        token,
        user_phone,
        amount,
        party_phone,
      }
    );
    return data;
  } catch (error) {
    const errorMessage = `transferFrom error=${error.message}`;
    console.log(errorMessage);
    throw new Error(errorMessage);
  }
}
export async function getTempPointsRecord() {
  try {
    const { data } = await request.get(
      `/carbonExternal/external/getTempPointsRecord`
    );
    return data;
  } catch (error) {
    const errorMessage = `getTempPointsRecord error=${error.message}`;
    console.log(errorMessage);
    throw new Error(errorMessage);
  }
}

export async function getExtrnalConsumer(user_phone) {
  try {
    const { data } = await request.post(
      `/carbonExternal/external/getExtrnalConsumer`,
      { user_phone }
    );
    return data;
  } catch (error) {
    const errorMessage = `getExtrnalConsumer error=${error.message}`;
    console.log(errorMessage);
    throw new Error(errorMessage);
  }
}
//取得碳權點數
export async function getCurrentPoints(address, token) {
  try {
    const { data } = await request.post(
      `/carbonExternal/external/getCurrentPoints`,
      {
        address,
        token,
      }
    );
    return data;
  } catch (error) {
    const errorMessage = `getCurrentPoints error=${error.message}`;
    console.log(errorMessage);
    throw new Error(errorMessage);
  }
}

// //查看捐贈機構
// export async function getExternalParty(approved) {
//   try {
//     const { data } = await request.get(
//       `/carbonExternal/external/getExternalParty`,
//       {
//         params: {
//           approved,
//         },
//       }
//     );
//     return data;
//   } catch (error) {
//     const errorMessage = `getExternalParty error=${error.message}`;
//     console.log(errorMessage);
//     throw new Error(errorMessage);
//   }
// }
