const express = require('express');
const router = express.Router();
const User = require("../users/Model.ts");
const Event = require("./EventModel.ts");
const EventMember = require("./EventMember.ts");
const Sequelize = require("sequelize")
const {or, and, gt, lt} = Sequelize.Op;
const _config = require("../config/keys.ts")
const lib = require("../lib.ts");
const sequelize = new Sequelize(_config.database, _config.user, _config.pass, {
    dialect: 'mariadb',
    logging: false
})

/* @route GET api/events
 * @desc Get all the events
 */
router.get("/getall", async (req,res)=>{
    const id = parseInt(req.query.id)
    console.log(id)
    if(! isNaN(id) && id!=-1){
        const query = await sequelize.query(`select events.*,RSVP from events join (select  Event,sum(RSVP) as RSVP from eventmembers where ((User=${id} and Manager =false) or (User!=${id} and Manager is true)) group by Event) as c on c.Event = events.id;`)


            .then(ret => {
                res.status(200).send(ret[0]);
                return;
            })
            .catch(err => {res.sendStatus(404)})
    }
    else{
        Event.findAll()
            .then(ret => {
                const values = ret.map(x => x.dataValues);
                res.status(200).send(values);
            })
            .catch(err => {res.sendStatus(404)})
    }
    // .catch(err => {res.sendStatus(404)})

})
/* @route POST api/events/new
 * @desc Create a new event
 false*/
router.post("/new", (req,res)=>{
    Event.create({ Name: req.body.Name ,Description: req.body.Description ,Address: req.body.Address ,Time: req.body.Time })
        .then(ret =>   {
            EventMember.create({ User: req.body.Manager ,Event: ret.dataValues.id ,Attended: false ,RSVP: false ,Manager:true })
                .then(ret2 => {
                        console.log(ret.dataValues)
                    res.status(200).send({Event:ret.dataValues, Member:ret2.dataValues})
                    
                })
                .catch(err => {res.status(403).send(err)})

        })
        .catch(err => res.status(404).send(err))


})


/* @route GET api/events/get/$id
 * @desc Retrieve infromation about an event
 */
router.get("/get", (req, res)=>{
    Event.findOne({
        where:{id:req.query.id}
    })
        .then(ret => {
            if(ret===null){
                res.status(200).send("");
            }
            else
                res.status(200).send(ret)
        })
        .catch(err =>  res.status(403).send(err))
})


router.post("/update", (req, res)=>{
    Event.findOne({where:{id:req.body.id}})
        .then(ret => {
            Event.update({Name: req.body.Name ,Description: req.body.Description ,Address: req.body.Address ,Time: req.body.Time}, {where:{id:req.body.id}})
                .then(ret2=>{
                    if(ret2[0]===0)
                        res.status(404).send("Didn't found event")
                    else
                        res.status(200).send({Event:{ Name: req.body.Name ,Description: req.body.Description ,Address: req.body.Address ,Time: req.body.Time} })
                })
        })
        .catch(err => res.status(404).send("Unable to update event") )

})

router.post("/delete", (req, res)=>{
    // NOTE
    // At this poitn, I cant be fecking bothered to get 
    // notifications ot members when an event is deleted in.
    EventMember.destroy({ where: {Event: req.body.id}})
        .then( ret=>{
            Event.destroy({where:{id: req.body.id}})
                .then(ret => {
                    if(ret===0) {res.sendStatus(404)}
                    else res.sendStatus(200);
                    return
                })
                .catch( err => { res.status(404).send(err); return})
        })
        .catch( err => { res.status(404).send(err); return})
})

/* @route POST api/events/signin
 * @desc Sign in a number of people
 * @body {Event:EventId, Invited:[User1Id, User2Id]}
 */
router.post("/signin", (req, res)=>{
    let users = req.body.Invited
    let Event = req.body.Event
    users.forEach((value)=> {
    })
    res.sendStatus(200)

})


/* @route POST api/envite/rsvp
 * @desc User signs in to an event
 *@body {Event:EventId, User:UserId} */
