const express = require("express");
const app = express();
const axios = require("axios");

app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html");
});

app.post("/ai", async (req, res) => {
	let { paragraph } = req.body;
	let response = await axios.post("https://api-inference.huggingface.co/models/google/pegasus-large", {
		inputs: paragraph
	}, {
		headers: { Authorization: "Bearer {API_TOKEN}" }
	});
	res.send(response.data[0].summary_text);
});

app.listen(3000, (err) => {
	if (err) throw err;
	console.log("Server Started");
});
