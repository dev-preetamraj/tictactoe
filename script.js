$(document).ready(function(){

	window.chance = 1; // For alternative chances of X and O Here, 1-> X, 0-> O 
	window.totalChancesPlayed = 0; // For removing clearing the board automatically if the moves reach 9

	var clearBoard = $("#btnset"); //clearBoard Btn
	var start = $("#btnstart"); //Restart btn
	
	var liSelector = $("li");
	var music = new Audio();
	music.src = 'media/chalu.mp3';
	var winMusic = new Audio();
	winMusic.src = 'media/win.mp3';
	

	var player1=0;player2=0;tie=0; // variables for counting no. of wins of X and O
	var p1 = document.getElementById("p1won");
	var ti = document.getElementById("tie") 
	var p2 = document.getElementById("p2won")
	

	function clearBord(){
		for (var i = 0 ; i <=liSelector.length-1 ; i++) {
			liSelector[i].textContent = '';
			result.innerHTML = '';
		}
		window.chance = 1;
		window.totalChancesPlayed = 0;
	};


	function restart(){   // Restart function is similar to clearbord function but on restart the the counting should agin start from 0.
		for (var i = 0 ; i <=liSelector.length-1 ; i++) {
			liSelector[i].textContent = '';
			result.innerHTML = '';
		}
		window.chance = 1;
		window.totalChancesPlayed = 0;
		player1=0;player2=0;tie=0;
		p1.innerHTML = player1;
		p2.innerHTML = player2;
		ti.innerHTML = tie;
	};

	start.on("click",restart)
	clearBoard.on("click", clearBord)
	
	const array=["012","345","678","036","147","258","048","246"];
	function checker(){
		for(var i=0;i<array.length;i++){
			
			if ((liSelector[array[i][0]].textContent!=='' 
				&& liSelector[array[i][1]].textContent!=='' 
				&& liSelector[array[i][2]].textContent!=='') 
				&& (liSelector[array[i][0]].textContent===liSelector[array[i][1]].textContent) 
				&& (liSelector[array[i][1]].textContent===liSelector[array[i][2]].textContent) 
				)
			{	if (liSelector[array[i][0]].textContent == "X"){
					player1+=1
					p1.innerHTML = player1;
				}
				else if(liSelector[array[i][0]].textContent == "O"){
					player2+=1
					p2.innerHTML = player2;
				}
				
				// (I think that a proper way to ask if a new match should be started or not should be asked!)
				result.innerHTML=liSelector[array[i][0]].textContent+" WON The Last Match!";
				winMusic.play();
				setTimeout(clearBord,2000); // delay in between
			} else if(window.totalChancesPlayed == 9){
				tie+=1
				ti.innerHTML = tie;
				result.innerHTML="NO One WON The Last Match!";
				setTimeout(clearBord,2000);
				break
			}
		}
		
	}

	function addText(){
		if(this.textContent===''){
			if(window.chance == 1){
				this.textContent="X"
				
				this.style.color = 'black';
				window.chance = 0;
				window.totalChancesPlayed +=1;
				music.play();
			} else{
				this.textContent = 'O';
				
				this.style.color = 'red';
				window.chance = 1;
				window.totalChancesPlayed +=1;
				music.play();
			}
			checker();
		}
		
	}
	for (var i = 0; i < liSelector.length; i++) {
		liSelector[i].addEventListener('click', addText)
	}
});
