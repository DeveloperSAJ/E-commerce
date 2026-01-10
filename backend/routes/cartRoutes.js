import express from 'express';
const router = express.Router();

// GET /api/cart - get user's cart
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Get cart endpoint' });
});

// POST /api/cart - add item to cart
router.post('/', (req, res) => {
  res.status(200).json({ message: 'Add to cart endpoint' });
});

// PUT /api/cart/:itemId - update cart item quantity
router.put('/:itemId', (req, res) => {
  res.status(200).json({ message: `Update cart item ${req.params.itemId}` });
});

// DELETE /api/cart/:itemId - remove item from cart
router.delete('/:itemId', (req, res) => {
  res.status(200).json({ message: `Remove cart item ${req.params.itemId}` });
});

export default router;