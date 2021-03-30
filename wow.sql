-- to generate user
insert into users(firstname, lastname, username, password, email, points, role_id, createdAt, updatedAt) values (
"Monier", "Abdullah",
"Monier", "pass", "graphinetime@gmail.com",
104, 1, "2020-08-4", "2020-08-3");
insert into users(firstname, lastname, username, password, email, points, role_id, createdAt, updatedAt) values (
"Zakariya", "Ahmed",
"Zakariya", "pass", "ahmedzakariya355@gmail.com",
103, 0, "2020-08-4", "2020-08-3");
insert into users(firstname, lastname, username, password, email, points, role_id, createdAt, updatedAt) values (
"Kevin", "Longworth", 
"Kevin", "pass", "omunam10@gmail.com",
102, 0, "2020-08-4", "2020-08-3");
insert into users(firstname, lastname, username, password, email, points, role_id, createdAt, updatedAt) values (
"Muaz", "Alhaidar", 
"Muaz", "pass", "muazalhaidar@gmail.com",
101, 0, "2020-08-4", "2020-08-3");
insert into users(firstname, lastname, username, password, email, points, role_id, createdAt, updatedAt) values (
"Steve", "Cunningham",
"Steve", "pass", "omunam10@gmail.com",
23, 0, "2020-08-4", "2020-08-3");
insert into users(firstname, lastname, username, password, email, points, role_id, createdAt, updatedAt) values (
"Adrian", "Carter",
"Adrian", "pass", "omunam10@gmail.com",
95, 0, "2020-08-4", "2020-08-3");
insert into users(firstname, lastname, username, password, email, points, role_id, createdAt, updatedAt) values (
"Clyde", "Graves",
"Clyde", "pass", "omunam10@gmail.com",
75, 0, "2020-08-4", "2020-08-3");
insert into users(firstname, lastname, username, password, email, points, role_id, createdAt, updatedAt) values (
"Sylvia", "Tate",
"Sylvia", "pass", "omunam10@gmail.com",
64, 0, "2020-08-4", "2020-08-3");
insert into users(firstname, lastname, username, password, email, points, role_id, createdAt, updatedAt) values (
"Pheobe", "Campbell",
"Pheobe", "pass", "omunam10@gmail.com",
92, 0, "2020-08-4", "2020-08-3");
insert into users(firstname, lastname, username, password, email, points, role_id, createdAt, updatedAt) values (
"Anaki", "Wi",
"Anaki", "pass", "omunam10@gmail.com",
33, 0, "2020-08-4", "2020-08-3");
insert into users(firstname, lastname, username, password, email, points, role_id, createdAt, updatedAt) values (
"Andrew", "Marsh",
"Andrew", "pass", "omunam10@gmail.com",
51, 0, "2020-08-4", "2020-08-3");
insert into users(firstname, lastname, username, password, email, points, role_id, createdAt, updatedAt) values (
"Shawn", "Carroll",
"Shawn", "pass", "omunam10@gmail.com",
66, 0, "2020-08-4", "2020-08-3");
insert into users(firstname, lastname, username, password, email, points, role_id, createdAt, updatedAt) values (
"Steven", "Perkins",
"Steven", "pass", "omunam10@gmail.com",
99, 0, "2020-08-4", "2020-08-3");
insert into users(firstname, lastname, username, password, email, points, role_id, createdAt, updatedAt) values (
"Eric", "Donnelly",
"Eric", "pass", "omunam10@gmail.com",
47, 0, "2020-08-4", "2020-08-3");
insert into users(firstname, lastname, username, password, email, points, role_id, createdAt, updatedAt) values (
"Cohh", "Vaughn",
"Cohh", "pass", "omunam10@gmail.com",
82, 0, "2020-08-4", "2020-08-3");

-- To generate an group
-- insert into events  (Name, ContactInfo, createdAt, updatedAt) values ("Muaz's group", "kinda sus", "2020-08-4", "2020-8-1");
insert into groups(Name, ContactInfo, createdAt, updatedAt) values (
"AI-3 C635 Team",
"Send emails to Johnathan at jpon@gmail.com"
, "2020-08-4", "2020-8-1");
insert into groups(Name, ContactInfo, createdAt, updatedAt) values (
"IT Team",
"Email me at tyler@gmail.com

I am the IT regional Manager"
, "2020-08-4", "2020-8-1");
insert into groups(Name, ContactInfo, createdAt, updatedAt) values (
"Project 5 Team",
"Team Lead: Johnathan Kline
Email: teller@gmail.com
Phone: 313-222-5656

Please give me some time to respond to emails and requests.
Forward questions to my secretary."
, "2020-08-4", "2020-8-1");
insert into groups(Name, ContactInfo, createdAt, updatedAt) values (
"The Tossers fanclub",
"Folk Rock yea"
, "2020-08-4", "2020-8-1");

