
import React, { useState, useEffect } from 'react';
import { getTeams, requestToJoinTeam } from '../services/teamService';

const TeamList = ({ user }) => {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        const fetchTeams = async () => {
            const { data } = await getTeams();
            setTeams(data);
        };
        fetchTeams();
    }, []);

    const handleRequestToJoin = async (teamId) => {
        await requestToJoinTeam(teamId, user._id);
        alert('Request sent!');
    };

    return (
        <div>
            <h2>Teams</h2>
            {teams.map((team) => (
                <div key={team._id}>
                    <h3>{team.name}</h3>
                    <p>Members: {team.members.map(member => member.name).join(', ')}</p>
                    {user && !team.members.find(member => member._id === user._id) && !team.pendingMembers.find(member => member._id === user._id) && (
                        <button onClick={() => handleRequestToJoin(team._id)}>Request to Join</button>
                    )}
                </div>
            ))}
        </div>
    );
};

export default TeamList;
