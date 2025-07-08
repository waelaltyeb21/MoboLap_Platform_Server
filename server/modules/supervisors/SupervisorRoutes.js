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
SupervisorRoutes.post("/create", AddSupervisor);
SupervisorRoutes.put("/update", UpdateSupervisor);
SupervisorRoutes.delete("/delete", DeleteSupervisor);

module.exports = SupervisorRoutes;
