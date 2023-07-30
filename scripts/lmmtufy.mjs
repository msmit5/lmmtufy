/*
▓█████▄  ██▀███           ▒█████  
▒██▀ ██▌▓██ ▒ ██▒        ▒██▒  ██▒
░██   █▌▓██ ░▄█ ▒        ▒██░  ██▒
░▓█▄   ▌▒██▀▀█▄          ▒██   ██░
░▒████▓ ░██▓ ▒██▒ ██▓    ░ ████▓▒░
 ▒▒▓  ▒ ░ ▒▓ ░▒▓░ ▒▓▒    ░ ▒░▒░▒░ 
 ░ ▒  ▒   ░▒ ░ ▒░ ░▒       ░ ▒ ▒░ 
 ░ ░  ░   ░░   ░  ░      ░ ░ ░ ▒  
   ░       ░       ░         ░ ░  
 ░                 ░              
 */

 const MOD_NAME = "lmmtufy";


let lmmtufy_socket;
Hooks.once("socketlib.ready", () => {
  // socketlib is activated, lets register our function
	lmmtufy_socket = socketlib.registerModule("lmmtufy");	
	lmmtufy_socket.register("_runMacro", _runMacro);
});

function _runMacro(macro, ...args){
    let m = game.macros.getName(macro);
    let author = m?.data?.author;
    if (author === undefined){
      return "Error: Macro", macro, "not found on client";
    }
    if (author.isGM){
      return m.execute(args);
    }
    else{
      console.error("Player tried to execute non-gm macro on your client!")
    }
}

export function runMacroAs(player, macro, ...args){
  if (game.user.isGM){
    let playerId = game.users.getName(player).id;
    return lmmtufy_socket.executeAsUser("_runMacro", playerId, macro, args);
  }
}
window.runMacroAs = runMacroAs;
