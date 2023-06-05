"use strict";
self["webpackHotUpdatetemplate"]("src_pages_login_vue",{

/***/ "./src/composables/useLogin.ts":
/*!*************************************!*\
  !*** ./src/composables/useLogin.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useLogin": function() { return /* binding */ useLogin; }
/* harmony export */ });
/* harmony import */ var _utils_Helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Helper */ "./src/utils/Helper.ts");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm-bundler.js");
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __generator = undefined && undefined.__generator || function (thisArg, body) {
  var _ = {
      label: 0,
      sent: function sent() {
        if (t[0] & 1) throw t[1];
        return t[1];
      },
      trys: [],
      ops: []
    },
    f,
    y,
    t,
    g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;
  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (g && (g = 0, op[0] && (_ = 0)), _) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };
        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;
        case 7:
          op = _.ops.pop();
          _.trys.pop();
          continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }
          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }
          if (t && _.label < t[2]) {
            _.label = t[2];
            _.ops.push(op);
            break;
          }
          if (t[2]) _.ops.pop();
          _.trys.pop();
          continue;
      }
      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};


var useLogin = function useLogin() {
  var loginRequestFlag = (0,vue__WEBPACK_IMPORTED_MODULE_1__.ref)(null);
  var $cookies = (0,vue__WEBPACK_IMPORTED_MODULE_1__.inject)('$cookies');
  var apiBase = "http://166.1.131.76:6655/";
  var cookieName = "342iiki46_Hyper_84lchqxz";
  var errorMessage = (0,vue__WEBPACK_IMPORTED_MODULE_1__.ref)('');
  var userData = (0,vue__WEBPACK_IMPORTED_MODULE_1__.reactive)({
    username: 'hooman_77',
    password: '13777731Ho@',
    rememberMe: false
  });
  var formHandler = function formHandler() {
    return __awaiter(void 0, void 0, void 0, function () {
      var requestOption;
      return __generator(this, function (_a) {
        if (userData.password.match(_utils_Helper__WEBPACK_IMPORTED_MODULE_0__.passwordRegex) && userData.username.match(_utils_Helper__WEBPACK_IMPORTED_MODULE_0__.usernameRegex)) {
          requestOption = (0,_utils_Helper__WEBPACK_IMPORTED_MODULE_0__.loginEncode)(userData.username, userData.password);
          loginRequestFlag.value = true;
          errorMessage.value = '';
          fetch(apiBase + 'token', {
            method: 'POST',
            body: requestOption.body,
            headers: requestOption.header
          }).then(function (response) {
            return response.json();
          }).then(function (response) {
            console.log(response);
            if (userData.rememberMe) {
              $cookies === null || $cookies === void 0 ? void 0 : $cookies.set(cookieName, response);
              useCookie(cookieName, {
                maxAge: 10 * 24 * 60 * 60,
                path: '/'
              }).value = token;
            }
          }).catch(function (err) {
            errorMessage.value = 'Error in connecting to server! please try again.';
            console.log(err);
          }).finally(function () {
            loginRequestFlag.value = false;
          });
        }
        return [2];
      });
    });
  };
  return {
    userData: userData,
    formHandler: formHandler,
    usernameRegex: _utils_Helper__WEBPACK_IMPORTED_MODULE_0__.usernameRegex,
    passwordRegex: _utils_Helper__WEBPACK_IMPORTED_MODULE_0__.passwordRegex,
    loginRequestFlag: loginRequestFlag,
    errorMessage: errorMessage
  };
};

/***/ })

});
//# sourceMappingURL=src_pages_login_vue.619a850ecfadc8734101.hot-update.js.map