import Policy from '../models/policy.model.js';

export const getPolicies = async (req, res) => {
  const policies = await Policy.find();
  res.json(policies);
};

export const createPolicy = async (req, res) => {
  const { title, content } = req.body;
  const newPolicy = new Policy({ title, content });
  await newPolicy.save();
  res.status(201).json(newPolicy);
};

export const updatePolicy = async (req, res) => {
  const { id } = req.params;
  const updated = await Policy.findByIdAndUpdate(id, req.body, { new: true });
  res.json(updated);
};

export const deletePolicy = async (req, res) => {
  const { id } = req.params;
  await Policy.findByIdAndDelete(id);
  res.json({ message: 'Política eliminada correctamente' });
};
