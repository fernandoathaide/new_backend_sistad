'use strict'
import {LdapAuthManager} from 'ldap-login';
async function getUserLdap() {

    const ldapAuthManager = new LdapAuthManager({
        url: 'ldap://172.16.38.168:389',
        baseDn:'ou=cpo,dc=intraer,dc=fab',
        //baseDn: 'ou=contas,dc=fab,dc=intraer', // Base domain. Your user must be in a lower level
        idKey: 'uid' // Key user as username
    });

    const isValid = await ldapAuthManager.login('04076228456', 'wff@260981N');

    if (isValid) {
      const ldapClient = await ldapAuthManager.getClient();
      const atr = ['cn', 'description', 'mail', 'displayname', 'fabnrordem'];
      const users = await ldapClient.search(ldapAuthManager.username, { attributes: atr })
      return users[0]; //1º elemento do array de resposta do search;
    }
    return false;
  }

var userLdap = Promise.resolve(getUserLdap());
userLdap.then(function(u) {
    console.log("Show!");
    console.log(u); // "Resolving"
}, function(e) {
    console.log("Erro: " + e);
});