require("dotenv").config();
const express = require("express");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Home page");
});

app.post("/order", async (req, res) => {
	const amount = req.body.amount;

	var instance = new Razorpay({
		key_id: "YOUR_KEY_ID",
		key_secret: "YOUR_SECRET",
	});

	var options = {
		amount: amount * 100,
		currency: "INR",
		receipt: "order_rcptid_11",
	};

	// instance.orders.create(options, function(err, order){
	// 	console.log(order);
	// })

	const myOrder = await instance.orders.create(options);

	res.status(201).json({
		success: true,
		amount,
		order: myOrder,
	});
});

module.exports = app;
