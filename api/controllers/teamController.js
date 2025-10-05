
const mongoose = require('mongoose');
const Team = require('../models/Team.js');
const User = require('../models/User.js');

// Helper function to find user IDs by email
const findUserIdsByEmail = async (emails) => {
  if (!emails || emails.length === 0) {
    return [];
  }
  const users = await User.find({ email: { $in: emails } });
  return users.map(user => user._id);
};


const addTeamMemberByEmail = async (req, res) => {
    try {
        const { teamId } = req.params;
        const { email } = req.body;

        const team = await Team.findById(teamId);
        if (!team) {
            return res.status(404).send({ message: 'Team not found' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        if (team.members.includes(user._id)) {
            return res.status(400).send({ message: 'User already in the team' });
        }

        team.members.push(user._id);
        await team.save();
        
        const populatedTeam = await Team.findById(teamId).populate('members', 'name email').populate('pendingMembers', 'name email').populate('hackathon', 'name');
        res.status(200).send(populatedTeam);
    } catch (error) {
        res.status(500).send(error);
    }
};


// Create a new team
const createTeam = async (req, res) => {
  try {
    const { name, members, hackathon } = req.body;

    let memberIds = [];
    if (members && members.length > 0) {
        const memberEmails = members.map(member => member.email).filter(Boolean);
        if (memberEmails.length > 0) {
            memberIds = await findUserIdsByEmail(memberEmails);
        }
    }

    const team = new Team({
      name,
      members: memberIds,
      hackathon
    });

    await team.save();
    res.status(201).send(team);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all teams
const getTeams = async (req, res) => {
  try {
    const teams = await Team.find().populate('members', 'name email').populate('pendingMembers', 'name email').populate('hackathon', 'name');
    res.status(200).send(teams);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a team by ID
const getTeamById = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id).populate('members', 'name email').populate('pendingMembers', 'name email').populate('hackathon', 'name');
    if (!team) {
      return res.status(404).send();
    }
    res.status(200).send(team);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a team by ID
const updateTeam = async (req, res) => {
  try {
    const { members } = req.body;
    let memberIds;

    if (members) {
        if (members.length > 0 && typeof members[0] === 'string') {
            memberIds = members;
        } else {
            const memberEmails = members.map(member => member.email).filter(Boolean);
            if(memberEmails.length > 0){
                memberIds = await findUserIdsByEmail(memberEmails);
            } else {
                memberIds = []
            }
        }
    }

    const updatedData = { ...req.body };
    if(memberIds !== undefined) {
        updatedData.members = memberIds;
    }


    const team = await Team.findByIdAndUpdate(req.params.id, updatedData, { new: true, runValidators: true });
    if (!team) {
      return res.status(404).send();
    }
    res.status(200).send(team);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a team by ID
const deleteTeam = async (req, res) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);
    if (!team) {
      return res.status(404).send();
    }
    res.status(200).send(team);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Add a team member
const addTeamMember = async (req, res) => {
    try {
        const { teamId, userId } = req.params;
        const team = await Team.findById(teamId);
        const user = await User.findById(userId);

        if (!team || !user) {
            return res.status(404).send({ message: 'Team or User not found' });
        }

        if (team.members.includes(userId)) {
            return res.status(400).send({ message: 'User already in the team' });
        }

        team.members.push(userId);
        await team.save();
        res.status(200).send(team);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Remove a team member
const removeTeamMember = async (req, res) => {
    try {
        const { teamId, userId } = req.params;
        const team = await Team.findById(teamId);

        if (!team) {
            return res.status(404).send({ message: 'Team not found' });
        }

        const memberIndex = team.members.indexOf(userId);
        if (memberIndex === -1) {
            return res.status(400).send({ message: 'User not in the team' });
        }

        team.members.splice(memberIndex, 1);
        await team.save();
        res.status(200).send(team);
    } catch (error) {
        res.status(500).send(error);
    }
};

const requestToJoinTeam = async (req, res) => {
    try {
        const { teamId } = req.params;
        const { userId } = req.body;

        const team = await Team.findById(teamId);
        if (!team) {
            return res.status(404).send({ message: 'Team not found' });
        }

        if (team.pendingMembers.includes(userId) || team.members.includes(userId)) {
            return res.status(400).send({ message: 'User has already requested to join or is already a member' });
        }

        team.pendingMembers.push(userId);
        await team.save();
        res.status(200).send({ message: 'Request to join sent successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
};

const approveRequest = async (req, res) => {
    try {
        const { teamId } = req.params;
        const { userId } = req.body;

        const team = await Team.findById(teamId);
        if (!team) {
            return res.status(404).send({ message: 'Team not found' });
        }

        const requestIndex = team.pendingMembers.indexOf(userId);
        if (requestIndex === -1) {
            return res.status(400).send({ message: 'User has not requested to join this team' });
        }

        team.pendingMembers.splice(requestIndex, 1);
        team.members.push(userId);
        await team.save();
        res.status(200).send({ message: 'Join request approved' });
    } catch (error) {
        res.status(500).send(error);
    }
};

const denyRequest = async (req, res) => {
    try {
        const { teamId } = req.params;
        const { userId } = req.body;

        const team = await Team.findById(teamId);
        if (!team) {
            return res.status(404).send({ message: 'Team not found' });
        }

        const requestIndex = team.pendingMembers.indexOf(userId);
        if (requestIndex === -1) {
            return res.status(400).send({ message: 'User has not requested to join this team' });
        }

        team.pendingMembers.splice(requestIndex, 1);
        await team.save();
        res.status(200).send({ message: 'Join request denied' });
    } catch (error) {
        res.status(500).send(error);
    }
};


module.exports = { createTeam, getTeams, getTeamById, updateTeam, deleteTeam, addTeamMember, removeTeamMember, addTeamMemberByEmail, requestToJoinTeam, approveRequest, denyRequest };
