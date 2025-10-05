
const express = require('express');
const router = express.Router();
const { 
    createTeam, 
    getTeams, 
    getTeamById, 
    updateTeam, 
    deleteTeam, 
    addTeamMember, 
    removeTeamMember, 
    addTeamMemberByEmail, 
    requestToJoinTeam, 
    approveRequest, 
    denyRequest 
} = require('../controllers/teamController.js');

// Middleware to protect admin routes
const { protect, admin } = require('../middleware/authMiddleware.js');

// Routes
router.route('/').post(protect, admin, createTeam).get(getTeams);
router.route('/:id').get(getTeamById).put(protect, admin, updateTeam).delete(protect, admin, deleteTeam);
router.route('/:teamId/members').put(protect, addTeamMemberByEmail);
router.route('/:teamId/members/:userId').delete(removeTeamMember);
router.route('/:teamId/request-join').post(protect, requestToJoinTeam);
router.route('/:teamId/approve-request').post(protect, admin, approveRequest);
router.route('/:teamId/deny-request').post(protect, admin, denyRequest);

module.exports = router;
