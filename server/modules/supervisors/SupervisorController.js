const { isValidObjectId } = require("mongoose");
const {
  GetDocs,
  GetOneDoc,
  CreateDoc,
  UpdateDoc,
  DeleteDoc,
} = require("../../lib/CrudOperations");
const SupervisorModel = require("./SupervisorModel");

const GetSupervisors = async (req, res) => {
  try {
    const supervisors = await GetDocs(SupervisorModel);

    if (!supervisors)
      return res.status(400).json({ message: "No Supervisors Found" });

    return res.status(200).json(supervisors);
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const GetSupervisor = async (req, res) => {
  const { id } = req.params;
  try {
    if (!isValidObjectId(id))
      return res.status(400).json({ message: "Invalid Supervisor ID" });

    const supervisor = await GetOneDoc(SupervisorModel, { _id: id });

    if (!supervisor)
      return res.status(400).json({ message: "No Supervisor Found" });

    return res.status(200).json(supervisor);
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const AddSupervisor = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const supervisor = await CreateDoc(SupervisorModel, {
      name,
      email,
      password,
      role,
    });

    if (!supervisor)
      return res.status(400).json({ message: "Faild To Add New Supervisor" });

    return res
      .status(201)
      .json({ message: "New Supervisor Added Successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const UpdateSupervisor = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, role } = req.body;
  try {
    if (!isValidObjectId(id))
      return res.status(400).json({ message: "Invalid Supervisor ID" });

    const supervisor = await UpdateDoc(SupervisorModel, {
      name,
      email,
      password,
      role,
    });

    if (!supervisor)
      return res.status(400).json({ message: "Faild To Update Supervisor" });

    return res.status(201).json({ message: "Supervisor Updated Successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const DeleteSupervisor = async (req, res) => {
  const { id } = req.params;
  try {
    if (!isValidObjectId(id))
      return res.status(400).json({ message: "Invalid Supervisor ID" });

    const supervisor = await DeleteDoc(SupervisorModel, id);

    if (!supervisor)
      return res.status(400).json({ message: "Faild To Delete Supervisor" });

    return res
      .status(200)
      .json({ message: "Supervisor Has Been Deleted Successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  GetSupervisors,
  GetSupervisor,
  AddSupervisor,
  UpdateSupervisor,
  DeleteSupervisor,
};
