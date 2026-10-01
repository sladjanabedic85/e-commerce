import { useContext, useState } from "react";
import { CartContext } from "./CartContext.jsx";
import { UserContext } from "./UserContext.jsx";
import { apiRequest } from "../api/apiClient";
import { Button } from "./ui/button";
import Cart from "./Cart.jsx";

function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const { userId } = useContext(UserContext);

  const [shipping, setShipping] = useState({
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    country: "",
    city: "",
    zipcode: "",
    saveInfo: false,
  });

  const [payment, setPayment] = useState({
    method: "card",
    cardholder: "",
    cardNumber: "",
    month: "",
    year: "",
    cvc: "",
  });

  const [isPaying, setIsPaying] = useState(false);
  const [payError, setPayError] = useState(null);
  const [paySuccess, setPaySuccess] = useState(false);

  function updateShipping(field, value) {
    setShipping((prev) => ({ ...prev, [field]: value }));
  }

  function updatePayment(field, value) {
    setPayment((prev) => ({ ...prev, [field]: value }));
  }

  async function handlePay() {
    setPayError(null);
    setPaySuccess(false);
    setIsPaying(true);

    try {
      const token = sessionStorage.getItem("authToken");
      await apiRequest("/api/carts", {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: {
          userId: userId,
          products: cart.map((item) => ({
            id: item.id,
            quantity: item.quantity,
          })),
        },
      });
      setPaySuccess(true);
      clearCart();
    } catch (error) {
      setPayError("Payment could not be processed. Please try again.");
    } finally {
      setIsPaying(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="flex flex-col gap-8">
        <section>
          <h3 className="mb-3 text-lg font-semibold">Shipping Information</h3>
          <div className="flex flex-col gap-3 rounded-lg border p-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label htmlFor="first-name">First Name</label>
                <input
                  type="text"
                  id="first-name"
                  className="rounded-md border px-3 py-1.5 text-sm"
                  value={shipping.firstName}
                  onChange={(event) => updateShipping("firstName", event.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="last-name">Last Name</label>
                <input
                  type="text"
                  id="last-name"
                  className="rounded-md border px-3 py-1.5 text-sm"
                  value={shipping.lastName}
                  onChange={(event) => updateShipping("lastName", event.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                className="rounded-md border px-3 py-1.5 text-sm"
                value={shipping.address}
                onChange={(event) => updateShipping("address", event.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="apartment">Apartment, suite, etc.</label>
              <input
                type="text"
                id="apartment"
                className="rounded-md border px-3 py-1.5 text-sm"
                value={shipping.apartment}
                onChange={(event) => updateShipping("apartment", event.target.value)}
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="flex flex-col gap-1">
                <label htmlFor="country">Country</label>
                <select
                  id="country"
                  className="rounded-md border px-3 py-1.5 text-sm"
                  value={shipping.country}
                  onChange={(event) => updateShipping("country", event.target.value)}
                >
                  <option value="">Select</option>
                  <option value="Serbia">Serbia</option>
                  <option value="Croatia">Croatia</option>
                  <option value="Hungary">Hungary</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="city">City</label>
                <select
                  id="city"
                  className="rounded-md border px-3 py-1.5 text-sm"
                  value={shipping.city}
                  onChange={(event) => updateShipping("city", event.target.value)}
                >
                  <option value="">Select</option>
                  <option value="Beograd">Beograd</option>
                  <option value="Novi Sad">Novi Sad</option>
                  <option value="Subotica">Subotica</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="zipcode">Zipcode</label>
                <select
                  id="zipcode"
                  className="rounded-md border px-3 py-1.5 text-sm"
                  value={shipping.zipcode}
                  onChange={(event) => updateShipping("zipcode", event.target.value)}
                >
                  <option value="">Select</option>
                  <option value="11000">11000</option>
                  <option value="21000">21000</option>
                  <option value="24000">24000</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="save"
                checked={shipping.saveInfo}
                onChange={(event) => updateShipping("saveInfo", event.target.checked)}
              />
              <label htmlFor="save">Save contact information</label>
            </div>
          </div>
        </section>

        <section>
          <h3 className="mb-3 text-lg font-semibold">Payment Information</h3>
          <div className="flex flex-col gap-3 rounded-lg border p-4">
            <div className="flex gap-3">
              <Button
                type="button"
                variant={payment.method === "card" ? "default" : "outline"}
                onClick={() => updatePayment("method", "card")}
              >
                Card
              </Button>
              <Button
                type="button"
                variant={payment.method === "cash" ? "default" : "outline"}
                onClick={() => updatePayment("method", "cash")}
              >
                Cash
              </Button>
            </div>

            {payment.method === "card" && (
              <>
                <div className="flex flex-col gap-1">
                  <label htmlFor="cardholder">Cardholder Name</label>
                  <input
                    type="text"
                    id="cardholder"
                    className="rounded-md border px-3 py-1.5 text-sm"
                    value={payment.cardholder}
                    onChange={(event) => updatePayment("cardholder", event.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="cardnumber">Card Number</label>
                  <input
                    type="text"
                    id="cardnumber"
                    className="rounded-md border px-3 py-1.5 text-sm"
                    value={payment.cardNumber}
                    onChange={(event) => updatePayment("cardNumber", event.target.value)}
                  />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="month">Month</label>
                    <select
                      id="month"
                      className="rounded-md border px-3 py-1.5 text-sm"
                      value={payment.month}
                      onChange={(event) => updatePayment("month", event.target.value)}
                    >
                      <option value="">Select</option>
                      <option value="01">January</option>
                      <option value="02">February</option>
                      <option value="03">March</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="year">Year</label>
                    <select
                      id="year"
                      className="rounded-md border px-3 py-1.5 text-sm"
                      value={payment.year}
                      onChange={(event) => updatePayment("year", event.target.value)}
                    >
                      <option value="">Select</option>
                      <option value="2025">2025</option>
                      <option value="2026">2026</option>
                      <option value="2027">2027</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="cvc">CVC</label>
                    <input
                      type="text"
                      id="cvc"
                      className="rounded-md border px-3 py-1.5 text-sm"
                      value={payment.cvc}
                      onChange={(event) => updatePayment("cvc", event.target.value)}
                    />
                  </div>
                </div>
              </>
            )}

            {payError && <p className="text-sm text-destructive">{payError}</p>}
            {paySuccess && <p className="text-sm text-green-600">Order placed successfully!</p>}

            <Button type="button" onClick={handlePay} disabled={isPaying || cart.length === 0}>
              {isPaying ? "PROCESSING..." : "Pay"}
            </Button>
          </div>
        </section>
      </div>

      <div>
        <h3 className="mb-3 text-lg font-semibold">Review Your Cart</h3>
        <Cart showSummary={false} />
      </div>
    </div>
  );
}

export default Checkout;

