
console.log('Hello');

$(function () {

  var usersPath = $.get('http://localhost:3000/users/');
  var usersPermissions = $.get('http://localhost:3000/permissions/');

  var users = usersPath;
  console.log(users)
  var permissions = usersPermissions;

  var userName = function (name, id) {
	var tmpl = $('#user-template').html();
	var userTmpl = Handlebars.compile(tmpl);
	var output = userTmpl({
		name: name
	});
	  return output;
  }

  var userRights =  function (permissions) {
  	var tmpl = $('#permission-template').html();
  	var permTmpl = Handlebars.compile(tmpl);
  	var data = permTmpl({
  		// name: user.name,
  		// id: id,
  		permissions: permissions
  	});
  		return data;
  }

  $('.get-users').on('click', function () {
	// console.log('The button is working.');
	users.done(function (users) {
      users.forEach(function (user) {
        // console.log('get user', user.name, user.id);
        var output = userName(user.name);
        $('main').append(output)
        permissions.done(function (permissions) {
  		  permissions.forEach(function (rights) {
  		  	// console.log('permissions', rights)
  			if (user.id === rights.userId) {
  			  user.rights = rights.permissions
  			  // console.log('This is the user id and permissions per user', user)
  			  	$('main').on('click', 'li', function () {
  			  		$(this).parent().find('#btn')
  			  		// console.log('what is the id', dataId)
  			  		var data = userRights(permissions)
  			  		console.log('what is data', data)
  			  		$('body').append(data)
  			  	
  			    })

}
            })
  		  })
  		})
      })
    })	
  })

  			  		


































  			  		// var dataId = $('li').data('id');
  			  		// if (dataId) {
  			  		// 	var data = user.id
  			  		// }
