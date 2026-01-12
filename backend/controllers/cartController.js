import Cart from "../models/Cart.js";

// @desc    Get user's cart
// @route   GET /api/cart
// @access  Private
export const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id })
      .populate('items.product', 'name price brand images');
      
    if (!cart) {
      return res.json({ items: [] });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching cart.', error: error.message });
  }
};

// @desc    Add or update a product in cart (upsert)
// @route   POST /api/cart
// @access  Private
export const addOrUpdateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || quantity == null) {
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
        cart.items[itemIndex].quantity = quantity;
        if (quantity <= 0) {
          cart.items.splice(itemIndex, 1);
        }
      } else {
        if (quantity > 0) {
          cart.items.push({ product: productId, quantity });
        }
      }
    }

    await cart.save();

    const populatedCart = await Cart.findById(cart._id)
      .populate('items.product', 'name price brand images');

    res.json(populatedCart);
  } catch (error) {
    res.status(500).json({ message: 'Server error while updating cart.', error: error.message });
  }
};

// @desc    Update quantity of a cart item
// @route   PUT /api/cart/:productId
// @access  Private
export const updateCartItem = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    if (quantity == null) {
      return res.status(400).json({ message: 'Quantity is required.' });
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found.' });
    }

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Product not found in cart.' });
    }

    if (quantity <= 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = quantity;
    }

    await cart.save();

    const populatedCart = await Cart.findById(cart._id)
      .populate('items.product', 'name price brand images');

    res.json(populatedCart);
  } catch (error) {
    res.status(500).json({ message: 'Server error while updating cart item.', error: error.message });
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

    const populatedCart = await Cart.findById(cart._id)
      .populate('items.product', 'name price brand images');

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
