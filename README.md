# 3813ICT_Assignment_Part1
Author: Connor Aitken s5181649

## Organization of the Git Repository
For the purpose of this assessment the git repository was organized by creating to 2 branches. The first, main branch, was pushed a functioning state of the project at every major milestone of the development, for e.g., when the all components related to the Group Admin's abilities were completed. The second, working branch, was used as the current branch being worked upon. It would be pushed to more frequently, at the completion of any component and at the end of every coding session, along with a commit message indicating the progression of the development thus far.

## Data Structures
The data for Assignment Part2 is kept in a MongoDB No-SQL database named `chat-system`, which houses a number of collections, the main three of which are; `users`, `groups` and `rooms`.

`users` holds all the user data including a username, password, email and role. Here is an example: `{"id":0,"uname":"super","password":"superPassword","email":"super@gmail.com","role":"SuperAdmin"}`

`groups` holds a list of all the groups, their group id and group name. Here is an example: `{"id":0,"name":"Group1"}`

`rooms` holds a list of all the rooms, which includes the groupID of the group they belong to, a roomID and room name. Here is an example: `{"groupID":0,"roomID":0,"name":"room1"}`

There are also collections titled the name of a group, e.g. `Group1`, which includes a list of users, the room they belong to and if they are a group assisstant. Here is an example: `{"roomID":0,"userID":0,"groupAssis":false}`

And lastly collections titled 'groupName_roomName', e.g. `Group1_room1`, which includes an array of objects each holding a username, message string and the time the message was sent. This array represents the chat history of a room inside a group. Here is an example: `{"messages": [ {"userName":"*System*","message" :"*super has joined the chat.*","dateTime":"1:15 PM"}, {"userName":"super","message" :"hello chat!!","dateTime":"1:16 PM"} ] }`

## Node Server Architecture - REST API
The node server handles all the interaction with the database and is designed to handle most of the proccessing on its end and leave the Angular/Client side to deal with just obtaining the input variables and displaying the returned data. To do so a series of routes, 15 in total, were created, each handling a unique tasks and designed to be easily reusable. The routes make use of three models to stay consistant, in particular with creating new entries of data, they are a `User` model, `Group` model and `Room` model which are representative of their respective collections. Below is a list and description of each route:

