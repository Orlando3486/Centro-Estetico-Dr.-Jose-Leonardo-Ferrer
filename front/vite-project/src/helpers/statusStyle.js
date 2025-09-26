const statusStyle = (status) => {
  return {
    color: status === "active" ? "green" : "red",
    fontWeight: "bold",
  };
};

export default statusStyle;
