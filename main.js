
window.onload = function() {
	
	
	// animate the title card
	let title = document.getElementById("title-section").children[0];
	let title_text = title.innerHTML;
	for(let i=title_text.length-1;i>0;i--) {
		title_text =
			title_text.substring(0,i)+
			"</span><span>"+
			title_text.substring(i);
	}
	title.innerHTML = "<span>"+title_text+"</span>";
	for(let i=0;i<title.children.length;i++) {
		title.children[i].style.position = "relative";
	}
	setInterval(function(){
		for(let i=0;i<title.children.length;i++) {
			title.children[i].style.top = (Math.sin(i*.4+Date.now()/3e2)*10)+"px";
		}
	},10);
	
	// add in the project cards
	let projects = document.getElementById("project-cards");
	var xhttp = new XMLHttpRequest();
	xhttp.overrideMimeType("application/json");
	xhttp.open("GET","data/projects.json");
	xhttp.onreadystatechange = function() {
		if(xhttp.readyState==4 && xhttp.status==200) {
			for(let project of JSON.parse(xhttp.responseText)) {
				let elem = document.createElement("li");
				elem.className = "project-card";
				elem.innerHTML = project.name;
				let desc = document.createElement("p");
				desc.innerHTML = project.desc;
				elem.appendChild(desc);
				elem.onclick = function() {
					document.href = project.link;
				};
				console.log(project.demo);
				projects.appendChild(elem);
			}
		}
	};
	xhttp.onerror = function() {
		console.log("error");
	};
	xhttp.send();
	
};
