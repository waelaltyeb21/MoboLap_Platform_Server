const {
  GetSupervisors,
  GetSupervisor,
  AddSupervisor,
  UpdateSupervisor,
  DeleteSupervisor,
} = require("./Supervisor.controller");

const SupervisorRoutes = require("express").Router();

SupervisorRoutes.get("/", GetSupervisors); // Auth
SupervisorRoutes.get("/:id", GetSupervisor);
SupervisorRoutes.post("/create", AddSupervisor); // Auth
SupervisorRoutes.put("/update", UpdateSupervisor); // Auth
SupervisorRoutes.delete("/delete", DeleteSupervisor); // Auth

module.exports = SupervisorRoutes;
