var app = {
    configDataStore: function() {
        this.store = new JSData.DS({
            keepChangeHistory: true
        });

        this.store.registerAdapter('http', new DSHttpAdapter({
            basePath:'http://localhost:3000/api'
        }), { default: true });

        this.defineResources();
        this.createCollections();
        this.defineTemplates();
        this.addEvents();
        this.addResourceEvents();
        this.addTimedUpdates();
        this.showResourceStats();
    }
    , defineResources: function() {
        this.resources = {};
        //USER resource
        this.resources.User = app.store.defineResource({
            name:'user'
            , endpoint:'users'
            , relations: {
                hasMany: {
                    cat: {
                        localFiled:'cats',
                        foreignKey:'userId'
                    }
                }
            }
        });

        //CAT resource
        this.resources.Cat = app.store.defineResource({
            name:'cat'
            , endpoint:'cats'
            , relations: {
                belongsTo: {
                    user: {
                        parent: true,
                        localKey: 'userId',
                        localField: 'user'
                    }
                }
            }
        });
    }
    , defineTemplates: function(){
        this.templates = {};
        this.templates.resourceStat = '<li class="list-group-item"><span class="badge">${items}</span>${name} </li>';
    }
    , createCollections: function () {
        this.collections = {};
        this.collections.usersCollection = this.store.createCollection('user');
    }


    , addEvents: function() {
        jQuery("#addUser").on('click', function(){
            StuffWithUsers.createUser();
        });

        jQuery("#users").on('click', '.glyphicon-remove-sign', function(ev){
            var target = $(ev.target);
            var userId = target.data("id");
            StuffWithUsers.deleteUser(userId);
        }).on('click', '.glyphicon-ok', function(ev){
            var target = $(ev.target);
            var userId = target.data("id");
            var targetUserRow = $("#user-row-"+userId);
            var userDomData = targetUserRow.find('td');
            var userData = {
                id:userId,
                name : $(userDomData[1]).html(),
                email : $(userDomData[2]).html(),
                phone : $(userDomData[3]).html()
            };
            StuffWithUsers.updateUser(userData);
        });


        jQuery('#loadUsersFromStore').on('click', function(){
            StuffWithUsers.listUsers();
        });

        jQuery('#loadUsersFromStorage').on('click', function(){
           StuffWithUsers.listUsers(true);
        });

        jQuery('#loadCatRelation').on('click', function(){
           var user = app.resources.User.getAll()[0];
            app.resources.User.loadRelations(user, ['cat']).then(function(){
                StuffWithUsers.listCats();
            })
        });
    }

    , showResourceStats: function() {
        var self = this;
        var statsContainer = $('#list-resources');
        var lastRefresh = $('#lastRefresh');
        statsContainer.empty();
        _.each(this.resources, function(resource) {
            var data = resource.getAll();
            var resourceStat = self.templates.resourceStat.replace('${items}', data.length).replace('${name}', resource.name);
            statsContainer.append(resourceStat);
        });

        lastRefresh.data('date', new Date());
    }

    , addResourceEvents: function(){
        var self = this;
        _.each(this.resources, function(resource) {
            var afterCreate = resource.afterCreate;
            resource.afterCreate = function() {
                self.showResourceStats();
                return afterCreate.apply(this, arguments);
            };

            var afterUpdate = resource.afterCreate;
            resource.afterUpdate = function() {
                self.showResourceStats();
                return afterUpdate.apply(this, arguments);
            };

            var afterInject = resource.afterCreate;
            resource.afterInject = function() {
                self.showResourceStats();
                return afterInject.apply(this, arguments);
            };

            var afterEject = resource.afterCreate;
            resource.afterEject = function() {
                self.showResourceStats();
                return afterEject.apply(this, arguments);
            };

            var afterDestroy = resource.afterCreate;
            resource.afterDestroy = function() {
                self.showResourceStats();
                return afterDestroy.apply(this, arguments);
            };
        });
    }

    , addTimedUpdates: function() {
        var lastRefresh = $('#lastRefresh');
        lastRefresh.data('date', new Date());
        setInterval(function(){
            var date = moment(new Date(lastRefresh.data('date')));
            lastRefresh.html(date.format('YYYY-DD-MM hh:mm:ss') + ' - ' + date.fromNow());
        }, 1000);
    }
};
