console.log("Script file connected");
window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');

	document.querySelector('#btnLogout').onclick = function logout(){
		if(loggedIn){
		//true
			req.session.destroy();
		    res.clearCookie('session-id');
		    res.redirect('/');
		} else{
		//false
			location.replace('/notAuth');
		}
	}
});