1. `create_group` - Parameters: groupName; Returns: {"saved": true/false}; 
Purpose: This route checks that the name of the new group we want to create does not already appear in the `groups` collection. If it does not apppear, the number of existing groups are counted and the count is used as the new group's ID and the parsed 'groupName' as the group name. The new group is then inserted into the database and {"saved": true} is returned. If the name already exists, or if an error occurs {"saved": false} is returned.
2. `create_room` - Parameters: groupID, roomName; Returns: {"saved": true/false, "exists": true/false}; 
Purpose: This route grabs a list of rooms that are in the group corresponding the the parsed 'groupID', and checks if there is a room with a name matching the parsed 'roomName'. If there is no match a new room object is created with the two parsed varaiables and using the length of the list object for the 'roomID'. The new room is then inserted into the database and {"saved": true, "exists": false} is returned. If a matching room is found {"saved": false, "exists": true} is returned, or if an error occurs {"saved": false, "exists": false} is returned.
3. `create_user` - Parameters: userName, password, email, role; Returns: {"success": true/false, "exists": true/false}; 
Purpose: This route checks that the username of existing users does not match the parsed 'userName'. If there is no match the number of users is counted and the count is set as the 'id' of the new user along with all the other user details parsed in. The new user is then inserted into the database and {"success": true, "exists": false} is returned. If the username is taken already {"success": false, "exists": true} is returned, or if an error occurs {"saved": false, "exists": false} is returned.
4. `invite_users` - Parameters: groupName, roomName, userName; Returns: {"success": true/false, "exists": true/false}; 
Purpose: This route checks a user with the username of the parsed 'userName' exists, checks if that user is already in the room, and if the user does exist and is not in the room, the user is added to the room. If all goes well {"success": true, "exists": false} is returned, if the user is already in the room {"success": false, "exists": true} is returned and if the user doesn't exist or an erro occurs {"success": false, "exists": false} is returned.
5. `load_chat` - Parameters: groupName, roomName; Returns: data; 
Purpose: This route graps the chat history of the room 'roomName' from group 'groupName' from the database and returns it.
6. `load_group_info` - Parameters: id; Returns: data; 
Purpose: This route takes an integer representing the ID of a group, grabs all the rooms from the `rooms` collection with a groupID that matches the parsed 'id' and returns the data.
7. `load_group_users` - Parameters: Group Object; Returns: returnArray; 
Purpose: This route takes a group object and returns a list of users that are in the group and what rooms they have access to.
8. `load_group` - Parameters: NULL; Returns: data; 
Purpose: This route takes in no input, reads the data from the `groups` collection and returns the list of groups.
9. `login` - Parameters: uname, password; Returns: newUser; 
Purpose: This route takes in a username and password, checks if a user exists with matching username and password in the database. If found, all the user's details are returned along with a "valid" parameter set to true. If no user match is found, a blank user is returned along with a "valid" parameter set to false.
10. `remove_group` - Parameters: _id; Returns: {"removed": true/false}; 
Purpose: This route takes a group's objectID, deletes the group with a matching objectID decrements the groupID of any groups with a larger groupID, deletes any rooms from the `rooms` collection that belong to the deleted group and finally delete the collection named the same as the deleted group, if it exists. If all is successful {"removed": true} is returned, else {"removed": false} is returned.
11. `remove_room` - Parameters: groupID, groupName, roomName; Returns: {"removed": true/false}; 
Purpose: This route removes the room with a matching 'roomName' that belongs to the specified group (matching 'groupID'), decrements the roomID of any rooms with a larger roomID that belong to the group and deletes all docs in the collection sharing a name with the parsed 'groupName', that have a matching roomID. If all is successful {"removed": true} is returned, else {"removed": false} is returned.
12. `remove_users` - Parameters: groupName, roomID, userName; Returns: {"success": true/false, "exists": true/false}; 
Purpose: This route checks to see if a user with the specifed username exists then deletes the doc, from the collection sharing a name with the parsed 'groupName', which roomID and userID matches. If all is successful {"success": true, "exists": false} is returned, else {"success": false, "exists": false} is returned if the user does not exists either amongst the users or in the room and {"success": false, "exists": true} is returned if an error occurs.
13. `save_chat` - Parameters: groupName, roomName, messages; Returns: {"success": true/false}; 
Purpose: This route deletes the saved chat history in the data base of group 'groupName' and room 'roomName' and replaces it with the updated chat history stored in the 'messages' variable. It returns {"success": true} if everything goes well and {"success": false} if an error occurs.
14. `upgrade_to_ass` - Parameters: userName, groupName; Returns: {"success": true/false, "exists": true/false}; 
Purpose: This route checks if a user with a matching username exists and if that user exists in the group 'groupName'. Then will update every instance of that user (1 instance per room the user is in) so that the 'groupAssis' field is set to true. If all is successful {"success": true, "exists": false} is returned, else {"success": false, "exists": false} is returned if the user does not exists either amongst the users or in the group and {"success": false, "exists": true} is returned if an error occurs.
15. `upgrade_user` - Parameters: userName, role; Returns: {"success": true/false, "exists": true/false}; 
Purpose: This route checks to see if a user with a matching username exists, then checks if that user already has the role, or a higher role than we want to upgrade them to. If the user does exists and has a lower role than what we want to upgrade them to, the user's role is changed and {"success": true, "exists": true} is returned. If the user doesn't exist {"success": false, "exists": false} is returned and if the user already has the role or higher {"success": false, "exists": true} is returned.

## Angular Architecture 
For the Angular/Client side of the application all the pages of the web app were separated into their own component, totalling in 6 components. The main use of the components is to retrive input from the user, send the input to the appropriate routes on the server and then display the returned values. The client side also created 2 services, one for handling all calls to the routes and another for handling the sockets interactions. Below is a list of the components, services and a description of them:

Components:
1. `group-admin` : This component gives Super Admins and Group Admins the ability to create new groups, remove groups and navigate to the group-management component. 
2. `group-assis` : This component gives Group Assisstants the ability create new rooms/channels in a group and to select users that already exist within the group then add or remove them from rooms in the group.
3. `groups` : This component is the main page of the app, it displays all the groups the user is a part of, and once a group is selected all the rooms in the group and what users have access to what rooms are displayed. When a room that the user has access to is clicked the chat for that room opens and displays the chat's history. The user then have the ability to send messages to the chat that all users in the room can see and respond to. It also has a button for the user to access any abilities corresponding to the users role.
4. `group-management` : This component gives Super Admins and Group Admins the ability to create or remove rooms/channels, invite any user to any room or remove and existing user from a room, and finally upgrade any standard user to a Group Assisstant.
5. `login` : This component prompts the user to enter their username and password which is then authenticated and if successful the user's details are saved into localstorage.
6. `super-admin` : This component gives Super Admins the ability to create new users, upgrade users to Super Admin or Group Admin and navigate to the group-admin component.

Services:  
1. `database.service` : This service handles all the calls to the server routes in one place by having a function for each route that returns an observable to subscribe to.
2. `socket.service` : This service handles all the interactions with the socket and has a function to initiate a connection to the socket, to send a message through the socket and to create a observable for messages comming through the socket.

## Restore Database
Ensure Database Tools are installed and linked to system PATH: https://www.mongodb.com/try/download/database-tools?tck=docs_databasetools  
Then run: `$ mongorestore  dump/` ; from inside main folder.

## Testing
Integration testing on the server side routes was the only testing completed, to run the 23 tests run: `$ npm run-script test` ; from insider server folder.