-- to generate groupmember
insert into groupmembers(User, groupmembers.Group, Manager, createdAt, updatedAt) values (
2, 1,
false,
"2020-08-4", "2021-2-2");
insert into groupmembers(User, groupmembers.Group, Manager, createdAt, updatedAt) values (
3, 1,
false,
"2020-08-4", "2021-2-2");
insert into groupmembers(User, groupmembers.Group, Manager, createdAt, updatedAt) values (
4, 1,
false,
"2020-08-4", "2021-2-2");
insert into groupmembers(User, groupmembers.Group, Manager, createdAt, updatedAt) values (
3, 2,
false,
"2020-08-4", "2021-2-2");
insert into groupmembers(User, groupmembers.Group, Manager, createdAt, updatedAt) values (
4, 3,
false,
"2020-08-4", "2021-2-2");

-- To generate an event
-- insert into events  (Name, Description, Address, Time, createdAt, updatedAt) values ("I remmber life in the womb it's hazy", "safe naked wet and warm and lazy", "my house", "2020-08-04", "2021-8-4", "2020-1-2");
insert into events  (Name, Description, Address, Time, createdAt, updatedAt) values (
"Curb Watchers",
"Need members to help with side project.

This program will keep track of Reddit threads of a certain regex, watch them till archive, and store them in an SQL database."
, "4821 Salmon St., MI", "2021-02-22 06:30:20",
"2021-8-4", "2020-1-2");
insert into events  (Name, Description, Address, Time, createdAt, updatedAt) values (
"Github repo weekly reviewings",
"A weekly event where we go to a random open source github repo and look at the source code 
to get a better idea of how to program from more experienced developers.

We will be then trying to make our own open source projects and try to get people from the 
github community to add to them. As a result we will learn about what developers might be interested in.
What other hobbies they might have and what some communities may feel they lack when 
it comes to software for their hobbies."
, "4821 Salmon St., MI", "2021-02-22 06:30:20",
"2021-8-4", "2020-1-2");
insert into events  (Name, Description, Address, Time, createdAt, updatedAt) values (
"Blender modeling workshop",
"Hi, I have been wanting to do a workshop on the modeling tools in blender.
This workshop will occur over the course of two weeks where I will be teaching 
the basics of blender modeling and giving out a project for each workshop member 
to do to put their knowledge to practice."
, "4821 Salmon St., MI", "2021-02-22 06:30:20",
"2021-8-4", "2020-1-2");
insert into events  (Name, Description, Address, Time, createdAt, updatedAt) values (
"Pizza Party!!",
"Hello everyone, there is going to be a pizza party on tuesday 
in the HR office for Alison's new promotion!"
, "4821 Salmon St., MI", "2021-02-22 06:30:20",
"2021-8-4", "2020-1-2");

-- to generate eventmember
-- insert into eventmembers(user, event, attended, rsvp, manager, createdAt, updatedAt) values (1,1, true, true, false, "2020-08-4", "2019-4-3");
insert into eventmembers(user, event, attended, rsvp, manager, createdAt, updatedAt) values (
1, 1, true, true, false,
"2020-08-4", "2019-4-3");
insert into eventmembers(user, event, attended, rsvp, manager, createdAt, updatedAt) values (
3, 1, false, false, false,
"2020-08-4", "2019-4-3");
insert into eventmembers(user, event, attended, rsvp, manager, createdAt, updatedAt) values (
4, 1, true, true, false,
"2020-08-4", "2019-4-3");
insert into eventmembers(user, event, attended, rsvp, manager, createdAt, updatedAt) values (
5, 1, true, true, false,
"2020-08-4", "2019-4-3");




insert into eventmembers(user, event, attended, rsvp, manager, createdAt, updatedAt) values (
2, 1, false, false, true,
"2020-08-4", "2019-4-3");
insert into eventmembers(user, event, attended, rsvp, manager, createdAt, updatedAt) values (
3, 2, true, false, false,
"2020-08-4", "2019-4-3");
insert into eventmembers(user, event, attended, rsvp, manager, createdAt, updatedAt) values (
3, 3, false, false, false,
"2020-08-4", "2019-4-3");
insert into eventmembers(user, event, attended, rsvp, manager, createdAt, updatedAt) values (
3, 4, true, false, false,
"2020-08-4", "2019-4-3");
