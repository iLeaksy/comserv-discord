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
            message.lineReply(" 🧹 Nemate permisije!");
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
            message.lineReply(" 🧹 Nemate permisije!");
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

  



// Checking for user presence - Will be needed for further bot development.
/* 
client.on('presenceUpdate', (oldMember,newPresence) => {
    if (newPresence.activities[1] == 'ISEE' || oldMember.activities[1] == 'ISEE') {
        const retardiran = client.users.cache.get(newPresence.user.id);
        const retardalert = client.channels.cache.get('937715399091445860')
        console.log('user with id  ' + retardiran + ' is playing LEAGUE OF LEGENDS');
        retardiran.send('League of Legends - Detected. If you don\'t turn off your game, you will be banned from the server. ');
        retardalert.send(' <@${retardiran}>  upali leage of legends'); 
         
    } else {
        if(newPresence.activities[1] ~= nil  || oldMember.activities[1] ~= nil) 
        console.log('[USER-ID] ' + retardiran + ' started playing ' + newPresence.activities[1] + ' , before that he was playing ' + oldMember.activities[1]);
    }
});
 */