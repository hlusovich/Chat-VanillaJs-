/* eslint-disable no-unused-vars */
class Controller {
    constructor() {
        this.userLogo = new UserLogos();
        this.notification = new Notification();
        this.userLogo.createUserIconColor('Js Camping');
        this.model = new MessageList();
        this.headerView = new HeaderView('profile', this.userLogo);
        this.messagesView = new MessagesView('messages-list', this.userLogo);
        this.UsersView = new UsersListView('users-list', this.userLogo);
        this.userListModel = new UserList(activeUsers);
        this.chatHeaderView = new ChatHeaderView('chat-header');
        this.headerView.display();
        this.messageList = document.getElementById('messages-list');
        this.messageCount = 10;
        this.chatHeaderView.display('Js Camping', 'JC', this.userLogo.getColor('Js Camping'));
        this.checkedUserChat = 'Js Camping';
        this.userSearch = document.getElementById('user-search');
        this.allUsersListState = true;
        this.activeUsersList = document.querySelector('.users-types__onlain');
        this.addMessageButton = document.getElementById('add-msg-btn');
        this.main = document.getElementById('main');
        this.usersBlock = document.getElementById('users-block');
        this.messagesBlock = document.getElementById('messages');
        this.chatInput = document.getElementById('chat-input');
        this.headerLogo = document.getElementById('header-logo');
        this.header = document.getElementById("header");
        this.messageList = document.getElementById('messages-list');
        this.messageInput = document.getElementById('message-input');
        this.messageBtn = document.getElementById('message-btn');
        this.allUsersList = document.querySelector('.users-types__all');
        this.userSearch = document.getElementById('user-search');
        this.filterAuthor = document.getElementById('filter-author');
        this.filterText = document.getElementById('filter-text');
        this.filterDateFrom = document.getElementById('filter-from');
        this.filterDateTo = document.getElementById('filter-to');
        this.filterBtnSubmit = document.getElementById('filter__btn-submit');
        this.filterBtnCancel = document.getElementById('filter__btn-cancel');
        this.userList = document.getElementById('users-list');
        this.notificationCheckInName = document.getElementById("notification-check-in-name");
        this.notificationCheckInPassword = document.getElementById("notification-check-in-password");
        this.notificationCheckInPasswordsIsSame = document.getElementById("notification-check-in-passwords-is-same");
        this.notificationSignInName = document.getElementById("notification-sign-in-name");
        this.notificationSignInPassword = document.getElementById("notification-sign-in-password");
        this.signInFormButton = document.getElementById("sign-in-form-btn");
        this.checkInFormButton = document.getElementById("check-in-form-btn");
    }

