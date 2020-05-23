
function getClassElem(parent,className) {
	return parent.getElementsByClassName(className)[0];
}

function buildProjectPanel(json) {
	
	let project_panel = document.getElementById("content-projects-panel");
	
	// create prototype (forgive me)
	let container = document.createElement("div");
	container.className = "project";
	let title_bar = document.createElement("div");
	title_bar.className = "title-bar";
	container.appendChild(title_bar);
	let toggle = document.createElement("img");
	toggle.src = "assets/image/arrow.png";
	toggle.className = "toggle toggle-close";
	title_bar.appendChild(toggle);
	let name = document.createElement("p");
	name.className = "project-name";
	title_bar.appendChild(name);
	let content = document.createElement("div");
	content.className = "project-content";
	container.appendChild(content);
	let image_panel = document.createElement("div");
	image_panel.className = "project-image-panel";
	content.appendChild(image_panel);
	let image = document.createElement("img");
	image.className = "project-image";
	image_panel.appendChild(image);
	let desc = document.createElement("p");
	desc.className = "project-desc";
	content.appendChild(desc);
	
	json.forEach(function(project){
		let instance = container.cloneNode(true);
		let closed = true;
		let toggle_button = getClassElem(instance,"toggle");
		getClassElem(instance,"project-name").innerHTML = project.name;
		getClassElem(instance,"title-bar").onclick = function() {
			if(closed) {
				toggle_button.className = "toggle toggle-open";
				instance.style = "height:500px;";
			} else {
				toggle_button.className = "toggle toggle-close";
				instance.style = "";
			}
			closed = !closed;
		};
		getClassElem(instance,"project-image").src = project.image;
		getClassElem(instance,"project-desc").innerHTML = project.desc;
		project_panel.appendChild(instance);
	});
	
}
