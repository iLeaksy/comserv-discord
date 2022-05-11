// Initial version: 1.0
// Idea given by Kralle, continued by Leaksy.

const Discord = require('discord.js');

require('discord-reply');

const client = new Discord.Client();


fs = require('fs');
var name = 'markeri_info.json';
var jsonData = JSON.parse(fs.readFileSync(name).toString());

client.login('bottoken');

const prefix = '!';

client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    
    
    if (command == 'cs'){  
        if(message.member.roles.cache.find(r => r.id === "929180242390696026")) {
            let role = message.member.guild.roles.cache.find(role => role.id === "927987216330915871");
            let member = message.mentions.members.first(); 
            if (member.id in jsonData)
            {        
                member.roles.add(role);
                jsonData[member.user.id] = parseInt(args[1]);
                fs.writeFileSync(name, JSON.stringify(jsonData));
            }
            else
            {
                member.roles.add(role);
                jsonData[member.user.id] = parseInt(args[1]);
                fs.writeFileSync(name, JSON.stringify(jsonData));
            }
            message.lineReply(" 🧹 User **" + member.user.username + "** has been sent to  **" + args[1] + "** day's in community service!");
        }else{
            message.lineReply(" 🧹 No Permissions");
        }

    }

     
    if (command == 'csfree'){  
        if(message.member.roles.cache.find(r => r.id === "929180242390696026")) {
            let role = message.member.guild.roles.cache.find(role => role.id === "927987216330915871");
            let member = message.mentions.members.first(); 
            if((jsonData[member.id] > 0)){     
              member.roles.remove(role);
              jsonData[member.id] == 0;
              fs.writeFileSync(name, JSON.stringify(jsonData));
              message.lineReply(" 🧹 User **" + member.user.username + "** has been set free!");
            } else {
             message.lineReply(" 🧹 User **" + member.user.username + "** is not in community service!");
            }
        } else { 
            message.lineReply(" 🧹 No Permissions");
        }

    }

    if (command == 'clean')
    {
        let role = message.member.guild.roles.cache.find(role => role.id === "927987216330915871");
        let member = message.author;
        if((member.id in jsonData) && (jsonData[member.id] > 0))
        {
            jsonData[member.id] -= 1;
            console.log(jsonData[member.id]);
            fs.writeFileSync(name, JSON.stringify(jsonData));
            
            if(jsonData[member.id] <= 0)
            {
                message.lineReply(" 🧹 You will be set free soon."); 
                message.guild.members.cache.get(message.author.id).roles.remove(role);
            }
            else
            {
                message.lineReply(" 🧹 You have  **" + jsonData[member.id] + "** markers left."); 
            }
        }
        else    
            message.lineReply(" 🧹 You have no markers left");
    }

    
});

  
// Big thanks to m-et for the code

client.on('presenceUpdate', (oldMember, newMember) => {
    const guild = newMember.guild;
    member = newMember;
    if (newMember.user.bot) return;
    
    activityLength = newMember.member.presence.activities.length;

    //check to see if the user has an activities, and if so, how many
    if (activityLength >0 ){
        console.log("member has " + activityLength + " activities");

        for (let i = 0; i < activityLength; i++) {         
          
        //Debugging messages to the log
        console.log("Activity in position " + i + " is " + newMember.member.presence.activities[i].name.toLowerCase());
        //console.log("now in lower case " + newMember.member.presence.activities[0].name.toLowerCase());
        //If you want to ban players of any other game than LOL, changer where it says league of legends to any other lowercase name of a game
        if (newMember.member.presence.activities[i].name.toLowerCase() == "league of legends") { // Started playing.
            console.log(`<a:banned:942166115373678602> ${newMember.user.tag} has been banned for playing LOL <a:banned:942166115373678602>`);
            try{
                guild.members.ban(`${newMember.user.id}`, {reason: 'Playing League Of Legends'}).catch((err) => {
                console.error(err);
                var x = err.message;});
                break;
            }
            catch(err){    
            }
        }
    }
    } else {
        console.log("member has no activities");
    }
});
} 