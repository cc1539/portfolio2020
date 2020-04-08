
function manageMenuPanel() {
	let menu_panel = document.getElementById("menu-panel");
	let content_panel = document.getElementById("content-panel");
	if(window.innerWidth>840) {
		menu_panel.style = "left:0;";
		content_panel.style = ""
	} else {
		menu_panel.style = "";
		content_panel.style = "width:calc(100% - 35px);"
	}
}

function randomLetter() {
	let palette =
		"abcdefghijklmnopqrstuvwxyz"+
		"abcdefghijklmnopqrstuvwxyz".toUpperCase()+
		"0123456789";
	let i = Math.floor(Math.random()*palette.length);
	return palette.substring(i,i+1);
}

window.onload = function() {
	
	manageMenuPanel();
	
	
	let button_names = ["about","projects","links","misc"];
	let menu_buttons = document.getElementsByClassName("menu-button");
	for(let i=0;i<button_names.length;i++) {
		let icon = document.createElement("span");
		icon.className = "menu-button-icon";
		let over_style = "animation-name: "+button_names[i]+"_icon_cycle;";
		let leave_style = "background-image:url('./assets/image/icons/"+button_names[i]+"/icon0.png');";
		icon.style = leave_style;
		menu_buttons[i].onmouseover = function() {
			icon.style = over_style;
			icon.className = "menu-button-icon menu-icon-animated";
		};
		menu_buttons[i].onmouseleave = function() {
			icon.style = leave_style;
			icon.className = "menu-button-icon";
		};
		let panel = document.getElementById("content-"+button_names[i]+"-panel");
		menu_buttons[i].onclick = function() {
			window.scroll(0,panel.getBoundingClientRect().top+window.scrollY);
		}
		menu_buttons[i].prepend(icon);
	}
	
	
	setInterval(function(){
		let misc_content = document.getElementById("content-misc-panel").querySelectorAll("p,li,h1");
		for(let i=0;i<misc_content.length;i++) {
			let inner_html = misc_content[i].innerHTML;
			misc_content[i].innerHTML = "";
			for(let j=0;j<inner_html.length;j++) {
				misc_content[i].innerHTML += randomLetter();
			}
		}
	},100);
	
	
	loadResource("assets/data/projects.json",function(responseText){
		buildProjectPanel(JSON.parse(responseText));
	});
	
};
window.onresize = manageMenuPanel;
