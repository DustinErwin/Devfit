module.exports = function (orders, members) {
  const orderHistory = [];
  orders.forEach((order) => {
    const orderingMember = members.filter(
      (member) => JSON.stringify(member._id) === JSON.stringify(order.member_id)
    );
    const memberName = `${orderingMember[0].first_name} ${orderingMember[0].last_name}`;

    const orderDate = JSON.stringify(order.order_date)
      .split("")
      .slice(1, 11)
      .join("");

    // order.order_date.slice(0, 8);
    // const orderDate = order.order_date.join(",");
    const orderBundle = {
      id: order._id,
      member_id: order.member_id,
      memberName: memberName,
      purchased_items: order.purchased_items,
      order_date: orderDate,
      total_cost: order.total_cost,
      purchase_method: order.purchase_method,
    };

    orderHistory.push(orderBundle);
  });
  return orderHistory;
};
