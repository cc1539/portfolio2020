
let mobile_thresh = 840;

let menu_panel;
let content_panel;

function updatePageFormat() {
	if(window.innerWidth>mobile_thresh) {
		menu_panel.style = "left:0;";
		content_panel.style = "";
		document.documentElement.style.setProperty("--content-padding","50px");
	} else {
		menu_panel.style = "";
		content_panel.style = "width:calc(100% - 35px);";
		document.documentElement.style.setProperty("--content-padding","20px");
	}
}

window.onload = function() {
	
	menu_panel = document.getElementById("menu-panel");
	content_panel = document.getElementById("content-panel");
	
	updatePageFormat();
	
	menu_panel.addEventListener("mouseover",function(){
		menu_panel.className = "menu-panel-hover";
	});
	
	menu_panel.addEventListener("mouseleave",function(){
		menu_panel.className = "";
	});
	
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
			if(window.innerWidth<=mobile_thresh) {
				menu_panel.className = "";
			}
		}
		menu_buttons[i].prepend(icon);
	}
	
	loadResource("assets/data/projects.json",function(responseText){
		buildProjectPanel(JSON.parse(responseText));
	});
	
};

window.onresize = updatePageFormat;
