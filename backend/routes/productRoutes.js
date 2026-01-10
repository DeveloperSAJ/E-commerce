import express from 'express';
const router = express.Router();

// GET /api/products - list with filters & search
router.get('/', (req, res) => {
  res.status(200).json({ message: 'List products endpoint' });
});

// GET /api/products/:id - get product details
router.get('/:id', (req, res) => {
  res.status(200).json({ message: `Get product ${req.params.id} details` });
});

// POST /api/products - create product (admin only)
router.post('/', (req, res) => {
  res.status(200).json({ message: 'Create product endpoint' });
});

// PUT /api/products/:id - update product (admin only)
router.put('/:id', (req, res) => {
  res.status(200).json({ message: `Update product ${req.params.id}` });
});

// DELETE /api/products/:id - delete product (admin only)
router.delete('/:id', (req, res) => {
  res.status(200).json({ message: `Delete product ${req.params.id}` });
});

export default router;