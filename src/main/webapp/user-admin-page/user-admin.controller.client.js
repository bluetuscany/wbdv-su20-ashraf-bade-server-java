import * as users from "./jszip";

(function () {
    let $usernameFld, $passwordFld, $fnameFld, $lnameFld, $roleFld;
    let $removeBtn, $editBtn, $createBtn, $updateBtn;
    let $userRowTemplate, $tbody;
    const userService = new AdminUserServiceClient();
    let selectedUser = {}

    function main() {
        $tbody = $('tbody')
        $createBtn = $('.wbdv-add-btn')
        $createBtn.css('backgroundColor', 'yellow')

        $createBtn.click(createUser)
        $updateBtn.click(updateUser)

        $usernameFld = $('.wbdv-username-fld')
        $passwordFld = $('.wbdv-password-fld')
        $fnameFld = $('.wbdv-first-fld')
        $lnameFld = $('.wbdv-last-fld')
        $roleFld = $('.wbdv-role-fld')

        findAllUsers()

        // fetch all  H1s elements from HTML document
        const h1 = jQuery('h1')
        h1.css('color', 'red')

        const tr = jQuery('tr')
        tr.css('backgroundColor', 'blue')
            .css('color', 'white')

        const h2 = jQuery('<h2>Hello from jQuery</h2>')
        const body = jQuery('body')
        body.append(h2)

        const newTr = $('<tr><td>dan</td></tr>')
        $tbody.append(newTr)

        for (let i = 0; i < users.length; i++) {
            const username = users[i].username
            const newUserRow = $('<tr><td>' + username + '</td></tr>')
            $tbody.append(newUserRow)
        }
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
            })
    }

    function findAllUsers() {
        userService.findAllUsers()
            .then(function (allUsers) {
                users = allUsers
                renderAllUsers()
            })
    }

    function findUserById() {
    }

    function deleteUser(event) {
        const target = event.currentTarget
        const $button = $(target)
        const userId = $button.attr('id')
        // alert('delete user ' + userId)
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
        const template = $('.wbdv-user-row-template')[0]
        const $template = $(template)
        const clone = $template.clone()
        // console.log($template)
        $tbody.empty()
        for (let i = 0; i < users.length; i++) {
            const user = users[i]
            // console.log(user)
            const copy = clone.clone()
            // copy.removeClass('wbdv-user-row-template')
            copy.find('.wbdv-username').html(user.username)
            copy.find('.wbdv-first-name').html(user.first)
            copy.find('.wbdv-last-name').html(user.last)
            copy.find('.wbdv-role').html(user.role)
            copy.find('.wbdv-delete')
                .attr('id', user._id)
                .click(deleteUser)
            copy.find('.wbdv-edit')
                .attr('id', user._id)
                .click(selectUser)
            $tbody.append(copy)
        }
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
        // console.log($template)
        $tbody.empty()
        for (let i = 0; i < users.length; i++) {
            const user = users[i]
            // console.log(user)
            const copy = clone.clone()
            // copy.removeClass('wbdv-user-row-template')
            copy.find('.wbdv-username').html(user.username)
            copy.find('.wbdv-first-name').html(user.first)
            copy.find('.wbdv-last-name').html(user.last)
            copy.find('.wbdv-role').html(user.role)
            copy.find('.wbdv-delete')
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
