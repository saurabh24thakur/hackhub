
import React, { useState, useEffect } from 'react';
import { getTeams, requestToJoinTeam } from '../services/teamService';

const TeamList = ({ user }) => {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTeams = async () => {
            setLoading(true);
            try {
                const { data } = await getTeams();
                setTeams(data);
            } catch (error) {
                console.error("Failed to fetch teams:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTeams();
    }, []);

    const handleRequestToJoin = async (teamId) => {
        setLoading(true);
        try {
            await requestToJoinTeam(teamId, user._id);
            alert('Request sent!');
        } catch (error) {
            console.error("Failed to send request:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }


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