router.post("/rsvp", async (req, res)=>{
    let user = req.body.User
    let event = req.body.Event
    // let entry = await EventMember.findOne({where:{Event:event, User:user}, attributes:["RSVP"]}, )
    let entry= await EventMember.findOne({where:{Event:event, User:user}})
    if(entry === null){
        let result = await  EventMember.findOrCreate({defaults:{Event:event, User:user, RSVP:false, Attended:false, Manager:false}, where:{User:user, Event:event}} )

    }
    else{
        // let result = await  EventMember.findOrCreate({defaults:{Event:event, User:user, RSVP:entry.dataValues.RSVP, Attended:false, Manager:false}, where:{User:user, Event:event}} )
        let result = await EventMember.update({ RSVP: Sequelize.literal('NOT RSVP') }, { where: { User:user, Event:event } });
    }
    /*
     */


    res.status(200).send();

})


// TODO This can lead to security exploit, of people transfering event ot yourself
/* @route POST api/events/transfer
 * @desc Transfer event to another user
 * @body {Event:EventId, Manager:UserId}
 */
router.post("/transfer", async (req, res)=>{
    let user = req.body.Manager
    let event = req.body.Event;
    let main = req.body.Main
    console.log(user, event, main)
    if(user===undefined){res.sendStatus(404); return}
    if(event===undefined){res.sendStatus(404); return}
    if(main===undefined){res.sendStatus(404); return}
    EventMember.update({User:user}, {where:{User:main, Event:event}}) .then(res=>{console.log(res)})
    EventMember.destroy({where:{User:user, Event:event}})
    // EventMember.update({User:user}, {where:{User:main, Event:event, RSVP:false, Invited:false}}) .then(res=>{console.log(res)})
    res.sendStatus(200)
})

/*
 * @route POST api/events/getmembersevents?=id
 * @desc Get all events that an eventmember is invited to
 * body {id:User's id}
 */
router.post("/man", async (req, res)=>{
    let id = req.body.id
    if(id===undefined){
        res.sendStatus(404)
    }
    else{
        const eventmembers = await sequelize.query(`select mang.id, mang.Name, mang.Description, mang.Address, mang.Time, users.firstname, users.lastname,  users.id as userid, users.points  from (select events.*  from eventmembers join events on
events.id = eventmembers.Event where eventmembers.Manager=true and eventmembers.User=${id} ) as mang join eventmembers on eventmembers.Event = mang.id join users on eventmembers.User = users.id where eventmembers.Manager=false ;`)
        // const myevents = await sequelize.query(`select events.* from events join eventmembers on eventmembers.User=${id} where eventmembers.Manager =true;`);
        const myevents = await sequelize.query(`select events.* from eventmembers join events on eventmembers.Manager=true and eventmembers.Event = events.id and eventmembers.User=${id};`)

        console.log(myevents[0])
        // console.log(eventmembers[0])
        res.send({eventmembers:eventmembers[0], events:myevents[0]}).status(200)

    }
})

/* 
 * @route GET api/events/leaderboard
 * @desc Get all users and hteri poitns
 */
router.get("/leaderboard", async(req, res)=>{
    let users = await User.findAll({attributes:["username", "points", "firstname", "lastname"]});
    res.send(users).status(200)
})

/* @route POST api/events/email
 * @desc Send an email to all those who are RSVP to an event
 * @body {id:event's id, subject, body}
 */
router.post("/email", async(req,res)=>{
    const query = await sequelize.query(`select users.email from users JOIN eventmembers ON eventmembers.User=users.id AND eventmembers.Event=${req.body.id};`)
    // console.log(req.body.id)
    // console.log(query[0])
    const emails = query[0].map(i=> i.email)
    lib.email(emails, req.body.subject, req.body.body)
    res.sendStatus(200)

})

// @route POST api/users/get_members
// @desc Get those who are RSVP to an event, and those that aren't
// @return {RSVP:[user], not:[user]}
router.post("/get_members", async (req, res)=>{
    let users = await sequelize.query("select users.username, users.firstname, users.lastname, eventmembers.id from eventmembers  join users on users.id=eventmembers.User ;")
    users=users[0];
    // TODO get user's name
    res.status(200).send(users)


})

router.post("/update-points", async(req,res)=>{
    let users=  req.body.users;
    users.forEach(user=>{
        User.update({points: user.points}, {where:{id:user.id}});
    })
    res.sendStatus(200)
})
export {}
module.exports = router;
