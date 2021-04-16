/* this file contains middleware functions that 
define what a user can do based on their role */
const { ROLE } = require('../roles');


//allows user to edit a project
function canEditProject(user, project){
	return(
		user.role === ROLE.ADMIN || 
		project.userId === user.id
		)
}
//sets the scope of what a user can see
//will change this later
function scopedProjects(user, projects){
	if(user.role === ROLE.ADMIN){
		return projects;
	};
	return projects.filter(project => project.userId === user.id);
}
//determines if a user can delete a project
function canDeleteProject(user, project){
	return (
		project.userId === user.id ||
		user.role === ROLE.ADMIN);
}
module.exports = {
	//canViewProject,
	scopedProjects,
	canDeleteProject,
	//canViewPageAdmin
}





