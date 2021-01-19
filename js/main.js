const DiscordRPC = require('discord-rpc');

var csInterface = new CSInterface()
var app_name = csInterface.getApplicationID()

console.log(csInterface.getApplicationID())

const clientId = '798305083833188372';

DiscordRPC.register(clientId);

var rpc = new DiscordRPC.Client({ transport: 'ipc' });
const startTimestamp = new Date();

function reloadDiscord(){

}


async function setFileName() {
	if(app_name == "PHXS"){
		csInterface.evalScript("app.activeDocument.name", function (filename) {
			rpc.setActivity({
				details: 'Photoshop',
				state: filename,
				startTimestamp,
				largeImageKey: 'phxs',
				largeImageText: 'Photoshop',
				smallImageKey: 'adobe',
				smallImageText: 'Adobe',
				instance: false,
			});
		});
	}

}

async function setActivity() {
	setFileName();
}

rpc.on('ready', () => {
	setActivity();

	// activity can only be set every 15 seconds
	setInterval(() => {
		setActivity();
	}, 15e3);
});

function login() {
	try {
		rpc.login({clientId});
	}
	catch (error) {
		document.getElementById("status").textContent = "Offline"
	}


}

