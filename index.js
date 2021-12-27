const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const TicketRoutes = require("./routes/Ticket");
const TicketReplyRoutes = require("./routes/TicketReply");
const TicketCategoryRoutes = require("./routes/TicketCategory");
const TicketStatusRoutes = require("./routes/TicketStatus");

const UserRoutes = require("./routes/User");
const RoleRoutes = require("./routes/Role");
const StatusRoutes = require("./routes/Status");
const SettingRoutes = require("./routes/Setting");
const KnowledgebaseRoutes = require("./routes/Knowledgebase");

const app = express();
const PORT = 443;
dotenv.config();
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
  })
  .catch((err) => {
    console.log(`Error on start ${err.stack}`);
    process.exit(1);
  });

app.use("/Ticket", TicketRoutes);
app.use("/TicketReply", TicketReplyRoutes);
app.use("/TicketCategory", TicketCategoryRoutes);
app.use("/TicketStatus", TicketStatusRoutes);

app.use("/User", UserRoutes);
app.use("/Role", RoleRoutes);
app.use("/Status", StatusRoutes);
app.use("/Setting", SettingRoutes);

app.use("/Knowledgebase", KnowledgebaseRoutes);
