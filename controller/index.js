const { connectToDb, getDb } = require("../config/db/config");
const { v4: uuidv4 } = require("uuid");

let db;
connectToDb((err) => {
  if (!err) {
    db = getDb();
  }
});

module.exports.getStatus = (req, res) => {};

module.exports.getServiceById = (req, res) => {
  console.log("Get request called for the Id ", req.params.id);
  db.collection("services")
    .findOne({ id: req.params.id })
    .then((service) => {
      if (service === null)
        res.status(404).json({ error: "The requested service not found" });
      else res.status(200).json(service);
    })
    .catch((err) => {
      res.status(500).json({ error: "Could not fetch document" });
    });
};

module.exports.getAllService = (req, res) => {
  console.log("Get request called for all services");
  const services = [];
  db.collection("services")
    .find()
    .forEach((service) => services.push(service))
    .then(() => {
      res.status(200).json(services);
    })
    .catch(() => {
      res.status(400).json({ message: "Could not fetch records" });
    });
};

module.exports.createService = (req, res) => {
  try {
    console.log("Post request called for create service");
    const service = req.body.data;
    service.id = uuidv4().toUpperCase();
    service.created_at = new Date().toISOString();
    service.updated_at = new Date().toISOString();
    db.collection("services")
      .insertOne(service)
      .then((result) => {
        result.id = service.id;
        res.status(201).json(result);
      })
      .catch((err) => {
        res.status(500).json({ message: "Could not save data" });
      });
  } catch {
    res.status(500).json({ message: "Could not save data" });
  }
};

module.exports.deleteServiceById = (req, res) => {
  console.log("Delete request called for delete service, ", req.params.id);
  db.collection("services")
    .deleteOne({ id: req.params.id })
    .then((result) => {
      result.message = "Successfully deleted the service";
      res.status(202).json(result);
    })
    .catch((err) => {
      res.status(500).json({ message: "Could not delete Document" });
    });
};

module.exports.patchService = (req, res) => {
  console.log("Patch request called for patch service - ", req.params.id);
  const updates = req.body.data;
  delete updates._id;
  updates.updated_at = new Date().toISOString();
  db.collection("services")
    .updateOne({ id: req.params.id }, { $set: updates })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json({ message: "Could not modify Document" });
    });
};
