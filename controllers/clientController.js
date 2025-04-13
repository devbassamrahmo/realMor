const Client = require('../models/Client');

// Create new client
exports.createClient = async (req, res) => {
  try {
    const employeeId = req.user.id; 
    const clientData = req.body;

    const newClient = await Client.create({
      ...clientData,
      employee: employeeId 
    });

    res.status(201).json({ message: 'Client created successfully', client: newClient });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all clients (optional)
exports.getClients = async (req, res) => {
  try {
    const employeeId = req.user.id; 

    const clients = await Client.find({ employee: employeeId });
    res.status(200).json(clients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};
