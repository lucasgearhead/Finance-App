// utils.js
export const formatCurrency = (value) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

export const getPaymentMethodInfo = (method) => {
  const paymentMethods = {
    cash: { name: "Dinheiro", icon: "💵" },
    card: { name: "Cartão", icon: "💳" },
    pix: { name: "PIX", icon: "📱" },
  };

  return paymentMethods[method] || { name: method, icon: "" };
};