    start() {
        this.showAllUsers();
        this.id = null;
        this.editFlag = false;
        this.to = "";
        this.isPrivate = false;
        this.addMessageButton.addEventListener("click", () => {
            this.showMessages({}, 0, 10, true);
        });
        this.userSearch.addEventListener("input", (e) => {
            if (this.allUsersListState) {
                this.showAllUsers(e.target.value);
            } else {
                this.showActiveUsers(e.target.value);
            }
        });
        this.activeUsersList.addEventListener("click", () => {
            this.allUsersListState = false;
            this.chooseUsersList();
            this.showActiveUsers();
        });
        this.allUsersList.addEventListener("click", () => {
            this.allUsersListState = true;
            this.chooseUsersList();
            this.showAllUsers();
        });
        this.headerLogo.addEventListener("click", () => {
            this.showMainPage();
        });
        document.forms[1].name.addEventListener("change", () => {
                this.validateName(document.forms[1].name.value, this.notificationCheckInName);
            }
        );
        document.forms[1].name.addEventListener("input", () => {
                this.toggleDisabledFormButton(this.checkInFormButton, document.forms[1].name.value, document.forms[1].password.value, document.forms[1].passwordAgain.value);
            }
        );
        document.forms[1].password.addEventListener("change", () => {
                this.validatePassword(document.forms[1].password.value, this.notificationCheckInPassword);
                this.toggleDisabledFormButton(this.checkInFormButton, document.forms[1].name.value, document.forms[1].password.value, document.forms[1].passwordAgain.value);
            }
        );
        document.forms[1].password.addEventListener("input", () => {
                this.toggleDisabledFormButton(this.checkInFormButton, document.forms[1].name.value, document.forms[1].password.value, document.forms[1].passwordAgain.value);
            }
        );
        document.forms[1].passwordAgain.addEventListener("change", () => {
                this.validatePassword(document.forms[1].passwordAgain.value, this.notificationCheckInPassword);
                this.isPasswordsSame(document.forms[1].password.value, document.forms[1].passwordAgain.value, this.notificationCheckInPasswordsIsSame);
            }
        );
        document.forms[1].passwordAgain.addEventListener("input", () => {
                this.toggleDisabledFormButton(this.checkInFormButton, document.forms[1].name.value, document.forms[1].password.value, document.forms[1].passwordAgain.value);
            }
        );
        document.forms[1].addEventListener("submit", (event) => {
            event.preventDefault();
            if (this.addUser(document.forms[1].name.value.trim())) {
                this.setCurrentUser(document.forms[1].name.value.trim());
                this.showMainPage();
                this.allUsersListState = true;
                this.chooseUsersList();
                this.showAllUsers();
                document.forms[1].name.value = "";
                document.forms[1].password.value = "";
                document.forms[1].passwordAgain.value = "";
                this.toggleDisabledFormButton(this.checkInFormButton);
                this.makeSound("assets/sounds/вход.mp3");
                this.notification.showNotification({text:"поздравляю,вы успешно зарегистрировались",succesfull:true});
            } else {
                this.makeSound("assets/sounds/уведомление.mp3");
                this.notification.showNotification({text:"такой пользователь уже зарегистрирован",succesfull:false});
            }
        });
        document.forms[0].name.addEventListener("change", () => {
                this.validateName(document.forms[0].name.value, this.notificationSignInName);
                this.toggleDisabledFormButton(this.signInFormButton, document.forms[0].name.value, document.forms[0].password.value);
            }
        );
        document.forms[0].name.addEventListener("input", () => {
                this.toggleDisabledFormButton(this.signInFormButton, document.forms[0].name.value, document.forms[0].password.value);
            }
        );
        document.forms[0].password.addEventListener("change", () => {
                this.toggleDisabledFormButton(this.signInFormButton, document.forms[0].name.value, document.forms[0].password.value);
            }
        );
        document.forms[0].password.addEventListener("input", () => {
                this.toggleDisabledFormButton(this.signInFormButton, document.forms[0].name.value, document.forms[0].password.value);
            }
        );
        document.forms[0].addEventListener("submit", (e) => {
            e.preventDefault();
            if (this.getUser(document.forms[0].name.value.trim())) {
                this.setCurrentUser(document.forms[0].name.value.trim());
                this.showMainPage();
                this.allUsersListState = true;
                this.chooseUsersList();
                this.showAllUsers();
                document.forms[0].name.value = "";
                document.forms[0].password.value = "";
                this.toggleDisabledFormButton(this.signInFormButton);
                this.makeSound("assets/sounds/вход.mp3");
                this.notification.showNotification({text:"вы успешно вошли",succesfull:true});
            } else {
                this.makeSound("assets/sounds/уведомление.mp3");
                this.notification.showNotification({text:"такой пользователь еще не зарегистрирован",succesfull:false});
            }

        });
        this.header.addEventListener("click", (e) => {
            if (e.target.id === 'exit-btn') {
                this.removeUser(undefined);
                this.allUsersListState = true;
                this.chooseUsersList();
                this.showAllUsers();
            } else if (e.target.id === "check-in") {
                this.checkIn();

            } else if (e.target.id === 'sign-in') {
                this.singIn();
            }
        });
        this.messageList.addEventListener("click", (e) => {
            if (e.target.parentNode.classList.value === "message__delete-btn") {
                this.removeMessage(e.target.parentNode.getAttribute("id"));
            } else if (e.target.parentNode.classList.value === "message__edit-btn") {
                this.id = e.target.parentNode.getAttribute("id");
                this.messageInput.value = this.model.get(this.id).text;
                this.editFlag = true;
            }

        });
        this.messageBtn.addEventListener("click", () => {
            if (this.messageInput.value) {
                if (this.editFlag) {
                    this.editMessage({text: this.messageInput.value, isPersonal: this.isPrivate, to: this.to});
                    this.id = null;
                    this.messageInput.value = "";
                    this.editFlag = false;
                } else if (this.to) {
                    this.addMessage({text: this.messageInput.value, isPersonal: this.isPrivate, to: this.to});
                    this.messageInput.value = "";
                    this.messageList.scrollTo(0, this.messageList.scrollHeight);
                } else {
                    this.addMessage({text: this.messageInput.value});
                    this.messageList.scrollTo(0, this.messageList.scrollHeight);
                    this.messageInput.value = "";
                }
            }
        });
        this.filterText.addEventListener('input', (e) => {
            if (this.changeFilterButtonsState(this.filterBtnSubmit, this.filterBtnCancel, e, this.filterDateFrom.value, this.filterDateTo.value, this.filterAuthor.value)) {
                this.clearFiltersFields();
            }

        });
        this.filterAuthor.addEventListener('input', (e) => {
            if (this.changeFilterButtonsState(this.filterBtnSubmit, this.filterBtnCancel, e, this.filterDateFrom.value, this.filterDateTo.value, this.filterText.value)) {
                this.clearFiltersFields();
            }

        });
        this.filterDateFrom.addEventListener('input', (e) => {
            if (this.changeFilterButtonsState(this.filterBtnSubmit, this.filterBtnCancel, e, this.filterDateTo.value, this.filterText.value, this.filterAuthor.value)) {
                this.clearFiltersFields();
            }

        });
        this.filterDateTo.addEventListener('input', (e) => {
            if (this.changeFilterButtonsState(this.filterBtnSubmit, this.filterBtnCancel, e, this.filterDateFrom.value, this.filterText.value, this.filterAuthor.value)) {
                this.clearFiltersFields();
            }

        });
        this.filterBtnSubmit.addEventListener("click", () => {
            this.showMessages({
                author: this.filterAuthor.value, text: this.filterText.value,
                dateTo: this.filterDateTo.value ? new Date(Date.parse(this.filterDateTo.value)) : "",
                dateFrom: this.filterDateFrom.value ? new Date(Date.parse(this.filterDateFrom.value)) : "",
            });
        });
        this.filterBtnCancel.addEventListener("click", () => {
            this.clearFiltersFields();
        });
        this.userList.addEventListener("click", (e) => {
            if (e.target.classList[0] === "user-img" || e.target.classList[0] === "user_name") {
                const userName = e.target.classList[0] === "user-img" ? e.target.nextSibling.innerText : e.target.innerText;
                const userLogoInner = this.userLogo.createUserIconText(userName);
                const userLogoColor = this.userLogo.createUserIconColor(userName);
                this.setChechedUserChat(userName);
                this.showMessages();
                this.createChatHeaderLogo(userName, userLogoInner, userLogoColor);
                if (userName === "Js Camping") {
                    this.to = "";
                    this.isPrivate = false;
                } else {
                    this.to = userName;
                    this.isPrivate = true;
                }
                this.messageList.scrollTo(0, this.messageList.scrollHeight);
                this.allUsersListState = true;
                this.chooseUsersList();
                this.showAllUsers();
            }

        });
        this.showMessages();
        this.messageList.scrollTo(0, this.messageList.scrollHeight);
    }

