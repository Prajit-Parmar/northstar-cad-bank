(function () {
  'use strict';

  angular.module('cadBankApp', [])
    .controller('BankController', function ($window) {
      var vm = this;
      var storageKey = 'northstarCadBankUsers';

      var starterUsers = {
        'demo@northstar.ca': {
          password: 'Bank@2026',
          user: {
            name: 'Aarav Sharma',
            email: 'demo@northstar.ca',
            customerId: 'NSC-440291',
            phone: '+1 (416) 555-0198',
            address: '88 Harbour Street, Toronto, ON',
            biometricEnabled: false
          },
          accounts: [
            { type: 'CAD Checking', number: '101-884-2201', balance: 8420.75 },
            { type: 'CAD Savings', number: '202-771-9042', balance: 18750.30 }
          ],
          primaryCard: {
            name: 'NorthStar Aurora Visa',
            network: 'Visa Infinite',
            number: '4532 **** **** 9012',
            limit: 12000,
            balance: 1260.80,
            status: 'Active'
          },
          transactions: [
            { name: 'Payroll deposit', date: 'May 7', amount: 2350.00 },
            { name: 'Hydro One', date: 'May 6', amount: -96.45 },
            { name: 'E-Transfer from Sara', date: 'May 5', amount: 180.00 },
            { name: 'Campus bookstore', date: 'May 4', amount: -74.20 }
          ]
        },
        'maya@northstar.ca': {
          password: 'Bank@2026',
          user: {
            name: 'Maya Patel',
            email: 'maya@northstar.ca',
            customerId: 'NSC-540882',
            phone: '+1 (647) 555-0144',
            address: '22 King Street West, Toronto, ON',
            biometricEnabled: true
          },
          accounts: [
            { type: 'CAD Checking', number: '101-445-1108', balance: 5920.15 },
            { type: 'CAD Savings', number: '202-118-7731', balance: 9600.00 }
          ],
          primaryCard: {
            name: 'Maple Rewards Mastercard',
            network: 'Mastercard World',
            number: '5271 **** **** 3118',
            limit: 8500,
            balance: 640.10,
            status: 'Active'
          },
          transactions: [
            { name: 'Freelance deposit', date: 'May 8', amount: 900.00 },
            { name: 'Grocery Market', date: 'May 6', amount: -112.32 }
          ]
        },
        'liam@northstar.ca': {
          password: 'Bank@2026',
          user: {
            name: 'Liam Chen',
            email: 'liam@northstar.ca',
            customerId: 'NSC-228104',
            phone: '+1 (437) 555-0172',
            address: '15 Bay Street, Toronto, ON',
            biometricEnabled: false
          },
          accounts: [
            { type: 'CAD Checking', number: '101-771-0042', balance: 3210.95 },
            { type: 'CAD Savings', number: '202-661-4410', balance: 14250.40 }
          ],
          primaryCard: {
            name: 'Polar CashBack Visa',
            network: 'Visa Platinum',
            number: '4147 **** **** 2088',
            limit: 7000,
            balance: 228.78,
            status: 'Active'
          },
          transactions: [
            { name: 'Scholarship deposit', date: 'May 7', amount: 1200.00 },
            { name: 'Phone bill', date: 'May 4', amount: -58.99 }
          ]
        },
        'sara@northstar.ca': {
          password: 'Bank@2026',
          user: {
            name: 'Sara Williams',
            email: 'sara@northstar.ca',
            customerId: 'NSC-917302',
            phone: '+1 (416) 555-0120',
            address: '70 Queens Quay East, Toronto, ON',
            biometricEnabled: true
          },
          accounts: [
            { type: 'CAD Checking', number: '101-992-7001', balance: 11280.00 },
            { type: 'CAD Savings', number: '202-482-6300', balance: 22050.80 }
          ],
          primaryCard: {
            name: 'Lunar Travel Elite',
            network: 'Amex',
            number: '3782 ****** *6401',
            limit: 18000,
            balance: 2380.44,
            status: 'Active'
          },
          transactions: [
            { name: 'Consulting payment', date: 'May 8', amount: 1800.00 },
            { name: 'Travel booking', date: 'May 3', amount: -420.90 }
          ]
        },
        'noah@northstar.ca': {
          password: 'Bank@2026',
          user: {
            name: 'Noah Brown',
            email: 'noah@northstar.ca',
            customerId: 'NSC-330719',
            phone: '+1 (289) 555-0188',
            address: '410 College Street, Toronto, ON',
            biometricEnabled: false
          },
          accounts: [
            { type: 'CAD Checking', number: '101-338-9108', balance: 1765.25 },
            { type: 'CAD Savings', number: '202-771-3350', balance: 4800.90 }
          ],
          primaryCard: {
            name: 'Summit Student Card',
            network: 'Visa',
            number: '4508 **** **** 7742',
            limit: 2500,
            balance: 210.60,
            status: 'Active'
          },
          transactions: [
            { name: 'Part-time payroll', date: 'May 6', amount: 640.00 },
            { name: 'Campus cafe', date: 'May 5', amount: -14.75 }
          ]
        }
      };

      vm.bankUsers = loadUsers();
      vm.demoAccounts = Object.keys(vm.bankUsers).map(function (email) {
        return {
          email: email,
          password: vm.bankUsers[email].password,
          name: vm.bankUsers[email].user.name
        };
      });

      vm.loginForm = {
        customerId: 'demo@northstar.ca',
        password: ''
      };

      vm.isLoggedIn = false;
      vm.loginError = '';
      vm.activeTab = 'dashboard';
      vm.transferMode = 'Send';
      vm.transferNotice = '';
      vm.currentEmail = '';
      vm.currentDate = new Date().toLocaleDateString('en-CA', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
      });

      vm.tabs = [
        { id: 'dashboard', label: 'Dashboard', icon: 'D' },
        { id: 'accounts', label: 'Accounts', icon: 'A' },
        { id: 'cards', label: 'Cards', icon: 'C' },
        { id: 'transfers', label: 'E-Transfer', icon: 'T' },
        { id: 'offers', label: 'Offers', icon: 'O' },
        { id: 'help', label: 'Help', icon: '?' },
        { id: 'profile', label: 'Profile', icon: 'P' }
      ];

      vm.user = {};
      vm.accounts = [];
      vm.primaryCard = {};
      vm.transactions = [];

      vm.offerCards = [
        { name: 'Maple Rewards Mastercard', network: 'Mastercard', reward: '3x points on grocery, transit, and phone bills.', rate: '19.99% APR' },
        { name: 'Polar CashBack Visa', network: 'Visa', reward: '2% cash back on everyday purchases.', rate: '20.49% APR' },
        { name: 'Summit Student Card', network: 'Visa', reward: 'No annual fee and credit-building tools.', rate: '18.99% APR' },
        { name: 'Lunar Travel Elite', network: 'Amex', reward: 'Airport lounge passes and travel insurance.', rate: '21.99% APR' }
      ];

      vm.helpItems = [
        { question: 'How do I send an E-Transfer to another dummy user?', answer: 'Open E-Transfer, choose Send, enter another dummy email address, add a CAD amount, and submit. Log out and sign in as that user to see the received money.' },
        { question: 'How can I enable biometric login?', answer: 'Use the Biometrics switch in the top bar. The profile page shows whether it is enabled.' },
        { question: 'Where can I apply for another credit card?', answer: 'Open the Offers tab and choose Sign up on any available card offer.' },
        { question: 'Is this connected to real banking?', answer: 'No. This is a final-year project prototype with dummy data only.' }
      ];

      vm.sparkBars = [38, 58, 44, 76, 62, 88, 68, 94, 72];

      vm.transfer = {
        contact: '',
        amount: null,
        message: ''
      };

      vm.login = function () {
        var email = normalizeEmail(vm.loginForm.customerId);
        var account = vm.bankUsers[email];

        if (account && vm.loginForm.password === account.password) {
          vm.currentEmail = email;
          activateAccount(account);
          vm.isLoggedIn = true;
          vm.loginError = '';
          vm.activeTab = 'dashboard';
          return;
        }

        vm.loginError = 'Invalid login. Use any dummy email below with password Bank@2026.';
      };

      vm.logout = function () {
        saveCurrentAccount();
        vm.isLoggedIn = false;
        vm.loginForm.customerId = vm.currentEmail || 'demo@northstar.ca';
        vm.loginForm.password = '';
        vm.currentEmail = '';
      };

      vm.setTab = function (tabId) {
        vm.activeTab = tabId;
        vm.transferNotice = '';
      };

      vm.showProfile = function () {
        vm.setTab('profile');
      };

      vm.pageTitle = function () {
        var match = vm.tabs.find(function (tab) {
          return tab.id === vm.activeTab;
        });
        return match ? match.label : 'Dashboard';
      };

      vm.totalBalance = function () {
        return vm.accounts.reduce(function (total, account) {
          return total + account.balance;
        }, 0);
      };

      vm.currency = function (amount) {
        return amount.toLocaleString('en-CA', {
          style: 'currency',
          currency: 'CAD'
        });
      };

      vm.signedCurrency = function (amount) {
        var value = vm.currency(Math.abs(amount));
        return amount > 0 ? '+' + value : '-' + value;
      };

      vm.initials = function (name) {
        return name.split(' ').map(function (part) {
          return part.charAt(0);
        }).join('').slice(0, 2);
      };

      vm.submitTransfer = function () {
        var amount = Number(vm.transfer.amount);

        if (!vm.transfer.contact || !amount || amount <= 0) {
          vm.transferNotice = 'Enter a valid contact and CAD amount.';
          return;
        }

        var contactEmail = normalizeEmail(vm.transfer.contact);
        var contactAccount = vm.bankUsers[contactEmail];

        if (!contactAccount) {
          vm.transferNotice = 'Use one of the dummy account emails as the contact.';
          return;
        }

        if (contactEmail === vm.currentEmail) {
          vm.transferNotice = 'Choose a different dummy account for the transfer.';
          return;
        }

        if (vm.transferMode === 'Send') {
          sendTransfer(contactEmail, contactAccount, amount);
        } else {
          receiveTransfer(contactEmail, contactAccount, amount);
        }
      };

      vm.applyCard = function (card) {
        vm.transferNotice = '';
        alert('Application started for ' + card.name + '. This prototype uses dummy data only.');
      };

      function activateAccount(account) {
        vm.user = account.user;
        vm.accounts = account.accounts;
        vm.primaryCard = account.primaryCard;
        vm.transactions = account.transactions;
      }

      function sendTransfer(contactEmail, contactAccount, amount) {
        if (vm.accounts[0].balance < amount) {
          vm.transferNotice = 'Not enough money in CAD Checking.';
          return;
        }

        vm.accounts[0].balance -= amount;
        contactAccount.accounts[0].balance += amount;

        vm.transactions.unshift({
          name: 'E-Transfer to ' + contactAccount.user.name,
          date: 'Today',
          amount: -amount
        });
        contactAccount.transactions.unshift({
          name: 'E-Transfer from ' + vm.user.name,
          date: 'Today',
          amount: amount
        });

        saveCurrentAccount();
        saveUsers();
        completeTransfer('Sent', amount, contactEmail);
      }

      function receiveTransfer(contactEmail, contactAccount, amount) {
        if (contactAccount.accounts[0].balance < amount) {
          vm.transferNotice = contactAccount.user.name + ' does not have enough money in CAD Checking.';
          return;
        }

        contactAccount.accounts[0].balance -= amount;
        vm.accounts[0].balance += amount;

        vm.transactions.unshift({
          name: 'E-Transfer from ' + contactAccount.user.name,
          date: 'Today',
          amount: amount
        });
        contactAccount.transactions.unshift({
          name: 'E-Transfer to ' + vm.user.name,
          date: 'Today',
          amount: -amount
        });

        saveCurrentAccount();
        saveUsers();
        completeTransfer('Received', amount, contactEmail);
      }

      function completeTransfer(action, amount, contactEmail) {
        vm.transferNotice = action + ' ' + vm.currency(amount) + ' with ' + contactEmail + '. Log into that dummy account to see the matching transaction.';
        vm.transfer = {
          contact: '',
          amount: null,
          message: ''
        };
      }

      function saveCurrentAccount() {
        if (!vm.currentEmail) {
          return;
        }

        vm.bankUsers[vm.currentEmail].user = vm.user;
        vm.bankUsers[vm.currentEmail].accounts = vm.accounts;
        vm.bankUsers[vm.currentEmail].primaryCard = vm.primaryCard;
        vm.bankUsers[vm.currentEmail].transactions = vm.transactions;
        saveUsers();
      }

      function saveUsers() {
        $window.localStorage.setItem(storageKey, angular.toJson(vm.bankUsers));
      }

      function loadUsers() {
        var saved = $window.localStorage.getItem(storageKey);

        if (!saved) {
          return angular.copy(starterUsers);
        }

        try {
          return mergeStarterUsers(angular.fromJson(saved));
        } catch (error) {
          return angular.copy(starterUsers);
        }
      }

      function mergeStarterUsers(savedUsers) {
        var mergedUsers = angular.copy(starterUsers);

        Object.keys(savedUsers || {}).forEach(function (email) {
          mergedUsers[email] = savedUsers[email];
        });

        Object.keys(starterUsers).forEach(function (email) {
          if (!mergedUsers[email]) {
            mergedUsers[email] = angular.copy(starterUsers[email]);
          }
        });

        return mergedUsers;
      }

      function normalizeEmail(value) {
        return String(value || '').trim().toLowerCase();
      }
    });
}());
