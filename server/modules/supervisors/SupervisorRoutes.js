const {
  GetSupervisors,
  GetSupervisor,
  AddSupervisor,
  UpdateSupervisor,
  DeleteSupervisor,
} = require("./SupervisorController");

const SupervisorRoutes = require("express").Router();

SupervisorRoutes.get("/", GetSupervisors);
SupervisorRoutes.get("/:id", GetSupervisor);
SupervisorRoutes.post("/create", AddSupervisor); // Auth
SupervisorRoutes.put("/update", UpdateSupervisor); // Auth
SupervisorRoutes.delete("/delete", DeleteSupervisor); // Auth

module.exports = SupervisorRoutes;
