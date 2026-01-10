import Cart from "../models/Cart.js";

// @desc    Get user's cart
// @route   GET /api/cart
// @access  Private
export const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate('items.product', 'name price brand images');
    if (!cart) {
      // No cart found, return empty
      return res.json({ items: [] });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching cart.', error: error.message });
  }
};

// @desc    Add or update a product in cart
// @route   POST /api/cart
// @access  Private
export const addOrUpdateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({ message: 'Product ID and quantity are required.' });
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = new Cart({
        user: req.user._id,
        items: [{ product: productId, quantity }],
      });
    } else {
      const itemIndex = cart.items.findIndex(i => i.product.toString() === productId);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity = quantity; // Update quantity
        if (quantity <= 0) cart.items.splice(itemIndex, 1); // Remove if zero
      } else {
        if (quantity > 0) cart.items.push({ product: productId, quantity });
      }
    }

    await cart.save();

    let populatedCart = await Cart.findById(cart._id).populate('items.product', 'name price brand images');

    res.json(populatedCart);
  } catch (error) {
    res.status(500).json({ message: 'Server error while updating cart.', error: error.message });
  }
};

// @desc    Remove an item from cart
// @route   DELETE /api/cart/:productId
// @access  Private
export const removeCartItem = async (req, res) => {
  try {
    const { productId } = req.params;

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found.' });
    }

    cart.items = cart.items.filter(item => item.product.toString() !== productId);

    await cart.save();

    let populatedCart = await Cart.findById(cart._id).populate('items.product', 'name price brand images');

    res.json(populatedCart);
  } catch (error) {
    res.status(500).json({ message: 'Server error while removing cart item.', error: error.message });
  }
};

// @desc    Clear user's cart
// @route   DELETE /api/cart
// @access  Private
export const clearCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
      cart.items = [];
      await cart.save();
    }

    res.json({ message: 'Cart cleared.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error while clearing cart.', error: error.message });
  }
};