    setChechedUserChat(name) {
        this.checkedUserChat = name;
    }

    setCurrentUser(user) {
        if (this.model.changeUser(user)) {
            this.messageInput.classList.remove('message-input_disabled');
            this.messageInput.placeholder = 'Введите ваше сообщение...';
            this.messageInput.disabled = false;
            this.messageBtn.classList.remove('chat-messages-button_hide');
            this.headerView.display(user);
            this.messageList.innerHTML = '';
            this.showMessages();
        }
    }

    removeUser(user, input, button) {
        if (this.model.changeUser(null)) {
            this.headerView.display();
            this.messageInput.classList.remove('message-input_disabled');
            this.messageInput.placeholder = 'Только зарегистрированный пользователь может писать сообщения...';
            this.messageInput.disabled = true;
            this.messageBtn.classList.add('chat-messages-button_hide');
            this.messageList.innerHTML = '';
            this.messagesView.display(this.model.getPage(0, this.messageCount), this.model.user);
        }
    }

    addMessage({text, isPersonal = false, to}) {
        if (this.model.add({text, isPersonal, to})) {
            this.messageList.innerHTML = '';
            this.messageCount += 1;
            this.showMessages();
        }
    }

    editMessage({text, isPersonal = false, to}) {
        if (this.model.edit(this.id, {text, isPersonal, to})) {
            this.messageList.innerHTML = '';
            this.showMessages();
        }
    }

    removeMessage(id) {
        if (this.model.remove(id)) {
            this.messageList.innerHTML = '';
            this.showMessages();
        }
    }

    showMessages(filterConfig = {}, skip = 0, top = 10, pagination = false) {
        if (!Object.keys(filterConfig).length && pagination) {
            this.messageList.innerHTML = '';
            this.messageCount += top;
        }
        this.messageList.innerHTML = '';
        if (this.checkedUserChat === 'Js Camping') {
            this.messagesView
                .display(this.model.getPage(0, this.messageCount, filterConfig), this.model.user);
        } else {
            this.messagesView.display(this.model.getPage
                (0, this.messageCount, filterConfig, true, this.model.user, this.checkedUserChat),
                this.model.user);
        }
    }

