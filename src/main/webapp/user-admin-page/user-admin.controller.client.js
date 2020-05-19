(function () {
    let users = []

    let $usernameFld, $passwordFld, $fnameFld, $lnameFld, $roleFld;
    let $removeBtn, $editBtn, $createBtn, $updateBtn;
    let $userRowTemplate, $tbody;
    const userService = new AdminUserServiceClient();
    let selectedUser = {}

    function main() {
        $tbody = $('tbody')
        $userRowTemplate = $('.wbdv-row-template')

        $createBtn = $('.wbdv-create')
        $updateBtn = $('.wbdv-update')
        $removeBtn = $('.wbdv-remove')
        $editBtn = $('.wbdv-edit')

        $createBtn.click(createUser)
        $updateBtn.click(updateUser)
        $removeBtn.click(deleteUser)
        $editBtn.click(selectUser)

        $usernameFld = $('.wbdv-usernameFld')
        $passwordFld = $('.wbdv-passwordFld')
        $fnameFld = $('.wbdv-fnameFld')
        $lnameFld = $('.wbdv-lnameFld')
        $roleFld = $('.wbdv-role')

        findAllUsers()


        for (let i = 0; i < users.length; i++) {
            const username = users[i].username
            const password = users[i].password
            const fName = users[i].first
            const lName = users[i].last
            const role = users[i].role

            const newUserRow = $(
                '<tr>' +
                '<td>' + username +
                '</td>' +
                '<td>' +
                password +
                '</td>' +
                '<td>' + fName +
                '</td>'
                +
                '<td>' +
                lName +
                '</td>' +
                '<td>' +
                role +
                '</td>' +
                '<td>' +
                '<span class="float-right">' +
                '<button class="fa-2x fa fa-times wbdv-remove">' +
                '</button>' +
                '<button class="fa-2x fa fa-pencil wbdv-edit">' +
                '</button>' +
                '</span>' +
                '</td>' +
                '</tr>')
            $tbody.append(newUserRow)
        }
        findAllUsers()
    }

    function createUser() {
        const username = $usernameFld.val()
        const password = $passwordFld.val()
        const first = $fnameFld.val()
        const last = $lnameFld.val()
        const role = $roleFld.val()

        const newUser = {
            username: username,
            password: password,
            first: first,
            last: last,
            role: role
        }

        userService.createUser(newUser)
            .then(function (actualUser) {
                users.push(actualUser)
                renderAllUsers()
               console.log(actualUser)
            })

    }

    function findAllUsers() {
        userService.findAllUsers()
            .then(function (allUsers) {
                users = allUsers
                renderAllUsers()
            })
    }

    function findUserById(event) {
        const target = event.currentTarget
        const $button = $(target)
        const userId = $button.attr('id')
        userService.findUserById(userId).then(function () {
            users = users.filter(function (user) {
                return user._id === userId
            })
            renderAllUsers()
        })
    }

    function deleteUser(event) {
        const target = event.currentTarget
        const $button = $(target)
        const userId = $button.attr('id')
        alert('delete user ' + userId)
        userService.deleteUser(userId)
            .then(function () {
                users = users.filter(function (user) {
                    return user._id !== userId
                })
                renderAllUsers()
            })
    }

    function selectUser(event) {
        const target = event.currentTarget
        const $button = $(target)
        const userId = $button.attr('id')
        userService.findUserById(userId)
            .then(function (user) {
                console.log(user)
                renderUser(user)
            })
    }

    function updateUser() {
        const updatedUser = {
            _id: selectedUser._id,
            username: $usernameFld.val(),
            first: $fnameFld.val(),
            last: $lnameFld.val(),
            role: $roleFld.val()
        }
        userService.updateUser(selectedUser._id, updatedUser)
            .then(function () {
                users = users.map(function (user) {
                    if (user._id === selectedUser._id) {
                        return updatedUser
                    } else {
                        return user
                    }
                })
            })
    }

    function renderUser(user) {
        selectedUser = user
        $usernameFld.val(user.username)
        $fnameFld.val(user.first)
        $lnameFld.val(user.last)
        $roleFld.val(user.role)
    }

    function renderAllUsers() {
        const template = $('.wbdv-user-row-template')[0]
        const $template = $(template)
        const clone = $template.clone()
        //console.log($template)
        // $tbody.empty()
        for (let i = 0; i < users.length; i++) {
            const user = users[i]
            //console.log(user)
            const copy = clone.clone()
            // copy.removeClass('wbdv-user-row-template')
            copy.find('.wbdv-username').html(user.username)
            copy.find('.wbdv-first-name').html(user.first)
            copy.find('.wbdv-last-name').html(user.last)
            copy.find('.wbdv-role').html(user.role)

            copy.find('.wbdv-remove')
                .attr('id', user._id)
                .click(deleteUser)

            copy.find('.wbdv-edit')
                .attr('id', user._id)
                .click(selectUser)
            $tbody.append(copy)
        }
    }

    $(main)
})();
