var StuffWithUsers = {
    listUsers: function(loadFromServer) {
        var self = this;
        if (loadFromServer) {
            // Load data from server
            jQuery("#users > tbody").html($('#loading-server tbody').html());
            _.delay(function(){
                app.resources.User.refreshAll().then(function(users){
                    jQuery("#users > tbody").html(self.renderUsers(users));
                });
            },2000);
        } else {
            // Load data from local store
            jQuery("#users > tbody").html($('#loading-local tbody').html());
            _.delay(function(){
                var users = app.resources.User.getAll();
                jQuery("#users > tbody").html(self.renderUsers(users));
            },2000);
        }
    }
    , renderUsers: function(users) {
        var response = '';
        _.each(users, function(user){
            response += "<tr id='user-row-" + user.id + "'><td>" + user.id + "</td>" +
            "<td contentEditable='true'>" + user.name + "</td>" +
            "<td contentEditable='true'>" + user.email + "</td>" +
            "<td contentEditable='true'>" + user.phone + "</td>" +
            "<td><span data-id="+user.id+" class='glyphicon glyphicon-remove-sign'></span></td>" +
            "<td><span data-id="+user.id+" class='glyphicon glyphicon-ok'></span></td></tr>"

        });

        return response;
    }


    , createUser: function() {
        var self = this;
        var userData = {
            name : jQuery("#userName").val(),
            email : jQuery("#userEmail").val(),
            phone : jQuery("#userPhone").val()
        };

        app.resources.User.create(userData, {
            cacheResponse: true
        }).then(function(){
            self.listUsers();
        });
    }

    , deleteUser: function(userId) {
        var self = this;
        app.resources.User.destroy(userId).then(function(){
            self.listUsers(true);
        })
    }

    , updateUser: function(userData) {
        var self = this;
        app.resources.User.update(userData.id, userData).then(function(){
            self.listUsers();
        });
    }

    , listCats: function(){
        var container = jQuery("#cat-box");
        container.empty();
        var cats = app.resources.Cat.getAll();
        _.each(cats, function(cat){
            var template = "<div class='cat'><img src='"+cat.id+".png'><div class='details'>Name: " +cat.name+"<br />Fur: "+cat.fur+"</div></div>";
            container.append(template);
        })
    }
};