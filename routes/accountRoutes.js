const express = require('express');
const router = express.Router();
const Account = require('../models/Account');

// accountRoutes.js

// Account routes
router.get('/', accountController.getAllAccounts);
router.get('/:id', accountController.getAccountById);
router.post('/', accountController.createAccount);
router.put('/:id', accountController.updateAccount);
router.delete('/:id', accountController.deleteAccount);

// Get all accounts
router.get('/', async (req, res) => {
  try {
    const accounts = await Account.find();
    res.json(accounts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new account
router.post('/', async (req, res) => {
  const { name, balance } = req.body;

  try {
    const account = new Account({ name, balance });
    await account.save();
    res.status(201).json(account);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get account by ID
router.get('/:id', getAccount, (req, res) => {
  res.json(res.account);
});

// Update account
router.patch('/:id', getAccount, async (req, res) => {
  const { name, balance } = req.body;

  if (name) res.account.name = name;
  if (balance) res.account.balance = balance;

  try {
    const updatedAccount = await res.account.save();
    res.json(updatedAccount);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete account
router.delete('/:id', getAccount, async (req, res) => {
  try {
    await res.account.remove();
    res.json({ message: 'Account deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get account by ID
async function getAccount(req, res, next) {
  try {
    const account = await Account.findById(req.params.id);
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }
    res.account = account;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;