    showActiveUsers(searchString = false) {
        if (searchString) {
            this.UsersView.display(this.userListModel.activeUsers.filter((item) => item !== this.model.user
                && item.toLowerCase().startsWith(searchString.toLowerCase())), this.checkedUserChat);
        } else {
            this.UsersView.display(this.userListModel.activeUsers.filter((item) => item !== this.model.user), this.checkedUserChat);
        }
    }

    showAllUsers(searchString = false) {
        if (searchString) {
            this.UsersView.display(this.userListModel.users.filter((item) => item !== this.model.user
                && item.toLowerCase().startsWith(searchString.toLowerCase())), this.checkedUserChat);
        } else {
            this.UsersView.display(this.userListModel.users.filter((item) => item !== this.model.user), this.checkedUserChat);
        }
    }

    addUser(user) {
        if (this.userListModel.appendUser(user)) {
            this.showAllUsers();
            return true;
        }
        return false;
    }

    getUser(user) {
        if (this.userListModel.getUser(user)) {
            this.showAllUsers();
            return true;
        }
        return false;
    }

    createChatHeaderLogo(user, userInner, color) {
        this.chatHeaderView.display(user, userInner, color);
    }

    changeFilterButtonsState(filterBtnSubmit, filterBtnCancel, e = false, value1, value2, value3) {
        if (e && e.target.value.length) {
            filterBtnSubmit.disabled = false;
            filterBtnCancel.disabled = false;
            filterBtnSubmit.classList.remove('button-disabled');
            filterBtnCancel.classList.remove('button-disabled');
            return false;
        }
        if (!value1 && !value2 && !value3 && e && !e.target.value) {
            filterBtnSubmit.disabled = true;
            filterBtnCancel.disabled = true;
            filterBtnSubmit.classList.add('button-disabled');
            filterBtnCancel.classList.add('button-disabled');
            return true;
        }
    }

    chooseUsersList() {
        this.userSearch.value = "";
        if (this.allUsersListState) {
            this.allUsersList.classList.add("users-active");
            this.activeUsersList.classList.remove("users-active");
        } else {
            this.activeUsersList.classList.add("users-active");
            this.allUsersList.classList.remove("users-active");
        }

    }

    checkIn() {
        this.usersBlock.style.display = "none";
        this.messagesBlock.style.display = "none";
        this.chatInput.style.display = "none";
        document.forms[1].style.display = "flex";
        document.forms[0].style.display = "none";
        this.main.classList.add("main-form");
    }

    singIn() {
        this.usersBlock.style.display = "none";
        this.messagesBlock.style.display = "none";
        this.chatInput.style.display = "none";
        document.forms[0].style.display = "flex";
        document.forms[1].style.display = "none";
        this.main.classList.add("main-form");
    }

    showMainPage() {
        this.usersBlock.style.display = "flex";
        this.messagesBlock.style.display = "flex";
        this.chatInput.style.display = "flex";
        document.forms[0].style.display = "none";
        document.forms[1].style.display = "none";
        this.main.classList.remove("main-form");
    }

    clearFiltersFields() {
        this.filterDateTo.value = "";
        this.filterDateFrom.value = "";
        this.filterText.value = "";
        this.filterAuthor.value = "";
        this.showMessages({
            author: this.filterAuthor.value, text: this.filterText.value,
            dateTo: this.filterDateTo.value,
            dateFrom: this.filterDateFrom.value,
        });
        this.changeFilterButtonsState(this.filterBtnSubmit, this.filterBtnCancel);
    }

    validateName(value, notification = false) {
        if (value.trim().split(" ").length === 2) {
            if (notification) {
                notification.style.opacity = 0;
            }
            return true;
        }
        if (notification) {
            notification.style.opacity = 1;
        }
        return false;

    }

    validatePassword(value, notification = false) {
        if (value.trim().length > 5) {
            if (notification) {
                notification.style.opacity = 0;
            }
            return true;
        }
        if (notification) {
            notification.style.opacity = 1;
        }
        return false;
    }

    isPasswordsSame(password, passwordAgain, notification = false) {
        if (password === passwordAgain) {
            if (notification) {
                notification.style.opacity = 0;
            }
            return true;
        }
        if (notification) {
            notification.style.opacity = 1;
        }
        return false;
    }

    toggleDisabledFormButton(button, name, password, passwordAgain = password) {
        if (name && this.validateName(name) && password && this.validatePassword(password) && passwordAgain && this.validatePassword(passwordAgain) && this.isPasswordsSame(password, passwordAgain)) {
            button.classList.remove("form__button_disabled");
            button.disabled = false;
            return true;

        }
        button.classList.add("form__button_disabled");
        button.disabled = true;
        return false;

    }
    makeSound(patch){
        const audio = new Audio();
        audio.src = patch;
        audio.autoplay = true;

    }

}
