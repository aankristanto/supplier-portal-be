import summitApi from "../../config/summitConn.js";


export const updateStatusOrder = async (id, revId, request) => {
    try {
        return await summitApi.put(`/purchase/order-supllier/${id}/${revId}`, request);
    } catch (err) {
        console.log("err ", err?.response?.data);
        
        throw err?.response?.data
    }
};