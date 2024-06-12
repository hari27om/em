import { Box, Grid } from "@mui/material";
import React from "react";

const OrderCard = ({ item, order }) => {
  return (
    <Box className="p-5 shadow-lg hover:shadow-2xl border ">
      <Grid spacing={2} container sx={{ justifyContent: "space-between" }}>
        <Grid item xs={6}>
          <div
            className="flex cursor-pointer"
          >
            <img
              className="w-[5rem] h-[5rem] object-cover object-top"
              src={item?.product?.imageUrl}
              alt="item?.product?.title"
            />
            <div className="ml-5">
              <p className="mb-2">{item?.product?.title}</p>
              <p className="opacity-50 text-xs font-semibold space-x-5">
                <span>Size: {item?.size}</span>
              </p>
            </div>
          </div>
        </Grid>

        <Grid item xs={2}>
          <p>₹{item?.discountedPrice}</p>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderCard;