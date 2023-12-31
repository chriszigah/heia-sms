const https = require("https");

const payStack = {
  acceptPayment: async (req, res) => {
    try {
      // request body from the clients
      const email = req.body.email;
      const amount = req.body.amount;
      // params
      const params = JSON.stringify({
        email: email,
        amount: amount,
      });
      // options
      const options = {
        hostname: "api.paystack.co",
        port: 443,
        path: "/transaction/initialize",
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "content-Type": "application/json",
        },
      };
      // client request to paystack API
      const clientReq = https.request(options, (apiRes) => {
        let data = "";
        apiRes.on("data", (chunk) => {
          data += chunk;
        });
      });
      apiRes
        .on("end", () => {
          console.log(JSON.parse(data));
          return res.status(200).json(data);
        })
        .on("error", (error) => {
          console.log(error);
        });
      clientReq.write(params);
      clientReq.end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error });
    }
  },
};

const initializePayment = payStack;
module.exports = initializePayment;
