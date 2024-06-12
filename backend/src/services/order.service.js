const Address = require("../models/address.model.js");
const Order = require("../models/order.model.js");
const OrderItem = require("../models/orderItems.js");
const Product = require("../models/product.model.js");
const cartService = require("../services/cart.service.js");

async function createOrder(user, shippingAddress) {
  try {
    let address;
    if (shippingAddress._id) {
      address = await Address.findById(shippingAddress._id);
    } else {
      address = new Address(shippingAddress);
      address.user = user._id;
      await address.save();
    }

    const cart = await cartService.findUserCart(user._id);
    const orderItems = [];

    for (const item of cart.cartItems) {
      const product = await Product.findById(item.product._id);
      if (!product) {
        throw new Error(`Product not found with id: ${item.product._id}`);
      }

      const productSize = product.sizes.find(size => size.name === item.size);
      if (!productSize || productSize.quantity < item.quantity) {
        throw new Error(`Product ${product.name} in size ${item.size} is out of stock`);
      }

      productSize.quantity -= item.quantity;
      await product.save();

      const orderItem = new OrderItem({
        price: item.price,
        product: item.product,
        quantity: item.quantity,
        size: item.size,
        userId: user._id,
        discountedPrice: item.discountedPrice,
      });

      const createdOrderItem = await orderItem.save();
      orderItems.push(createdOrderItem);
    }

    const createdOrder = new Order({
      user: user._id,
      orderItems: orderItems,
      totalPrice: cart.totalPrice,
      totalDiscountedPrice: cart.totalDiscountedPrice,
      discounte: cart.discounte,
      totalItem: cart.totalItem,
      shippingAddress: address._id,
      orderDate: new Date(),
      orderStatus: "PENDING",
      paymentDetails: { status: "PENDING" },
      createdAt: new Date(),
    });

    const savedOrder = await createdOrder.save();
    return savedOrder;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function placedOrder(orderId) {
  try {
    const order = await findOrderById(orderId);
    if (!order) throw new Error(`Order not found with id: ${orderId}`);
    order.orderStatus = "PLACED";
    order.paymentDetails.status = "COMPLETED";
    return await order.save();
  } catch (error) {
    throw new Error(error.message);
  }
}

async function confirmedOrder(orderId) {
  try {
    const order = await findOrderById(orderId);
    if (!order) throw new Error(`Order not found with id: ${orderId}`);
    order.orderStatus = "CONFIRMED";
    return await order.save();
  } catch (error) {
    throw new Error(error.message);
  }
}

async function shipOrder(orderId) {
  try {
    const order = await findOrderById(orderId);
    if (!order) throw new Error(`Order not found with id: ${orderId}`);
    order.orderStatus = "SHIPPED";
    return await order.save();
  } catch (error) {
    throw new Error(error.message);
  }
}

async function deliveredOrder(orderId) {
  try {
    const order = await findOrderById(orderId);
    if (!order) throw new Error(`Order not found with id: ${orderId}`);
    order.orderStatus = "DELIVERED";
    return await order.save();
  } catch (error) {
    throw new Error(error.message);
  }
}

async function cancelledOrder(orderId) {
  try {
    const order = await findOrderById(orderId);
    if (!order) throw new Error(`Order not found with id: ${orderId}`);
    order.orderStatus = "CANCELLED";
    return await order.save();
  } catch (error) {
    throw new Error(error.message);
  }
}

async function findOrderById(orderId) {
  try {
    const order = await Order.findById(orderId)
      .populate("user")
      .populate({ path: "orderItems", populate: { path: "product" } })
      .populate("shippingAddress");
      return order;
    // if (!order) throw new Error(`Order not found with id: ${orderId}`);
    
  } catch (error) {
    throw new Error(error.message);
  }
}

async function usersOrderHistory(userId) {
  try {
    const orders = await Order.find({ user: userId, orderStatus: "PLACED", })
      .populate({ path: "orderItems", populate: { path: "product" } })
      .lean();
    return orders;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getAllOrders() {
  try {
    const orders = await Order.find().populate({
      path: "orderItems",
      populate: { path: "product" },
    });
    return orders;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function deleteOrder(orderId) {
  try {
    const order = await findOrderById(orderId);
    if (!order) throw new Error("Order not found with id: " + orderId);
    await Order.findByIdAndDelete(orderId);
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  createOrder,
  placedOrder,
  confirmedOrder,
  shipOrder,
  deliveredOrder,
  cancelledOrder,
  findOrderById,
  usersOrderHistory,
  getAllOrders,
  deleteOrder,
};
