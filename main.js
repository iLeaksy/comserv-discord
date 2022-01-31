const Discord = require('discord.js');

require('discord-reply');

const client = new Discord.Client();

fs = require('fs');
var name = 'markeri_info.json';
var jsonData = JSON.parse(fs.readFileSync(name).toString());


const prefix = '!';

 

client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    
    
    if (command == 'kazni'){  
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
            message.lineReply(" 🧹 Korisnik  **" + member.user.username + "** je poslat na  **" + args[1] + "** marker/a!");
        }else{
            message.lineReply(" 🧹 Nemate permisije!");
        }

    }

     
    if (command == 'oslobodi'){  
        if(message.member.roles.cache.find(r => r.id === "929180242390696026")) {
            let role = message.member.guild.roles.cache.find(role => role.id === "927987216330915871");
            let member = message.mentions.members.first(); 
            if((jsonData[member.id] > 0)){     
              member.roles.remove(role);
              jsonData[member.id] == 0;
              fs.writeFileSync(name, JSON.stringify(jsonData));
              message.lineReply(" 🧹 Korisnik  **" + member.user.username + "** je skinut sa markera!");
            } else {
             message.lineReply(" 🧹 Korisnik  **" + member.user.username + "** nije na markerima!");
            }
        } else { 
            message.lineReply(" 🧹 Nemate permisije!");
        }

    }

    if (command == 'ocisti')
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
                message.lineReply(" 🧹 Ocistili ste sve markere."); 
                message.guild.members.cache.get(message.author.id).roles.remove(role);
            }
            else
            {
                message.lineReply(" 🧹 Preostalo vam je jos  **" + jsonData[member.id] + "** marker/a."); 
            }
        }
        else    
            message.lineReply(" 🧹 Nemate markere za ocistiti!");
    }

   // ban if user is playing leage of legends

    if (command == 'cigan'){
            // varijable i toj takoj
            let member = message.author;
            var game1 = member.presence.activities[1];
            var game2 = member.presence.activities[2];
            // prints
           // message.lineReply("Game Playing - **" + game1 + "** Time In Game **" + game2 + "**");
            if (member.presence.activities[1] == 'ISEE') {
                message.lineReply("Cigan igra : **league of legends**");
            }
            else {
                message.lineReply("Cigan ne igra: **league of legends**! ");
            }


    }
    
});

  

client.login('sexy_token');


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
 