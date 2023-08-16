const router = require('express').Router();

const {
  validateGetUser,
  validateUpdateProfile,
  validateUpdateProfileAvatar,
} = require('../utils/validator');
const {
  getUsers,
  getUserById,
  getCurrentUser,
  createUser,
  updateProfile,
  updateProfileAvatar,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/me', getCurrentUser);

router.get('/:userId', validateGetUser, getUserById);

router.post('/', createUser);

router.patch('/me', validateUpdateProfile, updateProfile);

router.patch('/me/avatar', validateUpdateProfileAvatar, updateProfileAvatar);

module.exports = router;
