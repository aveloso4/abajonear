(function() {
  'use strict';

  angular.module('abajonear').factory('sessionStorage', SessionStorage);
  SessionStorage.$inject = [];

  function SessionStorage() {

    /* @function
     * Gets a dom storage item
     * @name setItem
     * @param {String} key - The item key
     * @returns {String} value - The item value */
    function setItem(key, name) {
      window.sessionStorage.setItem(key, name);
    }

    /* @function
     * Gets a dom storage item
     * @name getItem
     * @param {String} key - The item key
     * @returns {String} value - The item value */
    function getItem(key) {
      var result = window.sessionStorage.getItem(key);
      return result;
    }

    /* @function
     * Removes an item from storage
     * @name removeItem
     * @param {String} key - The item key
     * @returns {String} value - The item value */
    function removeItem(key) {
      window.sessionStorage.removeItem(key);
    }

    return {
      setItem: setItem,
      getItem: getItem,
      removeItem: removeItem
    };
  }

}());
