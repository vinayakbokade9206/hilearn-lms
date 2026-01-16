import { useEffect, useState } from "react";
import { getSubscriptionPlans } from "../../services/subscriptionService";
import { createPaymentOrder, paymentSuccess } from "../../services/paymentService";

const Subscription = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    try {
      const res = await getSubscriptionPlans();
      setPlans(res.data.plans);
    } catch (err) {
      alert("Failed to load plans");
    } finally {
      setLoading(false);
    }
  };

  // const handleSubscribe = async (plan) => {
  //   try {
  //     const { data } = await createPaymentOrder({ planId: plan._id, 
  //     amount: plan.price });

  //     const options = {
  //       key: import.meta.env.VITE_RAZORPAY_KEY,
  //       amount: data.amount,
  //       currency: "INR",
  //       order_id: data.orderId,
  //       name: "LMS Subscription",
  //       description: plan.title,
  //       handler: async (response) => {
  //         await paymentSuccess({
  //           orderId: data.orderId,
  //           paymentId: response.razorpay_payment_id,
  //           planId: plan._id,
  //         });

  //         alert("Subscription activated 🎉");
  //       },
  //     };

  //     const rzp = new window.Razorpay(options);
  //     rzp.open();
  //   } catch (err) {
  //     alert("Payment failed");
  //   }
  // };
// const handleSubscribe = async (plan) => {
//   try {
//     // 1. Backend par order create karne ki request bhein
//     const res = await createPaymentOrder({ 
//       planId: plan._id, 
//       amount: plan.price 
//     });

//     const data = res.data;

//     if (data.success) {
//       // 2. Razorpay popup ke bajaye seedha Success API ko call karein
//       // Hum maan rahe hain ki payment "Success" ho gayi
//       const successRes = await paymentSuccess({
//         orderId: data.orderId,
//         paymentId: "PAYID_DUMMY_" + Date.now(), // Nakli Payment ID
//         courseId: plan._id, // Aapka backend 'courseId' mang raha hai paymentSuccess mein
//         amount: plan.price
//       });

//       if (successRes.data.success) {
//         alert("Subscription Activated Successfully! 🎉 (Dummy Mode)");
//       }
//     }
//   } catch (err) {
//     console.error(err);
//     alert("Process failed. Check if you are logged in.");
//   }
// };

const handleSubscribe = async (plan) => {
  try {
    // Alert dikhayein confirmation ke liye
    const confirmPurchase = window.confirm(`Do you want to enroll in ${plan.title}?`);
    
    if (!confirmPurchase) return;

    // Direct success route ko call karein (Dummy Process)
    // Hum 'plan._id' ko hi 'courseId' ki tarah bhej rahe hain
    const res = await paymentSuccess({
      courseId: plan._id, 
      paymentId: "DUMMY_MODE_" + Date.now(),
      amount: plan.price
    });

    if (res.data.success) {
      alert(`Success! You are now enrolled in ${plan.title}.`);
      // User ko dashboard par bhej sakte hain
      // navigate("/dashboard"); 
    }
  } catch (err) {
    console.error("Flow Error:", err);
    alert("Error: Make sure you are logged in as a student.");
  }
};

  if (loading) return <p className="text-center">Loading plans...</p>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">
        Choose Your Subscription
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan._id}
            className="border rounded-xl p-6 shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-bold mb-2">{plan.title}</h2>
            <p className="text-gray-600 mb-4">{plan.description}</p>

            <p className="text-2xl font-bold mb-4">
              ₹{plan.price}
            </p>

            <button
              onClick={() => handleSubscribe(plan)}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
            >
              Subscribe Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscription;
