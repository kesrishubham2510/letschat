import { useContext, useEffect, useState } from "react";

import './groups.css';

import GroupTile from "../../atoms/groupTile/GroupTile";
import { UserContext } from "../../config/GlobalState";

function Groups(props) {

    const [groups, setGroups] = useState(
        [
            {
                "groupId": "0d2acb3c-0431-4913-a763-6df4930146ed",
                "groupName": "Tech Enthusiasts",
                "users": [],
                "createdAt": "1721990853",
                "description": "A community for sharing and discussing tech-related topics.",
                "groupAdmin": {
                    "userId": "a12f98c0-45b2-4c1e-bf09-f2e9dd118f50",
                    "userName": "Shubham Kesri",
                    "joined": "1723001120",
                    "role": "ADMIN"
                }
            },
            {
                "groupId": "1bbf4e6a-2a57-4b19-856c-e2f889809c01",
                "groupName": "Fitness Warriors",
                "users": [],
                "createdAt": "1722105670",
                "description": "A group dedicated to fitness tips, routines, and motivation.",
                "groupAdmin": {
                    "userId": "f23a8d20-94d1-4475-ae51-4cb8d12a6614",
                    "userName": "Rohit Kumar",
                    "joined": "1723124451",
                    "role": "ADMIN"
                }
            },
            {
                "groupId": "2cfa8d70-3b79-4725-9c2d-8ef7aa913a22",
                "groupName": "Book Readers Hub",
                "users": [],
                "createdAt": "1722229011",
                "description": "Discuss your favorite books and share reading recommendations.",
                "groupAdmin": {
                    "userId": "c41f1305-08e4-4e32-8e07-967a713491f1",
                    "userName": "Ananya Sharma",
                    "joined": "1723210054",
                    "role": "ADMIN"
                }
            },
            {
                "groupId": "3dd29fb1-5ab4-4d7e-b5e8-a6c8a3d8f271",
                "groupName": "Movie Mania",
                "users": [],
                "createdAt": "1722332204",
                "description": "A group for movie lovers to talk about films and reviews.",
                "groupAdmin": {
                    "userId": "d612ae11-2d84-4828-a1c3-e5108b9427f7",
                    "userName": "Vikas Sharma",
                    "joined": "1723321992",
                    "role": "ADMIN"
                }
            },
            {
                "groupId": "4ea30e12-7c60-4c60-94be-d42d330b704a",
                "groupName": "Foodies United",
                "users": [],
                "createdAt": "1722445602",
                "description": "Share recipes, restaurant reviews, and everything food.",
                "groupAdmin": {
                    "userId": "e34d832a-129a-4e98-b08e-9943672b1290",
                    "userName": "Priya Mittal",
                    "joined": "1723445013",
                    "role": "ADMIN"
                }
            },
            {
                "groupId": "5fb41f24-1d67-4a1d-8f0f-c914924b9121",
                "groupName": "Travel Explorers",
                "users": [],
                "createdAt": "1722558010",
                "description": "Discover new travel destinations and share your adventures.",
                "groupAdmin": {
                    "userId": "fa22db10-2e91-487d-91ea-2a22f9bf2215",
                    "userName": "Niharika Verma",
                    "joined": "1723508820",
                    "role": "ADMIN"
                }
            },
            {
                "groupId": "6ac52b33-37de-43b3-a48c-e85239b971da",
                "groupName": "Coding Masters",
                "users": [],
                "createdAt": "1722671440",
                "description": "A community for developers to share knowledge and solve problems.",
                "groupAdmin": {
                    "userId": "b21ea420-56f3-42b7-b2e4-bc5f0cd19432",
                    "userName": "Sakshi Jain",
                    "joined": "1723621123",
                    "role": "ADMIN"
                }
            },
            {
                "groupId": "7fd63c45-4987-4b42-9a41-b3a93494b419",
                "groupName": "Photography Club",
                "users": [],
                "createdAt": "1722785800",
                "description": "Showcase your photography skills and learn new techniques.",
                "groupAdmin": {
                    "userId": "ce59df40-7a78-4e55-bfd7-299222a19e57",
                    "userName": "Aman Gupta",
                    "joined": "1723714411",
                    "role": "ADMIN"
                }
            },
            {
                "groupId": "8ae74d57-7741-4c8c-881b-1296f241b640",
                "groupName": "Entrepreneurs Network",
                "users": [],
                "createdAt": "1722899002",
                "description": "A space for startup founders and business enthusiasts.",
                "groupAdmin": {
                    "userId": "dc92fb71-df24-4b7d-8c3e-a3df30019f13",
                    "userName": "Harshit Singh",
                    "joined": "1723855548",
                    "role": "ADMIN"
                }
            },
            {
                "groupId": "9bf85e68-6e92-42bf-88b8-4aad43b01df3",
                "groupName": "Gaming Legends",
                "users": [],
                "createdAt": "1723002105",
                "description": "A fun place for gamers to share tips, updates, and gameplay.",
                "groupAdmin": {
                    "userId": "ef21ad92-93d7-4b9c-966b-941f4ff39241",
                    "userName": "Rachit Mehra",
                    "joined": "1723952203",
                    "role": "ADMIN"
                }
            }
        ]

    );

    return <div className="groups">
        {groups.length > 0 && groups.map(group => {
            return <GroupTile key={group.groupId} title={group.groupName} description={group.description} createdAt={group.createdAt} owner={group.groupAdmin.userName}/>
        })}

    </div>
}

export default Groups;