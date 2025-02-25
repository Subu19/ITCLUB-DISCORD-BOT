import * as setwelcomechannel from "./setwelcomechannel";
import * as register from "./register";
import * as generate from "./generate";
import * as setchatchannel from "./setchatchannel";
import * as reloadcommands from "./reloadcommands";
import * as disablechat from "./disablechat";
import * as disablewelcome from "./disablewelcome";
import * as help from "./help";
import * as ticket from "./ticket";
import * as resolve from "./resolve";
import * as setverifymessage from "./setverifymessage";
import * as setverifylog from "./setverifylog";

export const commands = {
    setwelcomechannel,
    register,
    generate,
    disablewelcome,
    reloadcommands,
    ticket,
    setverifylog,
    help,
    setverifymessage,
    resolve,
};

export const botCommands = [
    setverifymessage,
    setverifylog,
    setwelcomechannel,
    register,
    generate,
    disablewelcome,
    help,
    reloadcommands,
    ticket,
    resolve,
];
