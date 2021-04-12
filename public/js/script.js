console.log("Script file connected");
window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');

	document.querySelector('#btnLogout').onclick = function logout(){
		if(loggedIn){
			this.innerHTML = 'Logout';
		//true
		   location.replace('/logout');
		} else{
		//false
			this.innerHTML = 'Sign in';
			location.replace('/login');
		}
	}
});