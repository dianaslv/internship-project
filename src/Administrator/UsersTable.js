import React, {useEffect, useState} from 'react';
import SimpleTable from "../Commons/SimpleTable";
import {useMutation, useQuery} from "@apollo/client";
import RegisterUserForm from "../Commons/RegisterUserForm";
import {AddUser, DeleteUser, UpdateUser, Users} from "../Apollo/Queries/UserQueries/UserQueries";

export default function UsersTable() {
    const [addUser, {data: addUserReceivedData}] = useMutation(AddUser);
    const [users, setUsers] = useState();
    const [index, setIndex] = useState(-1);
    const [getUpdatedUsers, {data: updatedData}] = useMutation(UpdateUser);
    const [deleteUser] = useMutation(DeleteUser);
    const {data:usersData, loading} = useQuery(Users);


    useEffect(() => {
        if (usersData) {
            const transformedUsers = transformData(usersData.users);
            setUsers([...transformedUsers]);
        }
    }, [usersData]);


    if (loading) return null;

    const transformData = (newData) => {
        const newArr = [];
        newData.map((user, key) => {
            let newUser = {};
            newUser.id = user['id'];
            newUser.username = user['username'];
            newUser.password = user['password'];
            newUser.firstName = user['firstName'];
            newUser.lastName = user['lastName'];
            newUser.userRole = user['userRole']['name'];
            newArr.push(newUser);
        })
        return newArr;
    }

    const handleRemove = async (i) => {
        //setUserToDelete(users[i]);
        await deleteUser({
            variables: {id: [users[i].id]},
            update: (cache) => {
                const existingUsers = cache.readQuery({query: Users});
                const newUsers = existingUsers.users.filter(t => (t.id !== users[i].id));
                cache.writeQuery({
                    query: Users,
                    data: {users: newUsers, __typename: "User"}
                });
            }
        })
    };

    const startEditing = i => {
        setIndex(i);
    };

    const stopEditing = (i) => {
        let updatedUser = users[i];
        getUpdatedUsers({
            variables: {
                id: updatedUser.id,
                username: updatedUser.username,
                password: updatedUser.password,
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName
            }
        }).then(r => {
            const updatedUsers = [...users];
            updatedUsers[i] = updatedUser;
            setUsers(updatedUsers);
            setIndex(-1);
        });
    };

    const handleChange = (e, name, i) => {
        const {value} = e.target;
        users.map((user, userKey) => {
            if (i === userKey) {
                const updatedUsers = [...users];
                updatedUsers[i][e.target.name] = value
                setUsers(updatedUsers);
            }
        })
    };

    const createUserForWriteQuery = (user, id) => {
        return {
            "firstName": user.firstName,
            "id": id,
            "lastName": user.lastName,
            "password": user.password,
            "userRole": {
                "id": 2,
                "name": "company_user",
                "__typename": "UserRole"
            },
            "username": user.username,
            "__typename": "User"
        };
    }

    const handleSubmit = (submittedUser) => {
        addUser({
            variables: {
                username: submittedUser.username,
                password: submittedUser.password,
                firstName: submittedUser.firstName,
                lastName: submittedUser.lastName
            },
            update: (cache, {data: user}) => {
                const existingUsers = cache.readQuery({query: Users});
                const newUsers = Object.assign([], existingUsers.users);
                newUsers.push(user.createUser);
                cache.writeQuery({
                    query: Users,
                    data: {users: newUsers, __typename: "User"}
                });
            }
        })
    }


    return users ? <>
        <RegisterUserForm handleSubmitData={handleSubmit}/>
        <SimpleTable
            handleRemove={handleRemove}
            startEditing={startEditing}
            editIdx={index}
            stopEditing={stopEditing}
            handleChange={handleChange}
            data={users}
            header={[
                {
                    name: "First name",
                    prop: "firstName"
                },
                {
                    name: "Last name",
                    prop: "lastName"
                },
                {
                    name: "Username",
                    prop: "username"
                },
                {
                    name: "Password",
                    prop: "password"
                }
            ]}
            title="Users table"/>
    </> : null;
}


